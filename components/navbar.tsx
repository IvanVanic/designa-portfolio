/**
 * Navigation Component
 * Clean, properly aligned navbar with smooth animations
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const navigationItems = [
  { id: "home", label: "Home" },
  { id: "works", label: "Works" },
  { id: "about", label: "About" },
  { id: "workshops", label: "Workshops" },
  { id: "mentorship", label: "Mentorship" },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) return;

      const sections = navigationItems.map((item) => item.id);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    setIsMobileMenuOpen(false);
    onNavigate(section);

    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 1000); // Debounce duration, should match scroll animation time
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-6 items-end">
          {/* Navigation Links */}
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={cn(
                    "font-sora transition-all duration-300 ease-out cursor-none",
                    "transform-gpu origin-right",
                    isActive
                      ? "text-accent font-medium scale-110"
                      : "text-white/70 hover:text-white/90 hover:scale-110"
                  )}
                >
                  {item.label}
                </button>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div ref={navRef} className="lg:hidden">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-6 right-6 z-50 bg-gaming-card/90 backdrop-blur-sm border border-accent/30 hover:border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg cursor-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in-0 duration-300" />
        )}

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed top-0 right-0 h-full w-64 bg-gaming-card border-l border-accent/30 z-50 transform transition-all duration-300 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col gap-4 p-6 pt-20">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={cn(
                  "text-left font-sora py-3 px-4 rounded-gaming transition-all duration-300 ease-out cursor-none",
                  "hover:bg-accent/10 hover:text-accent",
                  activeSection === item.id
                    ? "text-accent bg-accent/20 font-medium"
                    : "text-white/70 hover:text-white/90"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
