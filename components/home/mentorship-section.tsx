/**
 * Mentorship Section Component
 * A full-width section to showcase mentorship programs.
 */

"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Clock, Target } from "lucide-react";

export function MentorshipSection() {
  const mentorshipPrograms = [
    {
      id: 1,
      title: "1-on-1 Mentorship",
      description: "Personalized guidance from industry experts to accelerate your career growth.",
      duration: "3-6 months",
      sessions: "12 sessions",
      price: "$1,200",
      features: [
        "Personalized curriculum",
        "Portfolio review",
        "Industry insights",
        "Career guidance",
      ],
    },
    {
      id: 2,
      title: "Group Mentorship",
      description: "Learn alongside peers in a collaborative environment with expert guidance.",
      duration: "2-4 months",
      sessions: "8 sessions",
      price: "$600",
      features: ["Peer learning", "Group projects", "Networking", "Shared resources"],
    },
  ];

  return (
    <section id="mentorship" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sora text-foreground mb-6 text-shadow-lg">
            Accelerate Your Growth
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Get personalized guidance from industry professionals and take your game art skills to
            the next level with our mentorship programs.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {mentorshipPrograms.map((program, index) => (
            <AnimatedSection key={program.id} delay={index * 200}>
              <div className="bg-gaming-card border border-accent/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-none group">
                <div className="flex items-start justify-between mb-6">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/30">
                    {program.duration}
                  </Badge>
                  <span className="text-2xl font-bold text-accent">{program.price}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold font-sora text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  {program.title}
                </h3>

                <p className="text-foreground/80 mb-6 leading-relaxed">{program.description}</p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Clock className="w-4 h-4" />
                    <span>{program.sessions}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Users className="w-4 h-4" />
                    <span>Expert guidance</span>
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <h4 className="font-semibold text-foreground mb-3">What you&apos;ll get:</h4>
                  {program.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm text-foreground/70"
                    >
                      <Target className="w-3 h-3 text-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/80"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={600} className="text-center">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-accent/20 cursor-none group">
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
