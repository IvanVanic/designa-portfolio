/**
 * Particles Component
 * Renders animated particles for background effects.
 */

"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  count?: number;
  className?: string;
  variant?: "flowing" | "stationary";
}

export function Particles({ count = 50, className, variant = "flowing" }: ParticlesProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (typeof window === "undefined") return [];
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 2 + 1; // 1px to 3px
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 20 + 20; // 20s to 40s
      const animationDelay = Math.random() * -40; // -40s to 0s

      return {
        id: `particle-${i}`,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDelay}s`,
        },
      };
    });
  }, [count]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn("absolute inset-0 pointer-events-none -z-10", className)}>
      {particles.map((p) => (
        <div
          key={p.id}
          className={cn(
            "absolute bg-accent/20 rounded-full",
            variant === "flowing" ? "animate-flow-up" : "animate-float"
          )}
          style={p.style}
        />
      ))}
    </div>
  );
}
