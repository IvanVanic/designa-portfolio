/**
 * Gallery Section Component
 * Displays a grid of artwork cards with loading states
 */

"use client";

import { GallerySkeleton } from "@/components/skeleton-loaders";
import { AnimatedSection } from "@/components/animated-section";
import { ArtworkCard } from "./artwork-card";
import { Artwork } from "@/types";
import { ANIMATION_DELAYS, IMAGE_SIZES } from "@/constants";
import { Particles } from "@/components/particles";

interface GallerySectionProps {
  artworks: Artwork[];
  isLoading: boolean;
  onSelect: (artwork: Artwork) => void;
}

export function GallerySection({ artworks, isLoading, onSelect }: GallerySectionProps) {
  const categories = ["All", "Characters", "Environment", "2d assets", "3d assets"];

  // Show only 6 cards in 3x2 grid as shown in the target design
  const displayedArtworks = artworks.slice(0, 6);

  return (
    <section
      id="works"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden"
    >
      <Particles count={30} variant="flowing" className="opacity-50" />
      <Particles count={15} variant="stationary" className="opacity-30" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sora text-foreground mb-4 text-shadow-lg animate-in slide-in-from-top-4 duration-700 ease-out">
            Works
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 lg:mb-12 px-4">
            {categories.map((category, index) => (
              <button
                key={category}
                className="px-4 py-2 md:px-6 md:py-2 rounded-gaming font-medium text-sm md:text-base transition-all duration-500 ease-out cursor-none border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground hover:border-accent gaming-hover hover:scale-105 hover:shadow-glow-sm group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="group-hover:animate-pulse">{category}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          {isLoading ? (
            <GallerySkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayedArtworks.map((artwork, index) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onSelect={onSelect}
                  className="gallery-card-animate"
                  style={{
                    animationDelay: `${index * ANIMATION_DELAYS.long}ms`,
                    animationFillMode: "both",
                  }}
                />
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
