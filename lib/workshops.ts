/**
 * Workshop utilities and filtering functions
 * Provides functions for fetching and filtering workshop data
 */

import workshopsData from "@/data/workshops.json";
import { getYear } from "date-fns";
import { Workshop, WorkshopFilters } from "@/types";

export type { Workshop, WorkshopFilters };

/**
 * Get all workshops from the data source
 * @returns Array of all workshop objects
 */
function getAllWorkshops(): Workshop[] {
  return workshopsData.workshops as Workshop[];
}

/**
 * Get upcoming workshops that haven't started yet
 * @param limit - Maximum number of workshops to return
 * @returns Array of upcoming workshops sorted by start date
 */
export function getUpcomingWorkshops(limit = 3): Workshop[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    return getAllWorkshops()
      .filter((workshop) => {
        const startStr = workshop.dateRange.split(" to ")[0];
        const start = new Date(`${startStr}T00:00:00`);
        return start > today;
      })
      .sort((a, b) => {
        const aStartStr = a.dateRange.split(" to ")[0];
        const bStartStr = b.dateRange.split(" to ")[0];
        const aStart = new Date(`${aStartStr}T00:00:00`);
        const bStart = new Date(`${bStartStr}T00:00:00`);
        return aStart.getTime() - bStart.getTime();
      })
      .slice(0, limit);
  } catch (error) {
    console.error("Error getting upcoming workshops:", error);
    return [];
  }
}

/**
 * Get featured workshops for the main page
 * @returns Array of featured workshop objects
 */
export function getFeaturedWorkshops(): Workshop[] {
  return getUpcomingWorkshops(999);
}

/**
 * Filter workshops based on provided criteria
 * @param filters - Object containing filter criteria
 * @returns Array of filtered workshops
 */
export function filterWorkshops({ level, skills, month, year }: WorkshopFilters): Workshop[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    let result = getAllWorkshops().filter((workshop) => {
      const startStr = workshop.dateRange.split(" to ")[0];
      const start = new Date(`${startStr}T00:00:00`);
      return start > today;
    });

    // Apply level filter
    if (level) {
      result = result.filter((workshop) => workshop.level === level);
    }

    // Apply skills filter (match if workshop has any of the specified skills)
    if (skills && skills.length) {
      result = result.filter((workshop) => skills.some((skill) => workshop.skills.includes(skill)));
    }

    // Apply date filters
    if (!month && !year) {
      return result; // No date filters applied
    }

    const targetYear = year || getYear(new Date());

    return result.filter((workshop) => {
      const [startStr, endStr] = workshop.dateRange.split(" to ");
      const start = new Date(`${startStr}T00:00:00`);
      const end = endStr ? new Date(`${endStr}T23:59:59`) : new Date(`${startStr}T23:59:59`);

      // Filter by year if provided
      if (year && start.getFullYear() > year && end.getFullYear() < year) {
        return false;
      }

      // Filter by month if provided
      if (month) {
        const monthStart = new Date(targetYear, month - 1, 1);
        const monthEnd = new Date(targetYear, month, 0, 23, 59, 59);
        // Check for overlap between workshop dates and target month
        return start <= monthEnd && end >= monthStart;
      }

      return true;
    });
  } catch (error) {
    console.error("Error filtering workshops:", error);
    return [];
  }
}
