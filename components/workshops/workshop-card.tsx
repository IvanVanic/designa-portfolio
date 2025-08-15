/**
 * Workshop Card Component
 * Displays workshop information with hover effects and animations
 */

"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Workshop } from "@/types";

interface WorkshopCardProps {
  workshop: Workshop;
  onSelect: (workshop: Workshop) => void;
  className?: string;
}

export function WorkshopCard({ workshop, onSelect, className }: WorkshopCardProps) {
  // Parse dateRange to get start and end dates
  const [startStr, endStr] = workshop.dateRange.split(" to ");
  const startDate = new Date(startStr);
  const endDate = new Date(endStr || startStr);

  return (
    <div
      className={cn(
        "group cursor-pointer md:cursor-none rounded-lg p-0.5 shadow-lg transition-all duration-500 ease-out transform hover:-translate-y-1 h-full",
        "bg-gradient-to-b from-accent/10 to-accent/30",
        className
      )}
      onClick={() => onSelect(workshop)}
    >
      <div className="bg-background-card h-full rounded-lg relative px-6 py-8 flex flex-col">
        <div className="flex gap-x-3 mb-3">
          <p className="text-sm text-accent font-medium capitalize">
            {workshop.type.replace("-", " ")}
          </p>
          <p className="text-sm text-accent/70 font-medium capitalize">{workshop.level}</p>
        </div>

        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-2xl font-bold font-sora text-foreground group-hover:text-accent transition-colors duration-300">
            {workshop.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 flex-1 flex flex-col">
          <p className="text-sm text-foreground/70 mb-8 flex-grow">{workshop.description}</p>

          {/* Workshop Details Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8">
            <div className="space-y-1">
              <div className="text-xs text-foreground/60 uppercase tracking-wide font-medium">
                Start
              </div>
              <div className="text-sm font-medium text-foreground">
                {startDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-foreground/60 uppercase tracking-wide font-medium">
                End
              </div>
              <div className="text-sm font-medium text-foreground">
                {endDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-foreground/60 uppercase tracking-wide font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Seats
              </div>
              <div className="text-lg font-bold text-foreground">{workshop.seats}</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-foreground/60 uppercase tracking-wide font-medium">
                Price
              </div>
              <div className="text-lg font-bold text-accent">{workshop.price}</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 text-base rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_20px_0px_rgba(0,255,255,0.1)] hover:shadow-[0_6px_24px_0px_rgba(0,255,255,0.15)] cursor-none group">
              <span className="group-hover:animate-pulse">Join</span>
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
