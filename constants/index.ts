/**
 * Application constants
 * Centralizes all magic numbers, colors, and configuration values
 */

// Colors
export const COLORS = {
  primary: "#393E41",
  accent: "#44BBA4",
  background: "#E7E5DF",
  backgroundSecondary: "#D3D0CB",
  white: "#FFFFFF",
  black: "#000000",
} as const;

// Animation constants
export const ANIMATION_DELAYS = {
  short: 100,
  medium: 150,
  long: 200,
  extraLong: 300,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 300,
  medium: 500,
  slow: 700,
  extraSlow: 1000,
} as const;

// Layout constants
export const LAYOUT = {
  previewCount: 6,
  mobileBreakpoint: 768,
  maxWidth: "7xl",
  sectionPadding: "py-20 px-4 sm:px-6 lg:px-8",
} as const;

// Timing constants
export const TIMING = {
  pageLoadDelay: 1800,
  galleryLoadDelay: 2200,
  formSubmitDelay: 1800,
  successMessageDelay: 3000,
  // How long the contact success state should persist (5 minutes)
  contactSuccessTtl: 5 * 60 * 1000,
  toastRemoveDelay: 1000000,
} as const;

// Z-index constants
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  popover: 30,
  modal: 40,
  tooltip: 50,
  customCursor: 9998,
  customCursorDot: 9999,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Form validation
export const VALIDATION = {
  minNameLength: 2,
  minMessageLength: 10,
  maxMessageLength: 1000,
} as const;

// UI Text
export const UI_TEXT = {
  loadingText: "Loading...",
  loadingWorkshops: "Loading workshops...",
  noWorkshopsFound: "No workshops found...",
  viewAllWorkshops: "View All Workshops",
  viewAllWorks: "View All Works",
  sendMessage: "Send Message",
  sending: "Sending...",
  applyFilters: "Apply Filters",
  clearFilters: "Clear Filters",
  registerNow: "Register Now",
  backToMain: "Back to Main",
} as const;

// Months for filters
export const MONTHS = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" },
] as const;

// Workshop levels
export const WORKSHOP_LEVELS = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
  all: "all",
} as const;

// EmailJS Configuration
// In production, all values must be provided via environment variables
// Fallbacks are only for development
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
} as const;

// External links
export const EXTERNAL_LINKS = {
  registration: "https://docs.google.com/forms/d/e/1FAIpQLSfDpcdummy",
  instagram: "https://www.instagram.com/shrimply_ghostie",
  tiktok: "https://www.tiktok.com/@shrimplyghostie",
  artstation: "https://www.artstation.com/pingini",
  email: "mailto:contact@designa.art",
} as const;

// Image dimensions
export const IMAGE_SIZES = {
  galleryCard: {
    width: 400,
    height: 256,
  },
  hero: {
    width: 1920,
    height: 1080,
  },
} as const;

// Intersection Observer defaults
export const INTERSECTION_OBSERVER = {
  threshold: 0.1,
  rootMargin: "0px",
  triggerOnce: true,
} as const;
