/**
 * Main Portfolio Client Component
 * The primary component for the Designa portfolio website
 */

"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";

import { PageLoader } from "@/components/skeleton-loaders";
import { ArtworkModal } from "@/components/artwork-modal";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { HeroSection } from "@/components/home/hero-section";
import { GallerySection } from "@/components/home/gallery-section";
import { MentorshipSection } from "@/components/home/mentorship-section";
import { WorkshopsPreviewSection } from "@/components/home/workshops-preview-section";
import { useArtworks } from "@/hooks/use-artworks";
import { Artwork } from "@/types";
import { TIMING } from "@/constants";
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

  const handleNavigate = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
  }, []);

  return (
    <div className="min-h-screen bg-background cursor-none font-sora">
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
{/* 
        <MentorshipSection /> */}

        <Footer />
      </div>
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          isOpen={isModalOpen}
          onClose={closeModal}
          allArtworks={artworks}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
