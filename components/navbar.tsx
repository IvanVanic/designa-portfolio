/**
 * Navbar Component
 * Provides navigation functionality across the application
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { COLORS, UI_TEXT } from "@/constants";

interface NavbarProps {
  /** Whether this is the workshops page */
  isWorkshopsPage?: boolean;
  /** Callback for navigation events */
  onNavigate?: (section: string) => void;
}

/**
 * Navbar Component Implementation
 * Manages navigation state and provides smooth scrolling functionality
 */
export function Navbar({ isWorkshopsPage = false, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      if (onNavigate) {
        onNavigate(id);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    },
    [onNavigate]
  );

  const NavLinks = ({ mobile = false, onClose = () => {} }) => (
    <>
      {!isWorkshopsPage && (
        <>
          <button
            onClick={() => {
              scrollToSection("hero");
              onClose();
            }}
            className={`text-sm font-medium hover:text-[#44BBA4] transition-all duration-300 ${
              isScrolled ? "text-[#393E41]" : "text-[#E7E5DF]"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              scrollToSection("works");
              onClose();
            }}
            className={`text-sm font-medium hover:text-[#44BBA4] transition-all duration-300 ${
              isScrolled ? "text-[#393E41]" : "text-[#E7E5DF]"
            }`}
          >
            Works
          </button>
          <button
            onClick={() => {
              scrollToSection("about");
              onClose();
            }}
            className={`text-sm font-medium hover:text-[#44BBA4] transition-all duration-300 ${
              isScrolled ? "text-[#393E41]" : "text-[#E7E5DF]"
            }`}
          >
            About
          </button>
          <button
            onClick={() => {
              scrollToSection("contact");
              onClose();
            }}
            className={`text-sm font-medium hover:text-[#44BBA4] transition-all duration-300 ${
              isScrolled ? "text-[#393E41]" : "text-[#E7E5DF]"
            }`}
          >
            Contact
          </button>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-500 ease-out ${
        isScrolled || isWorkshopsPage
          ? "bg-[#E7E5DF]/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or Back Button */}
          {isWorkshopsPage ? (
            <Link
              href="/"
              className="flex items-center space-x-2 text-[#393E41] hover:text-[#44BBA4] transition-colors duration-300 cursor-none"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg font-semibold">{UI_TEXT.backToMain}</span>
            </Link>
          ) : (
            <div
              className={`text-2xl font-bold tracking-[0.2em] transition-all duration-500 ${
                isScrolled ? "text-[#393E41]" : "text-[#E7E5DF]"
              }`}
            >
              DESIGNA
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden cursor-none">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#E7E5DF]">
              <div className="flex flex-col space-y-6 mt-8">
                <NavLinks mobile onClose={() => {}} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
