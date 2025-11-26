"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  // Hide cursor on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-3 h-3 border-2 border-accent rounded-full pointer-events-none z-[9999] bg-transparent"
      style={{
        transform: `translate(${mousePosition.x - 6}px, ${mousePosition.y - 6}px)`,
      }}
    />
  );
}
