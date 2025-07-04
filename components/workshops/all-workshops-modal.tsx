/**
 * All Workshops Modal Component
 * Displays all workshops in a modal with filtering functionality
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getUpcomingWorkshops, filterWorkshops, Workshop } from "@/lib/workshops";
import { FilterBar } from "@/components/workshops/filter-bar";
import { WorkshopCard } from "@/components/workshops/workshop-card";
import { AnimatedSection } from "@/components/animated-section";
import { WorkshopDetailsModal } from "@/components/workshops/workshop-details-modal";
import workshopsJson from "@/data/workshops.json";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkshopFilters, WorkshopData, WorkshopCategory } from "@/types";
import { ANIMATION_DELAYS } from "@/constants";

interface AllWorkshopsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * All Workshops Modal Component
 * Manages workshop display and filtering in a modal interface
 */
export function AllWorkshopsModal({ open, onOpenChange }: AllWorkshopsModalProps) {
  const allWorkshops = useMemo(() => getUpcomingWorkshops(999), []);
  const [filtered, setFiltered] = useState<Workshop[]>(allWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<WorkshopFilters>({});

  const handleFilterChange = useCallback((filters: WorkshopFilters) => {
    setActiveFilters(filters);
    setFiltered(filterWorkshops(filters));
  }, []);

  const handleOpenDetails = useCallback((workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsDetailsModalOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>All Workshops</DialogTitle>
          <DialogDescription>
            Filter and browse all our upcoming hands-on workshops.
          </DialogDescription>
        </DialogHeader>

        <div className="border-t border-b py-4">
          <FilterBar onChange={handleFilterChange} />
        </div>

        <ScrollArea className="flex-1">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-6">
            {filtered.map((workshop, idx) => {
              const category = (workshopsJson as WorkshopData).categories.find(
                (c: WorkshopCategory) => c.id === workshop.type
              );
              return (
                <AnimatedSection key={workshop.id} delay={idx * ANIMATION_DELAYS.short}>
                  <WorkshopCard
                    workshop={workshop}
                    category={category}
                    onDetails={handleOpenDetails}
                  />
                </AnimatedSection>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-xl md:text-2xl text-[#393E41]/70">
                  Try changing your filter settings or clearing active filters.
                </p>
                {activeFilters.month && (
                  <p className="text-sm text-[#393E41]/60 mt-2">
                    Only workshops which start and end within the set dates will be shown.
                  </p>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        <WorkshopDetailsModal
          workshop={selectedWorkshop}
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
