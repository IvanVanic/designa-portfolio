/**
 * Gallery Section Component
 * Displays a grid of artwork cards with loading states
 */

"use client";

import { GallerySkeleton } from "@/components/skeleton-loaders";
import { AnimatedSection } from "@/components/animated-section";
import { ArtworkCard } from "./artwork-card";
import { Artwork } from "@/types";
import { ANIMATION_DELAYS, UI_TEXT } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";
// Background effects removed for a cleaner fixed gradient

interface GallerySectionProps {
  artworks: Artwork[];
  isLoading: boolean;
  onSelect: (artwork: Artwork) => void;
  onViewAll?: () => void;
}

const FEATURED_TITLES = [
  "dark urge",
  "viking axe",
  "minotaur",
  "semi realism concept",
  "game concepts ark fantastic",
  "action shot",
];

export function GallerySection({ artworks, isLoading, onSelect, onViewAll }: GallerySectionProps) {
  const isMobile = useIsMobile();

  // Responsive preview count: 4 on mobile, 6 on desktop
  const previewCount = isMobile ? 4 : 6;

  const displayedArtworks = useMemo(() => {
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
    const featuredMap = new Map<string, Artwork>();
    for (const art of artworks) {
      const key = normalize(art.title);
      if (FEATURED_TITLES.some((t) => key.includes(t))) {
        featuredMap.set(key, art);
      }
    }
    const featuredOrdered: Artwork[] = [];
    for (const want of FEATURED_TITLES) {
      const found = Array.from(featuredMap.values()).find((a) => normalize(a.title).includes(want));
      if (found && !featuredOrdered.includes(found)) featuredOrdered.push(found);
    }
    const remaining = artworks.filter((a) => !featuredOrdered.includes(a));
    const picked = [...featuredOrdered, ...remaining];
    return picked.slice(0, previewCount);
  }, [artworks, previewCount]);

  return (
    <section id="works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sora text-foreground mb-4 text-shadow-lg animate-in slide-in-from-top-4 duration-700 ease-out">
            Featured works
          </h2>

          {/* Category Filter removed per spec */}
        </AnimatedSection>

        <AnimatedSection delay={200}>
          {isLoading ? (
            <GallerySkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {displayedArtworks.map((artwork, index) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    onSelect={onSelect}
                    priority={!isMobile && index < 3}
                    className="gallery-card-animate"
                    style={{
                      animationDelay: `${index * ANIMATION_DELAYS.long}ms`,
                      animationFillMode: "both",
                    }}
                  />
                ))}
              </div>

              {/* View All button - only show if there are more artworks (prefer desktop) */}
              {artworks.length > previewCount && onViewAll && (
                <AnimatedSection delay={600} className="text-center mt-8 lg:mt-12">
                  <button
                    onClick={onViewAll}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 rounded-lg transition-all duration-300 hover:scale-105 font-medium"
                  >
                    {UI_TEXT.viewAllWorks}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </AnimatedSection>
              )}
            </>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
