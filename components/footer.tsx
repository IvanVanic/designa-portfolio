/**
 * Footer Component
 * Main footer component for the Designa portfolio website
 */

"use client";

import { Instagram } from "lucide-react";
import { EXTERNAL_LINKS } from "@/constants";
import Image from "next/image";
import { SiTiktok, SiArtstation } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/20 text-foreground py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left side - Branding */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 hidden sm:block">
              <div className="relative w-48 h-8">
                <Image
                  src="/brand/designa-wordmark.svg"
                  alt="DESIGNA"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                />
              </div>
            </div>
          </div>

          {/* Right side - Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-8 mt-4 md:justify-end">
              <a
                href={EXTERNAL_LINKS.artstation}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 rounded-gaming flex items-center justify-center text-accent hover:text-accent transition-all duration-300 cursor-none gaming-hover shadow-glow-sm hover:shadow-glow-md"
                title="ArtStation - @pingini"
                aria-label="ArtStation"
              >
                <SiArtstation className="w-6 h-6" />
              </a>
              <a
                href={EXTERNAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 rounded-gaming flex items-center justify-center text-accent hover:text-accent transition-all duration-300 cursor-none gaming-hover shadow-glow-sm hover:shadow-glow-md"
                title="Instagram - @shrimply_ghostie"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href={EXTERNAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 rounded-gaming flex items-center justify-center text-accent hover:text-accent transition-all duration-300 cursor-none gaming-hover shadow-glow-sm hover:shadow-glow-md"
                title="TikTok - @shrimplyghostie"
                aria-label="TikTok"
              >
                <SiTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright - Center bottom */}
        <div className="pt-8 border-t border-border/20 text-center">
          <p className="text-muted-foreground">© {currentYear} Designa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
