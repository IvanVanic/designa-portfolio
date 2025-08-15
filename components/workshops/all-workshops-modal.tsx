/**
 * All Workshops Modal Component
 * Displays all workshops in a modal with filtering functionality
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getUpcomingWorkshops, filterWorkshops, Workshop } from "@/lib/workshops";
import { FilterBar } from "@/components/workshops/filter-bar";
import { WorkshopCard } from "@/components/workshops/workshop-card";
import { AnimatedSection } from "@/components/animated-section";
import { WorkshopDetailsModal } from "@/components/workshops/workshop-details-modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkshopFilters } from "@/types";

interface AllWorkshopsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkshopSelect?: (workshop: Workshop) => void;
}

/**
 * All Workshops Modal Component
 * Manages workshop display and filtering in a modal interface
 */
export function AllWorkshopsModal({
  open,
  onOpenChange,
  onWorkshopSelect,
}: AllWorkshopsModalProps) {
  const allWorkshops = useMemo(() => getUpcomingWorkshops(999), []);
  const [filtered, setFiltered] = useState<Workshop[]>(allWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<WorkshopFilters>({});

  const handleFilterChange = useCallback((filters: WorkshopFilters) => {
    setActiveFilters(filters);
    setFiltered(filterWorkshops(filters));
  }, []);

  const handleOpenDetails = useCallback(
    (workshop: Workshop) => {
      setSelectedWorkshop(workshop);
      setIsDetailsModalOpen(true);
      onWorkshopSelect?.(workshop);
    },
    [onWorkshopSelect]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col bg-background-card border-accent/20">
        <DialogHeader className="p-8 pb-6 border-b border-accent/20">
          <DialogTitle className="text-4xl font-bold font-sora text-foreground text-center mb-4">
            Workshops
          </DialogTitle>
          <FilterBar onChange={handleFilterChange} />
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {filtered.map((workshop, idx) => (
              <AnimatedSection key={workshop.id} delay={idx * 100}>
                <WorkshopCard workshop={workshop} onSelect={handleOpenDetails} className="h-full" />
              </AnimatedSection>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-xl md:text-2xl text-foreground/70">
                  Try changing your filter settings or clearing active filters.
                </p>
                {activeFilters.category && (
                  <p className="text-sm text-foreground/60 mt-2">
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
