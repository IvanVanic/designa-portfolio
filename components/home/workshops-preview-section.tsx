/**
 * Workshops Preview Section Component
 * Displays a preview of upcoming workshops with filtering functionality
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { getUpcomingWorkshops, filterWorkshops, Workshop } from "@/lib/workshops";
import workshopsJson from "@/data/workshops.json";
import { FilterBar } from "@/components/workshops/filter-bar";
import { WorkshopCard } from "@/components/workshops/workshop-card";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { WorkshopDetailsModal } from "@/components/workshops/workshop-details-modal";
import { AllWorkshopsModal } from "@/components/workshops/all-workshops-modal";
import { WorkshopFilters, WorkshopData, WorkshopCategory } from "@/types";
import { LAYOUT, ANIMATION_DELAYS, UI_TEXT } from "@/constants";

/**
 * Workshops Preview Section Component
 * Displays upcoming workshops with filtering and modal functionality
 */
export function WorkshopsPreviewSection() {
  const initial = useMemo(() => getUpcomingWorkshops(999), []);
  const [filtered, setFiltered] = useState<Workshop[]>(initial);
  const [selected, setSelected] = useState<Workshop | null>(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [isAllWorkshopsModalOpen, setAllWorkshopsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<WorkshopFilters>({});

  const handleFilterChange = useCallback((filters: WorkshopFilters) => {
    setActiveFilters(filters);
    setFiltered(filterWorkshops(filters));
  }, []);

  const handleWorkshopDetails = useCallback((workshop: Workshop) => {
    setSelected(workshop);
    setOpenDetailsModal(true);
  }, []);

  return (
    <section id="learn-with-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#E7E5DF]">
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#393E41] mb-4">Learn With Us</h2>
          <p className="text-lg text-[#393E41]/70 max-w-2xl mx-auto">
            Hands-on workshops designed to level you up.
          </p>
        </AnimatedSection>

        <FilterBar onChange={handleFilterChange} />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {filtered.slice(0, LAYOUT.previewCount).map((workshop, idx) => {
            const category = (workshopsJson as WorkshopData).categories.find(
              (c: WorkshopCategory) => c.id === workshop.type
            );
            return (
              <AnimatedSection key={workshop.id} delay={idx * ANIMATION_DELAYS.medium}>
                <WorkshopCard
                  workshop={workshop}
                  category={category}
                  onDetails={handleWorkshopDetails}
                />
              </AnimatedSection>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-3xl md:text-4xl font-bold text-[#393E41]/70">
              {UI_TEXT.noWorkshopsFound}
            </p>
            {activeFilters.month && (
              <p className="text-base text-[#393E41]/60 mt-2">
                Try changing your filter settings or clearing active filters.{" "}
              </p>
            )}
          </div>
        )}

        {filtered.length > LAYOUT.previewCount && (
          <div className="text-center mt-10">
            <Button
              variant="secondary"
              onClick={() => setAllWorkshopsModalOpen(true)}
              className="cursor-none h-14 px-8"
            >
              {UI_TEXT.viewAllWorkshops}
            </Button>
          </div>
        )}

        <WorkshopDetailsModal
          workshop={selected}
          open={openDetailsModal}
          onOpenChange={setOpenDetailsModal}
        />
        <AllWorkshopsModal open={isAllWorkshopsModalOpen} onOpenChange={setAllWorkshopsModalOpen} />
      </div>
    </section>
  );
}
