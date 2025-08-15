/**
 * Artwork Card Component
 * Gallery card with hover effects, tag animations, and teal overlay
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Artwork } from "@/types";

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export function ArtworkCard({
  artwork,
  onSelect,
  className,
  style,
  priority = false,
}: ArtworkCardProps) {
  const isMobile = useIsMobile();
  // Always call useState to maintain hook order
  const [isHovered, setIsHovered] = useState(false);
  const srcWithVersion = artwork.image.includes("?")
    ? artwork.image
    : `${artwork.image}?v=${artwork.id}`;

  if (isMobile) {
    // Mobile: expanded card with persistent details panel
    return (
      <button
        aria-label={`Open ${artwork.title}`}
        onClick={() => onSelect(artwork)}
        className={cn(
          "w-full text-left rounded-xl overflow-hidden border border-accent/20 bg-[linear-gradient(135deg,rgba(19,27,33,0.95)_0%,rgba(10,16,20,0.95)_100%)]",
          "shadow-lg transition-all duration-300 active:scale-[0.99]",
          className
        )}
        style={style}
      >
        <div className="relative w-full aspect-[4/3] gallery-card-mobile">
          <Image
            src={srcWithVersion}
            alt={artwork.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
            <h3 className="font-bold text-base text-white truncate">{artwork.title}</h3>
          </div>
        </div>
      </button>
    );
  }

  // Desktop: original hover overlay card

  // Get medium/type for hover display
  const displayMedium = typeof artwork.type === "string" ? artwork.type : artwork.type?.name;
  return (
    <div
      className={cn(
        "group relative aspect-[4/5] cursor-pointer rounded-lg overflow-hidden bg-card border border-accent/10 shadow-lg",
        "transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1",
        className
      )}
      style={style}
      onClick={() => onSelect(artwork)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - now fills the entire card */}
      <div className="absolute inset-0">
        <Image
          src={srcWithVersion}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      {/* Subtle gradient overlay on hover only */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Title and Medium - only visible on hover */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ease-out",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        <h3 className="text-lg font-normal text-foreground/80 drop-shadow mb-1">{artwork.title}</h3>
        {displayMedium && <p className="text-sm text-foreground/60 drop-shadow">{displayMedium}</p>}
      </div>
    </div>
  );
}
