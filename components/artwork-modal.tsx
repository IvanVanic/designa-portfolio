"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Artwork } from "@/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  allArtworks: Artwork[];
  onNavigate: (artwork: Artwork) => void;
}

export function ArtworkModal({
  artwork,
  isOpen,
  onClose,
  allArtworks = [],
  onNavigate,
}: ArtworkModalProps) {
  if (!artwork) return null;

  const currentIndex = allArtworks.findIndex((a) => a.id === artwork.id);
  const hasNavigation = allArtworks.length > 1;

  const navigate = (direction: "next" | "prev") => {
    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < allArtworks.length) {
      onNavigate(allArtworks[nextIndex]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl w-full h-auto bg-transparent border-none p-0 shadow-none"
      >
        <DialogTitle asChild>
          <VisuallyHidden>{artwork.title}</VisuallyHidden>
        </DialogTitle>
        {/* Navigation Buttons */}
        {hasNavigation && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("prev")}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-accent bg-transparent hover:bg-transparent hover:text-white disabled:opacity-50 z-50 transition-colors"
            >
              <ChevronLeft className="w-12 h-12" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("next")}
              disabled={currentIndex === allArtworks.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-accent bg-transparent hover:bg-transparent hover:text-white disabled:opacity-50 z-50 transition-colors"
            >
              <ChevronRight className="w-12 h-12" />
            </Button>
          </>
        )}
        <div className={cn("rounded-lg p-0.5", "bg-gradient-to-b from-accent/30 to-accent/10")}>
          <div className="bg-background-card rounded-lg">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-accent/10">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold font-sora text-foreground">{artwork.title}</h2>
                <Badge
                  variant="secondary"
                  className="bg-accent/10 text-accent px-3 py-1 text-xs font-medium rounded-full w-fit"
                >
                  {artwork.type}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-foreground/70 hover:text-foreground hover:bg-accent/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Image */}
            <div className="p-6 relative">
              <div className="relative h-[60vh] rounded-lg overflow-hidden bg-background">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  layout="fill"
                  objectFit="contain"
                  className="p-4"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 border-t border-accent/10">
              <p className="text-base text-foreground/80 mb-6 mt-6">{artwork.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs border-accent/30 text-accent/80 bg-transparent"
                  >
                    Created: {artwork.date || "2024"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-accent/30 text-accent/80 bg-transparent"
                  >
                    Software: {artwork.software || "Photoshop, Blender"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-accent/30 text-accent/80 bg-transparent"
                  >
                    Style: {artwork.style || "Digital Art"}
                  </Badge>
                </div>
                {hasNavigation && (
                  <div className="text-sm text-foreground/70">
                    {currentIndex + 1} / {allArtworks.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
