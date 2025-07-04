/**
 * Hero Section Component
 * Main landing section with call-to-action and hero content
 */

"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  /** Callback for navigation events */
  onNavigate: (id: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          filter: "blur(2px) brightness(0.3)",
        }}
      />
      <div className="relative z-10 text-center text-[#E7E5DF] px-4">
        <AnimatedSection animation="fadeUp">
          <h1 className="text-6xl md:text-8xl font-bold tracking-[0.1em] mb-6">DESIGNA</h1>
          <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            Creating immersive game art and 3D assets.
          </p>
          <Button
            onClick={() => onNavigate("works")}
            size="lg"
            className="bg-[#44BBA4] hover:bg-[#44BBA4]/90 text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 cursor-none"
            aria-label="View Gallery - navigate to works section"
          >
            View Gallery
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
