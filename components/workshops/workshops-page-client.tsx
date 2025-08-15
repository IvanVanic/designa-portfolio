/**
 * Workshops Page Client Component
 * Main page component for displaying all workshops
 */

"use client";

import { useEffect } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { WorkshopCard } from "@/components/workshops/workshop-card";
import { getFeaturedWorkshops } from "@/lib/workshops";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Workshop } from "@/types";
import { ANIMATION_DELAYS } from "@/constants";

/**
 * Main Workshops Page Client Component
 * Displays featured workshops with proper typing
 */
export default function WorkshopsPageClient() {
  useSmoothScroll();
  useEffect(() => window.scrollTo(0, 0), []);
  const featuredWorkshops = getFeaturedWorkshops();

  return (
    <div className="min-h-screen bg-[#E7E5DF] cursor-none font-inter">
      <CustomCursor />
      <Navbar onNavigate={() => {}} />
      {/* Workshops Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#E7E5DF]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#393E41] mb-4">
              Transform Your Creative Skills
            </h2>
            <p className="text-lg text-[#393E41]/70 max-w-2xl mx-auto">
              Join our next sessions and start your journey to becoming a professional game artist.
            </p>
          </AnimatedSection>

          {featuredWorkshops.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {featuredWorkshops.map((workshop, index) => {
                return (
                  <AnimatedSection key={workshop.id} delay={index * ANIMATION_DELAYS.long}>
                    <WorkshopCard workshop={workshop as Workshop} onSelect={() => {}} />
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <AnimatedSection className="text-center">
              <Card className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-lg">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-[#44BBA4]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-8 h-8 text-[#44BBA4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#393E41] mb-4">
                    New Workshops Coming Soon
                  </h3>
                  <p className="text-[#393E41]/70 mb-6">
                    We&apos;re preparing exciting new workshop sessions. Check back soon.
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#44BBA4] text-[#44BBA4] hover:bg-[#44BBA4] hover:text-white cursor-none bg-transparent"
                  >
                    Get Notified
                  </Button>
                </div>
              </Card>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Mentorship CTA */}
      <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#D3D0CB]/30 via-[#E7E5DF] to-[#44BBA4]/10">
        <div className="max-w-6xl mx-auto w-full">
          <AnimatedSection className="text-center">
            {/* simplified content for brevity */}
            <div className="bg-white/60 rounded-3xl p-12">Request 1-on-1 Mentorship</div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
