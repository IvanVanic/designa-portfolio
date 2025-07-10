"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    const updateCursorPosition = () => {
      setCursorPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.25,
        y: prev.y + (mousePosition.y - prev.y) * 0.25,
      }));
    };

    const animationFrame = requestAnimationFrame(updateCursorPosition);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, cursorPosition]);

  useEffect(() => {
    const updateTrailPosition = () => {
      setTrailPosition((prev) => ({
        x: prev.x + (cursorPosition.x - prev.x) * 0.15,
        y: prev.y + (cursorPosition.y - prev.y) * 0.15,
      }));
    };

    const animationFrame = requestAnimationFrame(updateTrailPosition);
    return () => cancelAnimationFrame(animationFrame);
  }, [cursorPosition, trailPosition]);

  // Hide cursor on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Subtle trail - follows cursor with delay */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9998] opacity-20"
        style={{
          transform: `translate(${trailPosition.x - 4}px, ${trailPosition.y - 4}px)`,
          opacity:
            Math.abs(cursorPosition.x - trailPosition.x) +
              Math.abs(cursorPosition.y - trailPosition.y) >
            3
              ? 0.3
              : 0,
        }}
      />

      {/* Main cursor - donut circle outline only */}
      <div
        className="fixed top-0 left-0 w-3 h-3 border-2 border-accent rounded-full pointer-events-none z-[9999] bg-transparent"
        style={{
          transform: `translate(${cursorPosition.x - 6}px, ${cursorPosition.y - 6}px)`,
          transition: "transform 0.05s ease-out",
        }}
      />
    </>
  );
}
