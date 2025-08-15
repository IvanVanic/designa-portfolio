/**
 * Workshop utilities and filtering functions
 * Provides functions for fetching and filtering workshop data
 */

import workshopsData from "@/data/workshops.json";
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
export function filterWorkshops({ category }: WorkshopFilters): Workshop[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    let result = getAllWorkshops().filter((workshop) => {
      const startStr = workshop.dateRange.split(" to ")[0];
      const start = new Date(`${startStr}T00:00:00`);
      return start > today;
    });

    // Apply category filter
    if (category) {
      result = result.filter((workshop) => workshop.type === category);
    }

    return result;
  } catch (error) {
    console.error("Error filtering workshops:", error);
    return [];
  }
}
