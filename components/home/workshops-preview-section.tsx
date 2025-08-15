/**
 * Workshops Preview Section Component
 * Shows a preview of available workshops with call-to-action
 */

"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Clock, Star } from "lucide-react";
import Link from "next/link";

export function WorkshopsPreviewSection() {
  const featuredWorkshops = [
    {
      id: 1,
      title: "Character Design Masterclass",
      level: "Intermediate",
      duration: "8 weeks",
      students: 24,
      rating: 4.9,
      price: "$299",
      badge: "Popular",
    },
    {
      id: 2,
      title: "Environment Art Fundamentals",
      level: "Beginner",
      duration: "6 weeks",
      students: 18,
      rating: 4.8,
      price: "$199",
      badge: "New",
    },
    {
      id: 3,
      title: "Advanced 3D Modeling",
      level: "Advanced",
      duration: "10 weeks",
      students: 12,
      rating: 4.9,
      price: "$399",
      badge: "Limited",
    },
  ];

  return (
    <section id="workshops" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-2 h-2 bg-accent/30 rounded-full animate-pulse" />
        <div className="absolute top-64 right-32 w-1 h-1 bg-accent/20 rounded-full animate-pulse animation-delay-500" />
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-accent/25 rounded-full animate-pulse animation-delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sora text-foreground mb-6 text-shadow-lg">
            Learn from the Best
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Join our expert-led workshops and master the art of game design. From fundamentals to
            advanced techniques, we&apos;ve got you covered.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 lg:mb-16">
            {featuredWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-gaming-card border border-accent/20 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-none group"
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-accent/10 text-accent border-accent/30 hover:border-accent/80 hover:bg-accent/10 hover:text-accent"
                  >
                    {workshop.badge}
                  </Badge>
                  <span className="text-2xl font-bold text-accent">{workshop.price}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-sora text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  {workshop.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Users className="w-4 h-4" />
                    <span>{workshop.level}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Clock className="w-4 h-4" />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>
                      {workshop.rating} ({workshop.students} students)
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/80"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400} className="text-center">
          <Link href="/workshops">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-accent/20 cursor-none group">
              View All Workshops
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
