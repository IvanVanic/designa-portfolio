/**
 * Custom hook for managing artwork data
 * Consolidates artwork data access and eliminates duplication
 */

import { useMemo } from "react";
import artworksData from "@/data/artworks.json";
import { Artwork } from "@/types";

const getTypeName = (t: Artwork["type"]): string => (typeof t === "string" ? t : t?.name ?? "");

/**
 * Hook to access artwork data with proper typing
 * @returns Array of artwork objects with type safety
 */
export const useArtworks = (): Artwork[] => {
  return useMemo(() => artworksData as Artwork[], []);
};

/**
 * Hook to get a specific artwork by ID
 * @param id - The artwork ID to search for
 * @returns The artwork object or null if not found
 */
export const useArtwork = (id: number): Artwork | null => {
  const artworks = useArtworks();

  return useMemo(() => {
    return artworks.find((artwork) => artwork.id === id) || null;
  }, [artworks, id]);
};

/**
 * Hook to get artworks filtered by type
 * @param type - The artwork type to filter by
 * @returns Array of filtered artwork objects
 */
export const useArtworksByType = (type: string): Artwork[] => {
  const artworks = useArtworks();

  return useMemo(() => {
    return artworks.filter((artwork) => getTypeName(artwork.type) === type);
  }, [artworks, type]);
};

/**
 * Hook to get artworks filtered by tag
 * @param tag - The tag to filter by
 * @returns Array of filtered artwork objects
 */
export const useArtworksByTag = (tag: string): Artwork[] => {
  const artworks = useArtworks();

  return useMemo(() => {
    return artworks.filter((artwork) => artwork.tags.includes(tag));
  }, [artworks, tag]);
};

/**
 * Hook to get featured artworks (for gallery preview)
 * @param limit - Maximum number of artworks to return
 * @returns Array of featured artwork objects
 */
export const useFeaturedArtworks = (limit: number = 6): Artwork[] => {
  const artworks = useArtworks();

  return useMemo(() => {
    return artworks.slice(0, limit);
  }, [artworks, limit]);
};

/**
 * Hook to get all unique artwork types
 * @returns Array of unique artwork types
 */
export const useArtworkTypes = (): string[] => {
  const artworks = useArtworks();

  return useMemo(() => {
    const types = artworks.map((artwork) => getTypeName(artwork.type));
    return [...new Set(types)];
  }, [artworks]);
};

/**
 * Hook to get all unique artwork tags
 * @returns Array of unique tags
 */
export const useArtworkTags = (): string[] => {
  const artworks = useArtworks();

  return useMemo(() => {
    const allTags = artworks.flatMap((artwork) => artwork.tags);
    return [...new Set(allTags)];
  }, [artworks]);
};
