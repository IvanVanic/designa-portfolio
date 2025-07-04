/**
 * Footer Component
 * Main footer component for the Designa portfolio website
 */

"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { EXTERNAL_LINKS } from "@/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#393E41] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left side - Branding */}
          <div>
            <h3 className="text-2xl font-bold mb-2">DESIGNA</h3>
            <p className="text-white/70">Game art and design agency.</p>
          </div>

          {/* Right side - Quick Links */}
          <div className="md:text-right">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2 md:items-end">
              <Link
                href="#gallery"
                className="text-white/70 hover:text-white transition-colors cursor-none"
              >
                Gallery
              </Link>
              <Link
                href="#about"
                className="text-white/70 hover:text-white transition-colors cursor-none"
              >
                About
              </Link>
              <Link
                href="#learn-with-us"
                className="text-white/70 hover:text-white transition-colors cursor-none"
              >
                Workshops
              </Link>
              <Link
                href="/workshops"
                className="text-white/70 hover:text-white transition-colors cursor-none"
              >
                All Workshops
              </Link>
              <div className="flex space-x-4 mt-4 md:justify-end">
                <a
                  href={EXTERNAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors cursor-none"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={EXTERNAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors cursor-none"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={EXTERNAL_LINKS.email}
                  className="text-white/60 hover:text-white transition-colors cursor-none"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Center bottom */}
        <div className="pt-8 border-t border-white/20 text-center">
          <p className="text-white/60">© {currentYear} Designa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
