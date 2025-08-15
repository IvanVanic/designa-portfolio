import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className="overflow-hidden border-2 border-accent/10 shadow-lg bg-gaming-card animate-pulse"
        >
          <CardContent className="p-0">
            <div className="relative">
              <div className="w-full h-72 bg-gradient-to-r from-gaming-dark via-accent/10 to-gaming-dark animate-pulse bg-[length:200%_100%] animate-shimmer" />
            </div>
            <div className="p-6">
              <div className="w-20 h-5 bg-gradient-to-r from-gaming-dark via-accent/20 to-gaming-dark rounded animate-pulse bg-[length:200%_100%] animate-shimmer mb-2" />
              <div className="w-32 h-6 bg-gradient-to-r from-gaming-dark via-accent/20 to-gaming-dark rounded animate-pulse bg-[length:200%_100%] animate-shimmer" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface Particle {
  id: number;
  left: string;
  size: string;
  delay: string;
  speedClass: string;
}

export function PageLoader() {
  const [loadingText, setLoadingText] = useState("INITIALIZING");
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 24 }).map((_, i) => {
      const size = 10 + (i % 3) * 4;
      const left = Math.random() * 100;
      const delay = Math.random() * -35;
      const speedClass =
        i % 3 === 0
          ? "animate-flow-up-slow"
          : i % 3 === 1
          ? "animate-flow-up-medium"
          : "animate-flow-up-fast";
      return {
        id: i,
        left: `${left}%`,
        size: `${size}px`,
        delay: `${delay}s`,
        speedClass,
      };
    });
    setParticles(generatedParticles);

    const textStages = ["INITIALIZING", "LOADING ASSETS", "PREPARING EXPERIENCE", "ALMOST READY"];

    let currentStage = 0;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5;

        // Update text based on progress
        if (newProgress > 25 && currentStage === 0) {
          currentStage = 1;
          setLoadingText(textStages[1]);
        } else if (newProgress > 50 && currentStage === 1) {
          currentStage = 2;
          setLoadingText(textStages[2]);
        } else if (newProgress > 75 && currentStage === 2) {
          currentStage = 3;
          setLoadingText(textStages[3]);
        }

        return Math.min(newProgress, 95);
      });
    }, 200);

    // Animated dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    // Mouse movement for parallax
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gaming-dark via-background to-gaming-dark z-50 flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => {
          const left = Math.round((i + 1) * (100 / 11));
          const delay = (i % 5) * -6; // staggered start
          const speedClass =
            i % 3 === 0
              ? "animate-flow-up-slow"
              : i % 3 === 1
              ? "animate-flow-up-medium"
              : "animate-flow-up-fast";
          return (
            <div
              key={`line-${i}`}
              className={`${speedClass} absolute bottom-[-20vh] w-px h-[140vh] bg-gradient-to-t from-transparent via-accent/25 to-accent/40`}
              style={{ left: `${left}%`, animationDelay: `${delay}s` }}
            />
          );
        })}

        {particles.map((p) => (
          <div
            key={`particle-${p.id}`}
            className={`${p.speedClass} absolute bottom-[-10vh] opacity-70 bg-cyan-300/70 rounded-full`}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div
        className="text-center relative z-10 max-w-md w-full px-8"
        style={{
          transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
        }}
      >
        {/* Brand wordmark (white) */}
        <div className="mb-8 relative flex flex-col items-center">
          <div className="relative w-72 md:w-96 h-12 md:h-14 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">
            <Image
              src="/brand/designa-wordmark.svg"
              alt="DESIGNA"
              fill
              sizes="200px"
              className="object-contain"
              priority
            />
          </div>
          <div className="text-2xl text-accent font-medium tracking-widest mt-3">GAME ART</div>
        </div>

        {/* Loading progress bar with parallax */}
        <div
          className="mb-6"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
          }}
        >
          <div className="w-full h-3 bg-gaming-dark/50 rounded-full border border-accent/30 overflow-hidden mb-3 relative">
            <div
              className="h-full bg-gradient-to-r from-accent via-cyan-400 to-accent rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide-right" />
            </div>
            {/* Progress bar glow */}
            <div
              className="absolute top-0 h-full bg-accent/20 blur-sm rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div
            className="text-right text-accent text-sm font-mono"
            style={{
              transform: `translate(${mousePosition.x * 1}px, ${mousePosition.y * 1}px)`,
            }}
          >
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading text with subtle RGB split (no jitter) */}
        <div
          className="text-xl text-foreground/90 font-medium font-mono tracking-wider mb-4"
          style={{
            transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
          }}
        >
          <span className="rgb-split rgb-split-animate" data-text={loadingText}>
            {loadingText}
          </span>
          <span className="text-accent animate-pulse">{dots}</span>
        </div>

        {/* Status indicators */}
        <div
          className="flex justify-center space-x-4 text-sm"
          style={{
            transform: `translate(${mousePosition.x * 4}px, ${mousePosition.y * 4}px)`,
          }}
        >
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 bg-accent rounded-full animate-pulse"
              style={{
                transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
              }}
            />
            <span className="text-foreground/70 font-mono">SYSTEM READY</span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"
              style={{
                transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)`,
              }}
            />
            <span className="text-foreground/70 font-mono">CONNECTING</span>
          </div>
        </div>

        {/* Bottom subtle glow */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>
    </div>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="w-12 h-4 bg-gradient-to-r from-gaming-dark via-accent/20 to-gaming-dark rounded animate-pulse bg-[length:200%_100%] animate-shimmer mb-2" />
        <div className="w-full h-12 bg-gradient-to-r from-gaming-dark via-accent/10 to-gaming-dark rounded animate-pulse bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div>
        <div className="w-16 h-4 bg-gradient-to-r from-gaming-dark via-accent/20 to-gaming-dark rounded animate-pulse bg-[length:200%_100%] animate-shimmer mb-2" />
        <div className="w-full h-12 bg-gradient-to-r from-gaming-dark via-accent/10 to-gaming-dark rounded animate-pulse bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div>
        <div className="w-20 h-4 bg-gradient-to-r from-gaming-dark via-accent/20 to-gaming-dark rounded animate-pulse bg-[length:200%_100%] animate-shimmer mb-2" />
        <div className="w-full h-32 bg-gradient-to-r from-gaming-dark via-accent/10 to-gaming-dark rounded animate-pulse bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div className="w-full h-12 bg-gradient-to-r from-gaming-dark via-accent/20 to-gaming-dark rounded animate-pulse bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
}
