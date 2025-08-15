import type React from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { INTERSECTION_OBSERVER } from "@/constants";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight";
  delay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: INTERSECTION_OBSERVER.threshold,
    rootMargin: INTERSECTION_OBSERVER.rootMargin,
    triggerOnce: INTERSECTION_OBSERVER.triggerOnce,
  });

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-1000 ease-out";

    switch (animation) {
      case "fadeUp":
        return `${baseClasses} ${
          isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`;
      case "fadeIn":
        return `${baseClasses} ${isIntersecting ? "opacity-100" : "opacity-0"}`;
      case "slideLeft":
        return `${baseClasses} ${
          isIntersecting ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`;
      case "slideRight":
        return `${baseClasses} ${
          isIntersecting ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`;
      default:
        return baseClasses;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
