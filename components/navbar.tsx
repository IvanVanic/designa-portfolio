/**
 * Modern Navigation Component
 * Sleek full-screen design with smooth animations and liquid glass effects
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const navigationItems = [
  { id: "home", label: "Home" },
  { id: "works", label: "Works" },
  { id: "about", label: "Contact" },
  // { id: "workshops", label: "Workshops" },
  // { id: "mentorship", label: "Mentorship" },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sectionIds = navigationItems.map((item) => item.id);
    const sectionElements: Record<string, HTMLElement | null> = {};
    for (const id of sectionIds) sectionElements[id] = document.getElementById(id);

    const handleScroll = () => {
      if (scrollTimeout.current) return;
      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;

        const currentSection = sectionIds.find((section) => {
          const element = sectionElements[section] ?? document.getElementById(section);
          if (element) {
            sectionElements[section] = element;
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (currentSection) {
          setActiveSection(currentSection);
        }

        const homeElement = sectionElements["home"] ?? document.getElementById("home");
        if (homeElement) {
          sectionElements["home"] = homeElement as HTMLElement;
          const homeRect = homeElement.getBoundingClientRect();
          setShowMobileNav(homeRect.bottom < 100);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll as EventListener);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (section: string) => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    setActiveSection(section);
    handleMobileMenuClose();
    onNavigate(section);

    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 1000);
  };

  const handleMobileMenuClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, 400);
  };

  const handleMobileMenuToggle = () => {
    if (!hasBeenOpened && !isMobileMenuOpen) {
      setHasBeenOpened(true);
    }
    if (isMobileMenuOpen) {
      handleMobileMenuClose();
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  return (
    <>
      {/* Mobile navbar gradient background */}
      <div
        className={cn(
          "fixed top-0 inset-x-0 h-28 pointer-events-none z-40 lg:hidden transition-opacity duration-800",
          "bg-gradient-to-b from-black/70 to-transparent",
          showMobileNav ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Mobile aligned top bar - Logo and Nav Button */}
      <div
        className={cn(
          "fixed top-6 inset-x-6 z-50 flex justify-between items-center lg:hidden transition-all duration-800 ease-out",
          showMobileNav
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8 pointer-events-none"
        )}
      >
        {/* Logo */}
        <div className="relative w-32 h-6">
          <Image
            src="/brand/designa-wordmark.svg"
            alt="DESIGNA"
            fill
            className="object-contain object-left"
          />
        </div>

        {/* Enhanced Mobile Navigation Button */}
        <button
          className={cn(
            "mobile-nav-button relative w-12 h-12 transition-all duration-600 ease-out cursor-none",
            "backdrop-blur-xl border-2 rounded-lg shadow-lg hover:shadow-xl",
            "flex items-center justify-center transform-gpu",
            isMobileMenuOpen && !isClosing
              ? "bg-accent/20 border-accent/50 scale-105 shadow-[0_0_20px_rgba(20,184,166,0.4)]"
              : hasBeenOpened
              ? "bg-accent/10 border-accent/30 hover:bg-accent/15 hover:border-accent/40 hover:scale-105 shadow-[0_0_8px_rgba(20,184,166,0.2)]"
              : "bg-yellow-400/10 border-yellow-400/40 hover:bg-yellow-400/15 hover:border-yellow-400/50 hover:scale-105 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
          )}
          onClick={handleMobileMenuToggle}
        >
          {/* Simple geometric decorations */}
          <div
            className={cn(
              "absolute inset-1 transition-all duration-600",
              "border border-transparent rounded-md",
              isMobileMenuOpen && !isClosing
                ? "border-accent/30"
                : hasBeenOpened
                ? "border-accent/20"
                : "border-yellow-400/30"
            )}
          />

          {/* ! Indicator with 180° spin */}
          <span
            className={cn(
              "text-2xl font-bold font-mono transition-all duration-600 relative z-10 transform",
              isMobileMenuOpen && !isClosing
                ? "text-accent rotate-180"
                : hasBeenOpened
                ? "text-accent"
                : "text-yellow-400"
            )}
            style={{
              animation:
                !hasBeenOpened && !isMobileMenuOpen
                  ? "enhanced-flash 3s ease-in-out infinite"
                  : undefined,
              textShadow:
                isMobileMenuOpen && !isClosing
                  ? "0 0 8px rgba(20,184,166,0.5)"
                  : hasBeenOpened
                  ? "0 0 4px rgba(20,184,166,0.3)"
                  : "0 0 6px rgba(251,191,36,0.4)",
            }}
          >
            !
          </span>

          {/* Subtle first-time glow ring */}
          {!hasBeenOpened && !isMobileMenuOpen && (
            <div
              className="absolute inset-0 rounded-lg border border-yellow-400/40"
              style={{
                animation: "subtle-glow 3s ease-in-out infinite",
              }}
            />
          )}
        </button>
      </div>

      {/* Desktop Navigation - Enhanced with Larger Components */}
      <nav className="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-5 items-end">
          {/* Navigation Links */}
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <div key={item.id} className="relative group flex items-center gap-4">
                {/* Animated Arrow Indicator */}
                <div
                  className={cn(
                    "transition-all ease-out transform",
                    isActive
                      ? "duration-500 opacity-100 translate-x-[10px]"
                      : "duration-0 opacity-0 translate-x-[16px]"
                  )}
                >
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 text-accent transition-all duration-300 ease-out",
                      isActive && "animate-pulse"
                    )}
                    style={{
                      animation: isActive ? "fast-sway 0.9s ease-in-out infinite" : undefined,
                    }}
                  />
                </div>

                <button
                  onClick={() => handleNavigation(item.id)}
                  className={cn(
                    "font-sora text-lg transition-all duration-700 ease-out cursor-none",
                    "transform-gpu origin-right relative",
                    isActive
                      ? "text-accent font-medium scale-115"
                      : "text-white/70 hover:text-accent hover:scale-110"
                  )}
                >
                  {item.label}

                  {/* Subtle glow effect for active item */}
                  {isActive && (
                    <div className="absolute inset-0 text-accent opacity-50 blur-sm -z-10">
                      {item.label}
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation - Minimal Full Screen */}
      <div ref={navRef} className="lg:hidden">
        {/* Full Screen Blur and Dim Overlay with Teal Tint */}
        {(isMobileMenuOpen || isClosing) && (
          <div
            className={cn(
              "fixed inset-0 z-40 transition-all duration-500 ease-out",
              isClosing ? "opacity-0" : "opacity-100"
            )}
            style={{
              backdropFilter: "blur(10px)",
              background:
                "linear-gradient(135deg, rgba(3, 64, 74, 0.28), rgba(8, 68, 79, 0.26), rgba(0, 0, 0, 0.45))",
            }}
            onClick={handleMobileMenuClose}
          />
        )}

        {/* Enhanced Full Screen Navigation Menu */}
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center transition-all ease-out",
            isMobileMenuOpen && !isClosing
              ? "opacity-100 pointer-events-auto duration-600"
              : "opacity-0 pointer-events-none duration-500"
          )}
          onClick={(e) => {
            // Only close if clicking on the background, not on nav items
            if (e.target === e.currentTarget) {
              handleMobileMenuClose();
            }
          }}
        >
          {/* Centered Navigation Items */}
          <div className="flex flex-col items-center space-y-8 px-8">
            {navigationItems.map((item, index) => (
              <div key={item.id} className="relative flex items-center justify-center">
                {/* Animated Arrow Indicator - Positioned to the left of text */}
                <div
                  className={cn(
                    "absolute right-full mr-3 transition-all ease-out transform",
                    isMobileMenuOpen && !isClosing && activeSection === item.id
                      ? "duration-500 opacity-100 translate-x-0"
                      : "duration-0 opacity-0 translate-x-4"
                  )}
                  style={{
                    transitionDelay:
                      isMobileMenuOpen && !isClosing ? `${(index + 1) * 120 + 200}ms` : "0ms",
                  }}
                >
                  <ChevronRight
                    className={cn(
                      "w-5 h-5 text-accent transition-all duration-300 ease-out",
                      activeSection === item.id && "animate-pulse"
                    )}
                    style={{
                      animation:
                        activeSection === item.id
                          ? "fast-sway 1.5s ease-in-out infinite"
                          : undefined,
                    }}
                  />
                </div>

                {/* Enhanced Navigation Button */}
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={cn(
                    "mobile-nav-item font-sora text-2xl font-medium transition-all duration-700 ease-out cursor-none relative text-center",
                    "transform translate-y-8 opacity-0",
                    isMobileMenuOpen && !isClosing && "translate-y-0 opacity-100",
                    isClosing && "translate-y-4 opacity-0 duration-300",
                    activeSection === item.id
                      ? "text-accent scale-110"
                      : "text-white/90 hover:text-accent hover:scale-105"
                  )}
                  style={{
                    transitionDelay:
                      isMobileMenuOpen && !isClosing
                        ? `${index * 120}ms`
                        : `${(navigationItems.length - index - 1) * 60}ms`,
                  }}
                >
                  {item.label}

                  {/* Active item glow */}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 text-accent opacity-30 blur-sm -z-10 flex items-center justify-center">
                      {item.label}
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CSS animations for mobile navbar */}
      <style jsx>{`
        @keyframes fast-sway {
          0%,
          100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(-4px);
          }
        }

        @keyframes subtle-flash {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }

        @keyframes enhanced-flash {
          0%,
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
          }
          25% {
            opacity: 0.9;
            transform: scale(1.03) rotate(-1deg);
            text-shadow: 0 0 12px rgba(251, 191, 36, 0.7);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05) rotate(0deg);
            text-shadow: 0 0 15px rgba(251, 191, 36, 0.8);
          }
          75% {
            opacity: 0.9;
            transform: scale(1.03) rotate(1deg);
            text-shadow: 0 0 12px rgba(251, 191, 36, 0.7);
          }
        }

        @keyframes subtle-glow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.01);
          }
        }
      `}</style>
    </>
  );
}
