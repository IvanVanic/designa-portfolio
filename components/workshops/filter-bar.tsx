/**
 * Filter Bar Component
 * Provides filtering functionality for workshops with proper TypeScript types
 */

"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { WorkshopFilters } from "@/types";
import { getYear } from "date-fns";
import { MONTHS, WORKSHOP_LEVELS, UI_TEXT } from "@/constants";

const currentYear = getYear(new Date());
const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

interface FilterBarProps {
  /** Callback function called when filters change */
  onChange: (filters: WorkshopFilters) => void;
}

type FilterLevel = "beginner" | "intermediate" | "advanced" | "all";

/**
 * Filter Bar Component for workshop filtering
 * Provides level, month, and year filtering with proper state management
 */
export function FilterBar({ onChange }: FilterBarProps) {
  const [level, setLevel] = useState<FilterLevel>("all");
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [mainPopoverOpen, setMainPopoverOpen] = useState(false);

  const applyFilters = useCallback(() => {
    onChange({
      level: level === "all" ? undefined : level,
      month: selectedMonth !== undefined ? selectedMonth + 1 : undefined,
      year: selectedYear,
    });
    setMainPopoverOpen(false);
  }, [level, selectedMonth, selectedYear, onChange]);

  const handleClear = useCallback(() => {
    setLevel("all");
    setSelectedMonth(undefined);
    setSelectedYear(undefined);
    onChange({
      level: undefined,
      month: undefined,
      year: undefined,
    });
  }, [onChange]);

  const handleMonthChange = useCallback((value: string) => {
    setSelectedMonth(value === "any" ? undefined : parseInt(value, 10));
  }, []);

  const handleYearChange = useCallback((value: string) => {
    setSelectedYear(value === "any" ? undefined : parseInt(value, 10));
  }, []);

  const getDisplayText = useMemo(() => {
    const levelText =
      level === "all" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1);
    const monthText = selectedMonth !== undefined ? MONTHS[selectedMonth].label : "Any Month";
    const yearText = selectedYear !== undefined ? selectedYear.toString() : currentYear.toString();

    if (selectedMonth === undefined && selectedYear === undefined && level === "all") {
      return "All Workshops";
    }

    return `${levelText} • ${monthText}, ${yearText}`;
  }, [level, selectedMonth, selectedYear]);

  return (
    <div className="relative z-10 flex flex-wrap items-center gap-4 mb-6">
      <Popover open={mainPopoverOpen} onOpenChange={setMainPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">Filters</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 sm:w-96">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2 px-6 pt-4">
              <Select value={selectedMonth?.toString() || "any"} onValueChange={handleMonthChange}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {selectedMonth !== undefined ? MONTHS[selectedMonth].label : "Month"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {MONTHS.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear?.toString() || "any"} onValueChange={handleYearChange}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {selectedYear !== undefined ? selectedYear.toString() : "Year"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-b border-border -mx-6" />

            <div className="space-y-4 px-6">
              {/* <h4 className="font-medium leading-none text-center pt-2 pb-1">Select Experience Level</h4> */}
              <ToggleGroup
                type="single"
                value={level}
                onValueChange={(value) => value && setLevel(value as any)}
                defaultValue="all"
                className="grid grid-cols-2 gap-2"
              >
                <ToggleGroupItem value="all" className="text-sm">
                  All
                </ToggleGroupItem>
                <ToggleGroupItem value="beginner" className="text-sm">
                  Beginner
                </ToggleGroupItem>
                <ToggleGroupItem value="intermediate" className="text-sm">
                  Intermediate
                </ToggleGroupItem>
                <ToggleGroupItem value="advanced" className="text-sm">
                  Advanced
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="border-b border-border -mx-6" />

            <div className="px-6 pb-4">
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className="text-sm text-muted-foreground">
        <span>{getDisplayText}</span>
      </div>
      <Button variant="ghost" onClick={handleClear} className="text-sm font-normal">
        Clear Filters
      </Button>
    </div>
  );
}
