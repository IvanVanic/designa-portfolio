"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Workshop } from "@/lib/workshops";
import { format } from "date-fns";
import Link from "next/link";

interface WorkshopDetailsModalProps {
  workshop: Workshop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkshopDetailsModal({ workshop, open, onOpenChange }: WorkshopDetailsModalProps) {
  if (!workshop) return null;

  // derive dates
  const [startStr, endStr] = workshop.dateRange.split(" to ");
  const startDate = new Date(`${startStr}T00:00:00`);
  const endDate = new Date(`${endStr || startStr}T00:00:00`);

  // Build extended description (fallback to original if provided longer externally)
  const extendedDescription = `${workshop.description} This intensive, hands-on workshop is led by seasoned industry professionals who will guide you through live demonstrations, personalised feedback, and project-based assignments. By the end of the session you will have strengthened your understanding of key techniques and produced a portfolio-ready piece.`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background border-border">
        <DialogHeader className="border-b border-border/20 pb-4">
          <DialogTitle className="text-2xl font-bold font-sora text-foreground">
            {workshop.title}
          </DialogTitle>
          <DialogDescription className="text-foreground/70">{workshop.level}</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Workshop Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gaming-card rounded-lg border border-accent/30">
            <div className="space-y-1">
              <div className="text-xs text-foreground/60 uppercase tracking-wide font-medium">
                Start
              </div>
              <div className="text-sm font-medium text-foreground">
                {format(startDate, "dd/MM/yyyy")}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-foreground/60 uppercase tracking-wide font-medium">
                End
              </div>
              <div className="text-sm font-medium text-foreground">
                {format(endDate, "dd/MM/yyyy")}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-foreground/60 uppercase tracking-wide font-medium">
                Seats
              </div>
              <div className="text-sm font-medium text-foreground">{workshop.seats} seats</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-foreground/60 uppercase tracking-wide font-medium">
                Price
              </div>
              <div className="text-lg font-bold text-accent">{workshop.price}</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
            {extendedDescription}
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/20">
          {/* Tags */}
          {workshop.skills && (
            <div className="flex flex-wrap gap-2">
              {workshop.skills.map((s) => (
                <span
                  key={s}
                  className="bg-accent/10 text-accent px-2 py-1 rounded text-sm border border-accent/20"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Register */}
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfDpcdummy" target="_blank">
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground cursor-none"
              size="lg"
            >
              Register Now
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
