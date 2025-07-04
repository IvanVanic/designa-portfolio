/**
 * Main Portfolio Client Component
 * The primary component for the Designa portfolio website
 */

"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { Instagram, Linkedin, Mail } from "lucide-react";

import { PageLoader } from "@/components/skeleton-loaders";
import { ArtworkModal } from "@/components/artwork-modal";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { HeroSection } from "@/components/home/hero-section";
import { GallerySection } from "@/components/home/gallery-section";
import { MentorshipSection } from "@/components/home/mentorship-section";
import { WorkshopsPreviewSection } from "@/components/home/workshops-preview-section";
import { useArtworks } from "@/hooks/use-artworks";
import { Artwork } from "@/types";
import { TIMING, EXTERNAL_LINKS } from "@/constants";
import { AboutSection } from "./about-section";

/**
 * Main Portfolio Client Component
 * Manages the overall state and layout of the portfolio website
 */
export default function DesignaPortfolioClient() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the artwork hook instead of hardcoded array
  const artworks = useArtworks();

  useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), TIMING.pageLoadDelay);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsGalleryLoading(false), TIMING.galleryLoadDelay);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Smooth scroll to section
   */
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /**
   * Open artwork modal
   */
  const openModal = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  }, []);

  /**
   * Close artwork modal
   */
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#E7E5DF] cursor-none font-inter">
      <CustomCursor />
      {isPageLoading && <PageLoader />}
      <div
        className={`transition-opacity duration-700 ease-out ${
          isPageLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar onNavigate={scrollToSection} />
        <HeroSection onNavigate={scrollToSection} />
        <GallerySection artworks={artworks} isLoading={isGalleryLoading} onSelect={openModal} />

        <AboutSection />
        <WorkshopsPreviewSection />

        <MentorshipSection />

        <footer className="bg-[#393E41] text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4">DESIGNA</h3>
              <p className="text-white/60">Creative portfolio for modern artists.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    onClick={() => scrollToSection("home")}
                    className="text-white/60 hover:text-white transition-colors cursor-none"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => scrollToSection("gallery")}
                    className="text-white/60 hover:text-white transition-colors cursor-none"
                  >
                    Works
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => scrollToSection("about")}
                    className="text-white/60 hover:text-white transition-colors cursor-none"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => scrollToSection("learn-with-us")}
                    className="text-white/60 hover:text-white transition-colors cursor-none"
                  >
                    Workshops
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href={EXTERNAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors cursor-none"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={EXTERNAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors cursor-none"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={EXTERNAL_LINKS.email}
                  className="text-white/60 hover:text-white transition-colors cursor-none"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} Designa. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
      {selectedArtwork && (
        <ArtworkModal artwork={selectedArtwork} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
}
