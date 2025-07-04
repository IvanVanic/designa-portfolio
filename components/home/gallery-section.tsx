/**
 * Gallery Section Component
 * Displays a grid of artwork cards with loading states
 */

"use client";

import { GallerySkeleton } from "@/components/skeleton-loaders";
import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type React from "react";
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {displayedArtworks.map((artwork, index) => (
                <div
                  key={artwork.id}
                  className="gallery-card-animate"
                  style={{
                    animationDelay: `${index * ANIMATION_DELAYS.long}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <Card
                    className="group cursor-pointer md:cursor-none overflow-hidden bg-gaming-card border-2 border-accent/20 hover:border-accent/60 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-accent/20 transition-all duration-700 ease-out transform hover:-translate-y-2 hover:scale-[1.05] relative animate-subtle-pulse"
                    onClick={() => onSelect(artwork)}
                    style={{ animationDelay: `${index * 300}ms` }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none rounded-xl" />

                    <CardContent className="p-0 relative overflow-hidden">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src={artwork.image || "/placeholder.svg"}
                          alt={artwork.title}
                          width={IMAGE_SIZES.galleryCard.width}
                          height={IMAGE_SIZES.galleryCard.height}
                          className="w-full h-40 md:h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                        />

                        {/* Animated overlay effects */}
                        <div className="absolute inset-0 bg-gaming-dark/0 group-hover:bg-gaming-dark/10 transition-colors duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Animated border effect */}
                        <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 transition-colors duration-500 rounded-t-xl" />

                        {/* Category Badge - positioned in bottom left of image */}
                        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          <Badge className="bg-accent text-accent-foreground px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm font-medium rounded-md shadow-lg backdrop-blur-sm border border-accent/30 hover:scale-105 transition-transform duration-300">
                            {artwork.type}
                          </Badge>
                        </div>

                        {/* Hover indicator */}
                        <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-accent rounded-full animate-pulse" />
                        </div>
                      </div>

                      {/* Title and details at bottom of card */}
                      <div className="p-4 md:p-6 bg-gradient-to-t from-gaming-card to-gaming-card/90">
                        <h3 className="text-lg md:text-xl font-semibold font-sora text-foreground group-hover:text-accent transition-colors duration-300 group-hover:scale-105 transform transition-transform duration-300 ease-out mb-2">
                          {artwork.title}
                        </h3>

                        {/* Additional artwork information */}
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            <Badge
                              variant="outline"
                              className="text-xs border-accent/20 text-accent/60 bg-accent/5"
                            >
                              {artwork.date || "2024"}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs border-accent/20 text-accent/60 bg-accent/5"
                            >
                              {artwork.software || "Digital"}
                            </Badge>
                          </div>

                          <p className="text-sm text-foreground/60 line-clamp-2">
                            {artwork.description ||
                              "Professional game art showcasing exceptional creativity and technical skill."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
