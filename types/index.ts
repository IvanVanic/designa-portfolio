/**
 * Comprehensive type definitions for the Designa Portfolio application
 * This file centralizes all type definitions to ensure type safety across the application
 */

// Workshop Types
export interface WorkshopCategory {
  id: string;
  label: string;
  color: string;
  colorTo?: string;
}

export interface Workshop {
  id: number;
  title: string;
  slug: string;
  dateRange: string;
  type: string;
  level: "beginner" | "intermediate" | "advanced";
  skills: string[];
  price: string;
  seats: number;
  description: string;
  image: string;
}

export interface WorkshopData {
  categories: WorkshopCategory[];
  workshops: Workshop[];
}

export interface WorkshopFilters {
  category?: string;
}

// Artwork Types
export interface Artwork {
  id: number;
  title: string;
  type: string | { name: string; id?: number };
  image: string;
  description: string;
  tags: string[];
  date?: string;
  software?: string[];
  style?: string;
  client?: string;
  length?: string;
  scope?: string;
  artstationLink?: string;
  subImages?: string[]; // array of sub-image paths (sketches, wip, etc.)
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";

// UI Component Types
export interface AnimationProps {
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight";
  delay?: number;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Navigation Types
export interface NavigationProps {
  isWorkshopsPage?: boolean;
  onNavigate?: (sectionId: string) => void;
}

// Date Range Types
export interface DateRange {
  from?: Date;
  to?: Date;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: AppError;
}

// Component Prop Types
export interface WorkshopCardProps {
  workshop: Workshop;
  category?: WorkshopCategory;
  onDetails?: (workshop: Workshop) => void;
}

export interface FilterBarProps {
  onChange: (filters: WorkshopFilters) => void;
}

export interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

// Hook Types
export interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLDivElement>;
  isIntersecting: boolean;
}
