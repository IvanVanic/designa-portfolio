"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
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

  // Hide cursor on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
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
