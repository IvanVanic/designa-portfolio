/**
 * Artwork Modal Component
 * Displays detailed view of artwork in a modal dialog with support for sub-images
 */

"use client";

import { useEffect, useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Artwork } from "@/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// software icon mapping (reserved for future use)

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  allArtworks?: Artwork[];
  currentIndex?: number;
  onNavigate?: (direction: "prev" | "next") => void;
}

export function ArtworkModal({
  artwork,
  isOpen,
  onClose,
  allArtworks = [],
  currentIndex = 0,
  onNavigate,
}: ArtworkModalProps) {
  const isMobile = useIsMobile();
  const hasNavigation = allArtworks.length > 1 && onNavigate;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [mobileCarouselIndex, setMobileCarouselIndex] = useState(0);
  // All images including main image and sub-images
  const allImages = artwork ? [artwork.image, ...(artwork.subImages || [])] : [];
  const hasMultipleImages = allImages.length > 1;

  const withVersion = useCallback(
    (src: string) => (artwork ? (src.includes("?") ? src : `${src}?v=${artwork.id}`) : src),
    [artwork]
  );

  // Reset image index when artwork changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setMobileCarouselIndex(0);
    setMainImageLoaded(false);
    // Reset carousel to first slide when artwork changes
    if (carouselApi) {
      carouselApi.scrollTo(0);
    }
  }, [artwork?.id, carouselApi]);

  // Sync carousel index with state
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setMobileCarouselIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // start prefetching sub-images only after the main image has loaded
  useEffect(() => {
    if (!artwork || !mainImageLoaded) return;
    const urls = (artwork.subImages || []).map((img) => withVersion(img));
    const controllers = urls.map(() => new AbortController());
    urls.forEach((url, i) => {
      try {
        fetch(url, { signal: controllers[i].signal, cache: "force-cache" })
          .then(() => {
            // Prefetch successful
          })
          .catch(() => {
            // Silently handle fetch errors
          });
      } catch {
        // Silently handle fetch errors
      }
    });
    return () => controllers.forEach((c) => c.abort());
  }, [artwork, mainImageLoaded, withVersion]);

  // Keyboard navigation for desktop
  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && onNavigate && currentIndex > 0) {
        e.preventDefault();
        onNavigate("prev");
      } else if (e.key === "ArrowRight" && onNavigate && currentIndex < allArtworks.length - 1) {
        e.preventDefault();
        onNavigate("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isMobile, onNavigate, currentIndex, allArtworks.length]);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (onNavigate) {
        onNavigate(direction);
      }
    },
    [onNavigate]
  );

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentImageIndex((prev) => {
        const nextIndex = prev === 0 ? allImages.length - 1 : prev - 1;
        setMainImageLoaded(false);
        return nextIndex;
      });
    } else {
      setCurrentImageIndex((prev) => {
        const nextIndex = prev === allImages.length - 1 ? 0 : prev + 1;
        setMainImageLoaded(false);
        return nextIndex;
      });
    }
  };

  if (!artwork) return null;

  return (
    <div className="relative">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="bg-transparent shadow-none border-0 p-0 overflow-visible w-auto max-w-none"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            <VisuallyHidden>{artwork.title}</VisuallyHidden>
          </DialogTitle>
          <DialogDescription className="sr-only">
            {artwork.description || `${artwork.title} artwork details`}
          </DialogDescription>

          {/* Wrapper to position controls and the main card */}
          <div className="relative mx-auto flex flex-col items-center justify-center">
            {/* Fixed/absolute close button - fixed on mobile, positioned in-card on desktop */}
            <div
              className={cn(
                "relative bg-background border border-white/10 rounded-xl overflow-hidden shadow-2xl",
                // Fixed dimensions per breakpoint to avoid size jump between artworks
                "w-[95vw] h-[82vh] sm:w-[92vw] sm:h-[80vh] md:w-[900px] md:h-[560px] lg:w-[1200px] lg:h-[640px]"
              )}
              key={artwork.id}
            >
              {/* Close button - high contrast for visibility */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className={cn(
                  "z-[70] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent/60",
                  // Mobile: fixed position with solid dark background
                  "fixed top-4 right-4 w-10 h-10 rounded-full",
                  "bg-black/70 hover:bg-black/90 backdrop-blur-md shadow-lg",
                  "text-white hover:text-accent",
                  // Desktop: positioned inside card, more subtle
                  "md:absolute md:top-4 md:right-4 md:w-9 md:h-9",
                  "md:bg-black/40 md:hover:bg-black/60"
                )}
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Responsive body */}
              {isMobile ? (
                <div className="flex h-full flex-col overflow-y-auto min-h-0 mobile-modal-content">
                  {/* Swipeable Image Carousel */}
                  <div className="relative bg-muted/30 flex-shrink-0">
                    <Carousel
                      setApi={setCarouselApi}
                      opts={{
                        align: "start",
                        loop: hasMultipleImages,
                      }}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-0">
                        {allImages.map((image, index) => (
                          <CarouselItem key={`${artwork.id}-${image}-${index}`} className="pl-0">
                            <div className="relative w-full aspect-[4/5]">
                              <Image
                                src={withVersion(image)}
                                alt={`${artwork.title} ${index + 1}`}
                                fill
                                className="object-contain"
                                sizes="95vw"
                                priority={index === 0}
                                loading={index === 0 ? "eager" : "lazy"}
                                onLoad={index === 0 ? () => setMainImageLoaded(true) : undefined}
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>

                    {/* Image Counter Overlay */}
                    {hasMultipleImages && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                        <span className="text-white text-sm font-semibold tracking-wide">
                          {mobileCarouselIndex + 1} / {allImages.length}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content below carousel - improved spacing and typography */}
                  <div className="px-5 pt-5 pb-28 bg-background flex-1" id="artwork-details-bottom">
                    {/* Title with accent underline */}
                    <h2 className="text-2xl font-bold mb-3 text-foreground">{artwork.title}</h2>
                    <p className="text-foreground/70 mb-6 text-sm leading-relaxed">
                      {artwork.description}
                    </p>

                    <div className="mb-5 pb-4 border-b border-white/5">
                      <span className="text-xs text-accent/80 uppercase tracking-wider font-semibold">
                        MEDIUM
                      </span>
                      <p className="text-foreground/90 text-sm mt-1">
                        {typeof artwork.type === "string"
                          ? artwork.type
                          : artwork.type?.name || "Unknown"}
                      </p>
                    </div>

                    {artwork.software && artwork.software.length > 0 && (
                      <div className="mb-6 pb-4 border-b border-white/5">
                        <h3 className="text-xs uppercase tracking-wider font-semibold mb-1 text-accent/80">
                          SOFTWARE USED
                        </h3>
                        <p className="text-foreground/90 text-sm mt-1">{artwork.software.join(", ")}</p>
                      </div>
                    )}

                    {artwork.artstationLink && (
                      <a
                        href={artwork.artstationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors border border-accent/40 px-4 py-2.5 rounded-lg hover:bg-accent/10"
                        aria-label={`open artstation for ${artwork.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on ArtStation
                      </a>
                    )}
                  </div>

                  {/* Mobile navigation buttons - refined bottom bar */}
                  {hasNavigation && (
                    <div className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-background/90 backdrop-blur-md border-t border-white/10 flex justify-between items-center safe-area-padding-bottom z-[65]">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("prev")}
                        disabled={currentIndex === 0}
                        className="text-white/90 border-white/20 hover:bg-white/10 hover:text-white hover:border-white/30 min-w-[90px] h-9 disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Prev
                      </Button>
                      <span className="text-foreground/60 text-xs font-medium">
                        {currentIndex + 1} / {allArtworks.length}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("next")}
                        disabled={currentIndex === allArtworks.length - 1}
                        className="text-white/90 border-white/20 hover:bg-white/10 hover:text-white hover:border-white/30 min-w-[90px] h-9 disabled:opacity-40"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] h-full">
                  {/* Left: Image */}
                  <div className="relative bg-muted/30 flex flex-col">
                    {/* Main Image */}
                    <div className="relative flex items-center justify-center flex-1">
                      {!mainImageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted/30" />
                      )}
                      <Image
                        key={`${artwork.id}-${currentImageIndex}`}
                        src={withVersion(allImages[currentImageIndex] || "/gallery-placeholder-1.png")}
                        alt={`${artwork.title} artwork`}
                        fill
                        className={cn(
                          "object-contain transition-opacity duration-200",
                          mainImageLoaded ? "opacity-100" : "opacity-0"
                        )}
                        sizes="50vw"
                        priority
                        onLoad={() => setMainImageLoaded(true)}
                      />
                    </div>

                    {/* Sub-image Thumbnails (desktop only) */}
                    {hasMultipleImages && !isMobile && (
                      <div className="p-4 bg-background/90 backdrop-blur-sm">
                        <div className="flex items-center justify-center gap-2">
                          {/* Left Arrow */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigateImage("prev")}
                            className="text-foreground/60 hover:text-foreground hover:bg-accent/10"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>

                          {/* Thumbnails */}
                          <div className="flex gap-2">
                            {allImages.map((image, index) => (
                              <button
                                key={`${artwork.id}-${image}-${index}`}
                                onClick={() => setCurrentImageIndex(index)}
                                className={cn(
                                  "relative w-16 h-16 rounded overflow-hidden transition-all",
                                  currentImageIndex === index
                                    ? "ring-2 ring-accent opacity-100"
                                    : "opacity-60 hover:opacity-80"
                                )}
                              >
                                <Image
                                  src={withVersion(image)}
                                  alt={`${artwork.title} ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </button>
                            ))}
                          </div>

                          {/* Right Arrow */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigateImage("next")}
                            className="text-foreground/60 hover:text-foreground hover:bg-accent/10"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Content */}
                  <div className="flex flex-col p-6 bg-background">
                    <div className="pt-6">
                      <h2 className="text-2xl font-bold mb-2">{artwork.title}</h2>
                      <p className="text-foreground/80 mb-6">{artwork.description}</p>
                    </div>

                    <div className="mt-auto">
                      <div className="mb-6">
                        <span className="text-xs text-foreground/60 uppercase tracking-wide font-semibold">
                          MEDIUM
                        </span>
                        <p className="text-foreground/80 text-sm">
                          {typeof artwork.type === "string"
                            ? artwork.type
                            : artwork.type?.name || "Unknown"}
                        </p>
                      </div>

                      {artwork.software && artwork.software.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xs uppercase tracking-wide font-semibold mb-2 text-foreground/60">
                            SOFTWARE USED
                          </h3>
                          <p className="text-foreground/80 text-sm">
                            {artwork.software.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>

                    {artwork.artstationLink && (
                      <a
                        href={artwork.artstationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 text-sm transition-colors border border-accent/30 px-3 py-2 rounded-lg hover:bg-accent/10"
                        aria-label={`open artstation for ${artwork.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on ArtStation
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Artwork Navigation - Side Arrows */}
          {hasNavigation && !isMobile && (
            <>
              {/* Previous Button - Left Side */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("prev")}
                disabled={currentIndex === 0}
                className={cn(
                  "absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-[60]",
                  "w-12 h-12 rounded-full",
                  "bg-black/40 hover:bg-black/60 backdrop-blur-sm",
                  "text-white/80 hover:text-white",
                  "transition-all duration-200",
                  "disabled:opacity-30 disabled:pointer-events-none",
                  "hover:scale-110"
                )}
                aria-label="Previous artwork"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Next Button - Right Side */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("next")}
                disabled={currentIndex === allArtworks.length - 1}
                className={cn(
                  "absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-[60]",
                  "w-12 h-12 rounded-full",
                  "bg-black/40 hover:bg-black/60 backdrop-blur-sm",
                  "text-white/80 hover:text-white",
                  "transition-all duration-200",
                  "disabled:opacity-30 disabled:pointer-events-none",
                  "hover:scale-110"
                )}
                aria-label="Next artwork"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Artwork Counter - Bottom Center */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[60]">
                <span className="bg-black/50 backdrop-blur-sm text-white/80 text-sm px-3 py-1.5 rounded-full">
                  {currentIndex + 1} / {allArtworks.length}
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
