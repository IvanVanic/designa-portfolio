/**
 * Workshop Card Component
 * Displays workshop information in a card format with category styling
 */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Workshop, WorkshopCategory } from "@/types";
import { UI_TEXT } from "@/constants";

interface WorkshopCardProps {
  /** Workshop data object */
  workshop: Workshop;
  /** Category styling information */
  category?: WorkshopCategory;
  /** Callback when details button is clicked */
  onDetails?: (workshop: Workshop) => void;
}

export function WorkshopCard({ workshop, category, onDetails }: WorkshopCardProps) {
  // Parse and format dates
  const [startDateStr, endDateStr] = workshop.dateRange.split(" to ");
  const formatDate = (dateStr: string) => {
    return dateStr.replace(/-/g, "/");
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onDetails?.(workshop)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onDetails?.(workshop);
        }
      }}
      className="bg-white shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col transform hover:scale-[1.02] h-full"
    >
      <CardContent className="p-0 h-full flex flex-col">
        {/* Header with gradient background */}
        <div
          className="p-6 text-white relative overflow-hidden flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${category?.color || "#44BBA4"} 0%, ${
              category?.color || "#44BBA4"
            }CC 100%)`,
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-white/20 text-white backdrop-blur-sm pointer-events-none">
                {category?.label || workshop.type}
              </Badge>
              <Badge className="bg-white/10 text-white backdrop-blur-sm uppercase pointer-events-none">
                {workshop.level}
              </Badge>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300 min-h-[3rem] flex items-center">
              {workshop.title}
            </h3>
            <div className="flex items-start space-x-2 text-white/90">
              <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Start: {formatDate(startDateStr)}</span>
                <span className="text-sm font-medium">
                  End: {formatDate(endDateStr || startDateStr)}
                </span>
              </div>
            </div>
          </div>
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="w-full h-full bg-white rounded-full transform translate-x-8 -translate-y-8" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-[#393E41] mb-6 leading-relaxed min-h-[4rem]">
              {workshop.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center">
              <span className="font-semibold text-[#393E41] text-lg justify-self-start">
                {workshop.price}
              </span>

              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <Users className="w-4 h-4" />
                <span>{workshop.seats} seats</span>
              </div>

              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onDetails?.(workshop);
                }}
                className="cursor-none justify-self-end"
              >
                Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
