/**
 * Hero Section Component
 * Displays the main hero section with headline, description, and call-to-action
 */

"use client";

import { AnimatedSection } from "@/components/animated-section";
import Image from "next/image";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10 pb-24 md:pb-28 flex flex-col justify-center min-h-screen">
        <AnimatedSection>
          <p className="text-base md:text-xl lg:text-2xl text-accent mb-1.5 lg:mb-2.5 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-top-4 duration-1000 ease-out animation-delay-300">
            We turn your ideas into pixels.
          </p>

          <div className="animate-in slide-in-from-top-8 duration-1000 ease-out flex justify-center">
            <div className="relative w-64 sm:w-80 md:w-[40rem] lg:w-[44rem] h-16 sm:h-20 md:h-36 lg:h-40">
              <Image
                src="/brand/designa-wordmark.svg"
                alt="DESIGNA"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
      {/* Bottom-anchored scroll indicator wrapper */}
      <div className="absolute inset-x-0 bottom-10 md:bottom-14 lg:bottom-20 flex justify-center z-20">
        <div>
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate("works");
                return;
              }
              const el = document.getElementById("works");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="relative mx-auto block select-none cursor-pointer"
          >
            <span className="absolute -inset-6" aria-hidden="true" />
            <div className="flex flex-col items-center gap-2 md:gap-3">
              <p className="text-accent text-lg md:text-xl tracking-wide">Scroll for more</p>
              <div className="flex flex-col items-center">
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-accent w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10"
                  style={{
                    animation: "arrowFloat 3s ease-in-out infinite",
                    filter: "none",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.14645 6.85355C7.34171 7.04882 7.65829 7.04882 7.85355 6.85355L11.8536 2.85355C12.0488 2.65829 12.0488 2.34171 11.8536 2.14645C11.6583 1.95118 11.3417 1.95118 11.1464 2.14645L7.5 5.79289L3.85355 2.14645ZM3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L7.5 11.7929L3.85355 8.14645Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes arrowFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(12px);
          }
        }
      `}</style>
    </section>
  );
}
