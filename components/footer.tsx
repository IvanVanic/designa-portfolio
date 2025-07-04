/**
 * Footer Component
 * Main footer component for the Designa portfolio website
 */

"use client";

import { Instagram, Linkedin, Mail } from "lucide-react";
import { EXTERNAL_LINKS } from "@/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gaming-dark border-t border-border/20 text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left side - Branding */}
          <div>
            <h3 className="text-3xl font-bold font-sora mb-4 text-shadow-lg">DESIGNA</h3>
            <p className="text-muted-foreground text-lg">Game art and design agency.</p>
          </div>

          {/* Right side - Social Links */}
          <div className="flex flex-col md:items-end">
            <div className="flex space-x-6 mt-4 md:justify-end">
              <a
                href={EXTERNAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 rounded-gaming flex items-center justify-center text-accent hover:text-accent transition-all duration-300 cursor-none gaming-hover shadow-glow-sm hover:shadow-glow-md"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={EXTERNAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 rounded-gaming flex items-center justify-center text-accent hover:text-accent transition-all duration-300 cursor-none gaming-hover shadow-glow-sm hover:shadow-glow-md"
              >
                <Instagram size={24} />
              </a>
              <a
                href={EXTERNAL_LINKS.email}
                className="w-12 h-12 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 rounded-gaming flex items-center justify-center text-accent hover:text-accent transition-all duration-300 cursor-none gaming-hover shadow-glow-sm hover:shadow-glow-md"
              >
                <Mail size={24} />
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
