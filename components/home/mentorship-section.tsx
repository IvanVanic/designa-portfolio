"use client"

import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Star, ExternalLink } from "lucide-react";
import Link from "next/link";

export function MentorshipSection() {
  return (
    <section className="w-full bg-gradient-to-br from-[#D3D0CB]/50 via-[#E7E5DF] to-[#44BBA4]/10 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        <AnimatedSection className="text-center">
          <span className="inline-flex items-center space-x-2 mb-4">
            <Badge variant="secondary">NEW</Badge>
            <p className="text-sm tracking-wide text-[#44BBA4] uppercase">1-on-1 Mentorship</p>
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#393E41] mb-6">
            Personalised Guidance From Industry Pros
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-[#393E41]/80">
            Accelerate your growth as a game artist with tailored sessions focused on your goals, portfolio and skill gaps.
          </p>
        </AnimatedSection>

        {/* Benefits Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          <AnimatedSection delay={100}>
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#44BBA4]/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#44BBA4]" />
                </div>
                <h3 className="font-semibold text-[#393E41]">Expert Mentors</h3>
                <p className="text-sm text-[#393E41]/70">
                  Work with seasoned professionals who shipped titles you know &amp; love.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#44BBA4]/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#44BBA4]" />
                </div>
                <h3 className="font-semibold text-[#393E41]">Flexible Schedule</h3>
                <p className="text-sm text-[#393E41]/70">
                  Book sessions that fit your timeline — evenings &amp; weekends included.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#44BBA4]/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#44BBA4]" />
                </div>
                <h3 className="font-semibold text-[#393E41]">Tailored Curriculum</h3>
                <p className="text-sm text-[#393E41]/70">
                  Each meeting is crafted around your goals with actionable next steps.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* CTA */}
        <AnimatedSection delay={400} className="text-center">
          <Link href="https://forms.google.com/placeholder-mentorship-form" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#393E41] hover:bg-[#393E41]/90 text-[#E7E5DF] px-10 py-6 text-lg font-semibold cursor-none transform hover:scale-105 transition-transform">
              Request Mentorship
              <ExternalLink className="ml-3 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-[#393E41]/70">Starting from €150 / session</p>
        </AnimatedSection>
      </div>
    </section>
  );
} 