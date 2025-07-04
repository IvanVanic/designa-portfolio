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
  const endDate = new Date(`${(endStr || startStr)}T00:00:00`);

  // Build extended description (fallback to original if provided longer externally)
  const extendedDescription = `${workshop.description} This intensive, hands-on workshop is led by seasoned industry professionals who will guide you through live demonstrations, personalised feedback, and project-based assignments. By the end of the session you will have strengthened your understanding of key techniques and produced a portfolio-ready piece.`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{workshop.title}</DialogTitle>
          <DialogDescription>{workshop.level}</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Dates */}
          <div className="flex items-center gap-4 text-[#393E41] text-sm">
            <span>
              <strong>Start:</strong> {format(startDate, "dd MMM yyyy")}
            </span>
            <span>
              <strong>End:</strong> {format(endDate, "dd MMM yyyy")}
            </span>
          </div>

          {/* Description */}
          <p className="text-lg leading-relaxed text-[#393E41] whitespace-pre-line">
            {extendedDescription}
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Tags */}
          {workshop.skills && (
            <div className="flex flex-wrap gap-2">
              {workshop.skills.map((s) => (
                <span
                  key={s}
                  className="bg-[#44BBA4]/10 text-[#393E41] px-2 py-1 rounded text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Register */}
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfDpcdummy" target="_blank">
            <Button className="bg-[#44BBA4] hover:bg-[#44BBA4]/90 text-white cursor-none" size="lg">
              Register Now
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
