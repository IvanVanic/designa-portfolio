/**
 * Hero Section Component
 * Displays the main hero section with headline, description, and call-to-action
 */

"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Particles } from "@/components/particles";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-gaming-dark to-background relative overflow-hidden px-4 sm:px-6 lg:px-8 animate-background-breath"
    >
      <Particles count={70} variant="flowing" />
      <Particles count={20} variant="stationary" className="opacity-50" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatedSection>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold font-sora text-foreground mb-6 lg:mb-8 text-shadow-lg animate-in slide-in-from-top-8 duration-1000 ease-out">
            <span className="text-white">DESIGNA</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed animate-in slide-in-from-top-4 duration-1000 ease-out animation-delay-300">
            Game art and character design agency specializing in video game assets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-in slide-in-from-top-4 duration-1000 ease-out animation-delay-600">
            <Button
              onClick={() => onNavigate("works")}
              className="bg-accent hover:bg-accent/80 text-accent-foreground font-medium px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-gaming transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-accent/20 border border-accent/30 hover:border-accent/60 cursor-none group w-full sm:w-auto animate-gentle-glow"
            >
              <span className="group-hover:animate-pulse">View Our Work</span>
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Button>

            <Button
              onClick={() => onNavigate("workshops")}
              variant="outline"
              className="border-accent/30 hover:border-accent text-accent hover:bg-accent hover:text-accent-foreground font-medium px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-gaming transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-accent/20 cursor-none group w-full sm:w-auto animate-gentle-glow animation-delay-500"
            >
              <Play className="mr-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ease-out group-hover:scale-110" />
              <span className="group-hover:animate-pulse">Join Workshop</span>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
