/**
 * Main Portfolio Client Component
 * The primary component for the Designa portfolio website
 */

"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";

import { PageLoader } from "@/components/skeleton-loaders";
import { ArtworkModal } from "@/components/artwork-modal";
import { AllArtworksModal } from "./all-artworks-modal";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { HeroSection } from "@/components/home/hero-section";
import { GallerySection } from "@/components/home/gallery-section";
// import { MentorshipSection } from "@/components/home/mentorship-section";
// import { WorkshopsPreviewSection } from "@/components/home/workshops-preview-section";
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
  const [isAllArtworksModalOpen, setIsAllArtworksModalOpen] = useState(false);
  const [returnToAllWorks, setReturnToAllWorks] = useState(false);

  // Use the artwork hook instead of hardcoded array
  const artworks = useArtworks();

  useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), TIMING.pageLoadDelay);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsGalleryLoading(false),
      Math.max(600, TIMING.galleryLoadDelay - 600)
    );
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
    setSelectedArtwork(null);
    setIsModalOpen(false);
    if (returnToAllWorks) {
      setIsAllArtworksModalOpen(true);
      setReturnToAllWorks(false);
    }
  }, [returnToAllWorks]);

  /**
   * Open all artworks modal
   */
  const openAllArtworksModal = useCallback(() => {
    setIsAllArtworksModalOpen(true);
  }, []);

  /**
   * Close all artworks modal
   */
  const closeAllArtworksModal = useCallback(() => {
    setIsAllArtworksModalOpen(false);
  }, []);

  /**
   * Handle artwork selection from all artworks modal
   */
  const handleArtworkFromModal = useCallback((artwork: Artwork) => {
    setReturnToAllWorks(true);
    setIsAllArtworksModalOpen(false);
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  }, []);

  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedArtwork) return;

      const currentIndex = artworks.findIndex((art) => art.id === selectedArtwork.id);
      let newIndex;

      if (direction === "prev") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : artworks.length - 1;
      } else {
        newIndex = currentIndex < artworks.length - 1 ? currentIndex + 1 : 0;
      }

      setSelectedArtwork(artworks[newIndex]);
    },
    [selectedArtwork, artworks]
  );

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
        <GallerySection
          artworks={artworks}
          isLoading={isGalleryLoading}
          onSelect={openModal}
          onViewAll={openAllArtworksModal}
        />

        <AboutSection />
        {/* <WorkshopsPreviewSection /> */}
        {/* <MentorshipSection /> */}

        <Footer />
      </div>
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          isOpen={isModalOpen}
          onClose={closeModal}
          allArtworks={artworks}
          currentIndex={artworks.findIndex((art) => art.id === selectedArtwork.id)}
          onNavigate={handleNavigate}
        />
      )}

      <AllArtworksModal
        artworks={artworks}
        isOpen={isAllArtworksModalOpen}
        onClose={closeAllArtworksModal}
        onSelectArtwork={handleArtworkFromModal}
      />
    </div>
  );
}
