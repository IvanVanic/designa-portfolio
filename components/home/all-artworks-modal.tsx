/**
 * All Artworks Modal Component
 * Displays all artworks in a filterable and sortable grid modal
 */

"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Artwork } from "@/types";
import { ArtworkCard } from "./artwork-card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AllArtworksModalProps {
  artworks: Artwork[];
  isOpen: boolean;
  onClose: () => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

type ThumbnailSize = "small" | "medium" | "large" | "enormous";

export function AllArtworksModal({
  artworks,
  isOpen,
  onClose,
  onSelectArtwork,
}: AllArtworksModalProps) {
  const isMobile = useIsMobile();
  const [selectedSoftware, setSelectedSoftware] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [thumbnailSize, setThumbnailSize] = useState<ThumbnailSize>("medium");

  // Build software options from software arrays
  const allSoftware = useMemo(() => {
    const set = new Set<string>();
    artworks.forEach((a) => {
      if (!a.software) return;
      a.software.forEach((s) => {
        const v = s.trim();
        if (v) set.add(v);
      });
    });
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [artworks]);

  // Build type options
  const allTypes = useMemo(() => {
    const set = new Set<string>();
    artworks.forEach((a) => {
      if (typeof a.type === "string") {
        set.add(a.type);
      } else if (a.type?.name) {
        set.add(a.type.name);
      }
    });
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [artworks]);

  // Filter and sort artworks with software purity sorting
  const filteredAndSortedArtworks = useMemo(() => {
    let filtered = artworks;

    // Filter by type
    if (selectedType !== "All") {
      filtered = filtered.filter((a) => {
        const artworkType = typeof a.type === "string" ? a.type : a.type?.name;
        return artworkType === selectedType;
      });
    }

    // Filter by software
    if (selectedSoftware !== "All") {
      filtered = filtered.filter((a) => a.software?.includes(selectedSoftware));

      // Sort by software purity (fewest non-selected software tags first)
      filtered = [...filtered].sort((a, b) => {
        const aOtherSoftware = (a.software || []).filter((s) => s !== selectedSoftware).length;
        const bOtherSoftware = (b.software || []).filter((s) => s !== selectedSoftware).length;
        return aOtherSoftware - bOtherSoftware;
      });
    }

    return filtered;
  }, [artworks, selectedSoftware, selectedType]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "max-w-7xl w-[95vw] p-0 bg-background border border-white/10",
          "flex flex-col overflow-hidden",
          isMobile ? "h-[86vh]" : "h-[90vh]"
        )}
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          <VisuallyHidden>All Artworks Gallery</VisuallyHidden>
        </DialogTitle>
        <DialogDescription className="sr-only">
          Browse and filter through all available artworks
        </DialogDescription>

        {/* Header with filters and close button */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              All Works ({filteredAndSortedArtworks.length})
            </h2>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground hover:bg-accent/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col gap-3 p-4 sm:p-6 pt-4 border-b border-white/5 bg-background/50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Software Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/80 font-medium">Software:</span>
              <Select value={selectedSoftware} onValueChange={(v) => setSelectedSoftware(v)}>
                <SelectTrigger className="h-8 flex-1 bg-accent/10 border-accent/20 text-foreground">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {allSoftware.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/80 font-medium">Medium:</span>
              <Select value={selectedType} onValueChange={(v) => setSelectedType(v)}>
                <SelectTrigger className="h-8 flex-1 bg-accent/10 border-accent/20 text-foreground">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {allTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Thumbnail Size */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/80 font-medium">Thumbnails:</span>
              <Select
                value={thumbnailSize}
                onValueChange={(v) => setThumbnailSize(v as ThumbnailSize)}
              >
                <SelectTrigger className="h-8 flex-1 bg-accent/10 border-accent/20 text-foreground">
                  <SelectValue placeholder="Medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (5)</SelectItem>
                  <SelectItem value="medium">Default (4)</SelectItem>
                  <SelectItem value="large">Large (3)</SelectItem>
                  <SelectItem value="enormous">Enormous (2)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Artworks Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredAndSortedArtworks.length > 0 ? (
            <div
              className={cn(
                "grid gap-4 sm:gap-6",
                isMobile
                  ? "grid-cols-1"
                  : thumbnailSize === "small"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5"
                  : thumbnailSize === "medium"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
                  : thumbnailSize === "large"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
                  : "grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
              )}
            >
              {filteredAndSortedArtworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onSelect={onSelectArtwork}
                  className="hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div className="text-foreground/60">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No artworks found</p>
                <p className="text-sm">Try selecting a different tag or adjusting your filters.</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
