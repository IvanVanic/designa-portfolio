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
    <footer className="border-t border-border/20 text-foreground py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-[#030b0d]">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="flex flex-col items-center md:items-start">
            <div className="hidden sm:block">
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

          {/* Center - Copyright */}
          <div className="text-center order-last md:order-none">
            <p className="text-muted-foreground text-sm">© {currentYear} Designa. All Rights Reserved.</p>
          </div>

          {/* Right side - Social Links */}
          <div className="flex justify-center md:justify-end">
            <div className="flex space-x-6">
              <a
                href={EXTERNAL_LINKS.artstation}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center text-white hover:text-white transition-all duration-300 cursor-none hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                title="ArtStation - @pingini"
                aria-label="ArtStation"
              >
                <SiArtstation className="w-6 h-6" />
              </a>
              <a
                href={EXTERNAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center text-white hover:text-white transition-all duration-300 cursor-none hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                title="Instagram - @shrimply_ghostie"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href={EXTERNAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center text-white hover:text-white transition-all duration-300 cursor-none hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                title="TikTok - @shrimplyghostie"
                aria-label="TikTok"
              >
                <SiTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
