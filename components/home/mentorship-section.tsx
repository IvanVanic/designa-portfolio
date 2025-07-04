/**
 * Mentorship Section Component
 * A full-width section with a background image to showcase mentorship programs.
 */

"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function MentorshipSection() {
  const mentorshipBenefits = [
    { icon: CheckCircle, text: "Personalized one-on-one guidance" },
    { icon: CheckCircle, text: "Learn from seasoned industry professionals" },
    { icon: CheckCircle, text: "Goal-oriented, structured learning paths" },
    { icon: CheckCircle, text: "Direct feedback on your work and portfolio" },
  ];

  return (
    <section
      id="mentorship"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/workshops-bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-bold font-sora text-foreground mb-6 text-shadow-lg">
            Accelerate Your Art Journey
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            Our mentorship program is designed to provide you with the personalized guidance and
            industry insights needed to elevate your skills and career.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12 text-left">
            {mentorshipBenefits.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <item.icon className="w-6 h-6 text-accent flex-shrink-0" />
                <p className="text-base text-foreground/80">{item.text}</p>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-accent/20 cursor-none group"
          >
            <span className="group-hover:animate-pulse">Become a Mentee</span>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
