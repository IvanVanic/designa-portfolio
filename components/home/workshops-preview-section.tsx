/**
 * Workshops Preview Section Component
 * Displays a preview of upcoming workshops with animated cards
 */

"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { WorkshopCard } from "@/components/workshops/workshop-card";
import { AllWorkshopsModal } from "@/components/workshops/all-workshops-modal";
import { WorkshopDetailsModal } from "@/components/workshops/workshop-details-modal";
import { getUpcomingWorkshops } from "@/lib/workshops";
import type { Workshop } from "@/types";

export function WorkshopsPreviewSection() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [showAllWorkshops, setShowAllWorkshops] = useState(false);

  const upcomingWorkshops = getUpcomingWorkshops(3);

  const handleWorkshopSelect = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
  };

  const handleShowAllWorkshops = () => {
    setShowAllWorkshops(true);
  };

  return (
    <section
      id="workshops"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-gaming-dark to-background relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-2 h-2 bg-accent/30 rounded-full animate-pulse" />
        <div className="absolute top-64 right-32 w-1 h-1 bg-accent/20 rounded-full animate-pulse animation-delay-500" />
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-accent/25 rounded-full animate-pulse animation-delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sora text-foreground mb-6 lg:mb-4 text-shadow-lg animate-in slide-in-from-top-4 duration-700 ease-out">
            Upcoming Workshops
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 lg:mb-12 animate-in slide-in-from-top-4 duration-700 ease-out animation-delay-200">
            Join our specialized workshops to enhance your game art skills with hands-on learning
            and expert guidance.
          </p>
        </AnimatedSection>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {upcomingWorkshops.map((workshop, index) => (
            <AnimatedSection key={workshop.id} delay={index * 150}>
              <WorkshopCard
                workshop={workshop}
                onSelect={handleWorkshopSelect}
                className="h-full"
              />
            </AnimatedSection>
          ))}
        </div>

        {/* View All Workshops Button */}
        <AnimatedSection delay={800} className="text-center">
          <Button
            onClick={handleShowAllWorkshops}
            variant="outline"
            className="font-medium px-8 py-3 text-base rounded-lg transition-all duration-300 group cursor-none border-accent/30 hover:border-accent/80 hover:bg-accent/10 hover:text-accent"
          >
            <span>View All Workshops</span>
          </Button>
        </AnimatedSection>

        {/* Workshop Details Modal */}
        <WorkshopDetailsModal
          workshop={selectedWorkshop}
          open={!!selectedWorkshop}
          onOpenChange={(open) => !open && setSelectedWorkshop(null)}
        />

        {/* All Workshops Modal */}
        <AllWorkshopsModal
          open={showAllWorkshops}
          onOpenChange={(open) => !open && setShowAllWorkshops(false)}
          onWorkshopSelect={handleWorkshopSelect}
        />
      </div>
    </section>
  );
}
