/**
 * Filter Bar Component
 * Provides filtering functionality for workshops by category.
 */

"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { WorkshopFilters } from "@/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  onChange: (filters: WorkshopFilters) => void;
}

const categories = [
  { id: "all", label: "All" },
  { id: "concept-art", label: "Characters" },
  { id: "environment-art", label: "Environment" },
];

export function FilterBar({ onChange }: FilterBarProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (value: string) => {
    if (value) {
      setSelectedCategory(value);
      onChange({ category: value === "all" ? undefined : value });
    }
  };

  return (
    <div className="flex justify-center">
      <ToggleGroup
        type="single"
        value={selectedCategory}
        onValueChange={handleCategoryChange}
        defaultValue="all"
        className="flex flex-wrap justify-center gap-2"
      >
        {categories.map((category) => (
          <ToggleGroupItem
            key={category.id}
            value={category.id}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
              "text-foreground/70 bg-transparent hover:text-foreground hover:bg-accent/10",
              "data-[state=on]:bg-accent/10 data-[state=on]:text-accent"
            )}
            aria-label={`Filter by ${category.label}`}
          >
            {category.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
