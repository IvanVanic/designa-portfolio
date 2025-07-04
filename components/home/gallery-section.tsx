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

interface GallerySectionProps {
  artworks: Artwork[];
  isLoading: boolean;
  onSelect: (artwork: Artwork) => void;
}

export function GallerySection({ artworks, isLoading, onSelect }: GallerySectionProps) {
  return (
    <section
      id="works"
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-[#E7E5DF]"
    >
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#393E41] mb-4">Our Works</h2>
          <p className="text-xl text-[#393E41]/70 max-w-2xl mx-auto">
            See our latest game art, characters, and digital designs.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          {isLoading ? (
            <GallerySkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks.map((artwork, index) => (
                <div
                  key={artwork.id}
                  className="gallery-card-animate"
                  style={{
                    animationDelay: `${index * ANIMATION_DELAYS.long}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <Card
                    className="group cursor-none overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-4 bg-white border-[#D3D0CB]/30"
                    onClick={() => onSelect(artwork)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <Image
                          src={artwork.image || "/placeholder.svg"}
                          alt={artwork.title}
                          width={IMAGE_SIZES.galleryCard.width}
                          height={IMAGE_SIZES.galleryCard.height}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                        />
                        <div className="absolute inset-0 bg-[#393E41]/0 group-hover:bg-[#393E41]/20 transition-colors duration-500" />
                      </div>
                      <div className="p-6">
                        <Badge className="mb-2 bg-[#44BBA4] text-white hover:bg-[#44BBA4]/90">
                          {artwork.type}
                        </Badge>
                        <h3 className="text-xl font-semibold text-[#393E41] group-hover:text-[#44BBA4] transition-colors duration-300">
                          {artwork.title}
                        </h3>
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
