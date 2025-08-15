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
  const [prefetchedImages, setPrefetchedImages] = useState<string[]>([]);

  // All images including main image and sub-images
  const allImages = artwork ? [artwork.image, ...(artwork.subImages || [])] : [];
  const hasMultipleImages = allImages.length > 1;

  const withVersion = (src: string) =>
    artwork ? (src.includes("?") ? src : `${src}?v=${artwork.id}`) : src;

  // Reset image index when artwork changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setMainImageLoaded(false);
    setPrefetchedImages([]);
  }, [artwork?.id]);

  // start prefetching sub-images only after the main image has loaded
  useEffect(() => {
    if (!artwork || !mainImageLoaded) return;
    const urls = (artwork.subImages || []).map((img) => withVersion(img));
    const controllers = urls.map(() => new AbortController());
    urls.forEach((url, i) => {
      try {
        fetch(url, { signal: controllers[i].signal, cache: "force-cache" })
          .then(() => {
            setPrefetchedImages((prev) => (prev.includes(url) ? prev : [...prev, url]));
          })
          .catch(() => {});
      } catch {}
    });
    return () => controllers.forEach((c) => c.abort());
  }, [artwork?.id, mainImageLoaded]);

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
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="fixed top-3 right-3 md:absolute md:top-3 md:right-3 z-[70] text-white hover:text-accent transition-colors bg-black/30 hover:bg-black/40 backdrop-blur-sm rounded-full md:bg-transparent md:hover:bg-transparent md:backdrop-blur-0 md:rounded-none md:hover:text-accent focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 md:hover:drop-shadow-[0_0_10px_rgba(45,212,191,0.7)]" />
              </Button>

              {/* Responsive body */}
              {isMobile ? (
                <div className="flex h-full flex-col overflow-y-auto min-h-0 mobile-modal-content">
                  {/* Images stacked */}
                  <div className="bg-muted/30">
                    {allImages.map((image, index) => (
                      <div
                        key={`${artwork.id}-${image}-${index}`}
                        className={cn(
                          "relative w-full",
                          index === 0
                            ? "h-[48vh] mobile-modal-image-primary"
                            : "h-[36vh] mobile-modal-image-secondary"
                        )}
                      >
                        <Image
                          src={withVersion(image)}
                          alt={`${artwork.title} ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="95vw"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Content below images - add bottom padding for fixed navigation */}
                  <div className="px-5 py-6 pb-24 bg-background" id="artwork-details-bottom">
                    <h2 className="text-xl font-bold mb-2">{artwork.title}</h2>
                    <p className="text-foreground/80 mb-5 text-sm leading-relaxed">
                      {artwork.description}
                    </p>

                    <div className="mb-4">
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
                      <div className="mb-5">
                        <h3 className="text-xs uppercase tracking-wide font-semibold mb-2 text-foreground/60">
                          SOFTWARE USED
                        </h3>
                        <p className="text-foreground/80 text-sm">{artwork.software.join(", ")}</p>
                      </div>
                    )}

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

                    {/* Mobile navigation buttons - fixed bottom bar */}
                    {hasNavigation && (
                      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-white/10 flex justify-between items-center safe-area-padding-bottom">
                        <Button
                          variant="outline"
                          size="default"
                          onClick={() => navigate("prev")}
                          disabled={currentIndex === 0}
                          className="text-white border-white/30 hover:bg-white/10 hover:text-white min-w-[100px]"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Prev
                        </Button>
                        <Button
                          variant="outline"
                          size="default"
                          onClick={() => navigate("next")}
                          disabled={currentIndex === allArtworks.length - 1}
                          className="text-white border-white/30 hover:bg-white/10 hover:text-white min-w-[100px]"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
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
                        src={withVersion(allImages[currentImageIndex] || "/placeholder.svg")}
                        alt={`${artwork.title} artwork`}
                        fill
                        className={cn(
                          "object-contain transition-opacity duration-200",
                          mainImageLoaded ? "opacity-100" : "opacity-0"
                        )}
                        sizes="50vw"
                        priority
                        onLoad={() => setMainImageLoaded(true)}
                        onLoadingComplete={() => setMainImageLoaded(true)}
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

          {/* Artwork Navigation - below card but inside portal */}
          {hasNavigation && !isMobile && (
            <div className="flex items-center justify-center mt-5">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("prev")}
                  disabled={currentIndex === 0}
                  className="text-white border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("next")}
                  disabled={currentIndex === allArtworks.length - 1}
                  className="text-white border-white/30 hover:bg-white/10 hover:text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
