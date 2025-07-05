import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

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

export function PageLoader() {
  const [loadingText, setLoadingText] = useState("INITIALIZING");
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
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
      {/* Animated background elements with enhanced parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-ping animation-delay-0"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-accent/40 rounded-full animate-ping animation-delay-1000"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-accent/25 rounded-full animate-ping animation-delay-2000"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`,
          }}
        />
        <div
          className="absolute top-1/2 left-1/6 w-3 h-3 bg-accent/20 rounded-full animate-pulse animation-delay-500"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/6 w-2.5 h-2.5 bg-accent/35 rounded-full animate-pulse animation-delay-1500"
          style={{
            transform: `translate(${mousePosition.x * 35}px, ${mousePosition.y * 35}px)`,
          }}
        />

        {/* Additional floating elements */}
        <div
          className="absolute top-1/6 right-1/3 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse animation-delay-700"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
        <div
          className="absolute bottom-1/6 left-1/2 w-2 h-2 bg-cyan-200/25 rounded-full animate-ping animation-delay-1200"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        />
        <div
          className="absolute top-2/3 left-1/5 w-1 h-1 bg-accent/40 rounded-full animate-pulse animation-delay-800"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`,
          }}
        />
      </div>

      {/* Enhanced scanning lines effect with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent animate-scan-down"
          style={{
            transform: `translateY(${mousePosition.y * 10}px)`,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-scan-up animation-delay-1000"
          style={{
            transform: `translateY(${mousePosition.y * -10}px)`,
          }}
        />
        <div
          className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan-down animation-delay-2000"
          style={{
            transform: `translateY(${mousePosition.y * 15}px)`,
          }}
        />
        <div
          className="absolute bottom-1/3 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent animate-scan-up animation-delay-3000"
          style={{
            transform: `translateY(${mousePosition.y * -15}px)`,
          }}
        />
      </div>

      <div
        className="text-center relative z-10 max-w-md w-full px-8"
        style={{
          transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
        }}
      >
        {/* Main logo with glitch effect */}
        <div className="mb-8 relative">
          <h1 className="text-6xl md:text-7xl font-bold tracking-widest text-foreground mb-2 font-sora relative">
            <span className="relative inline-block animate-glitch-1">
              DESIGNA
              <span className="absolute top-0 left-0 text-cyan-200 opacity-80 animate-glitch-2">
                DESIGNA
              </span>
              <span className="absolute top-0 left-0 text-cyan-400 opacity-60 animate-glitch-3">
                DESIGNA
              </span>
            </span>
          </h1>
          <div className="text-2xl text-accent font-medium tracking-widest animate-pulse relative">
            <span className="relative inline-block animate-glitch-1">
              GAME ART
              <span className="absolute top-0 left-0 text-cyan-200 opacity-80 animate-glitch-2">
                GAME ART
              </span>
              <span className="absolute top-0 left-0 text-cyan-400 opacity-60 animate-glitch-3">
                GAME ART
              </span>
            </span>
          </div>
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
            <span className="relative inline-block animate-glitch-1">
              {Math.round(progress)}%
              <span className="absolute top-0 left-0 text-cyan-200 opacity-80 animate-glitch-2">
                {Math.round(progress)}%
              </span>
              <span className="absolute top-0 left-0 text-cyan-400 opacity-60 animate-glitch-3">
                {Math.round(progress)}%
              </span>
            </span>
          </div>
        </div>

        {/* Loading text with typewriter effect and glitch */}
        <div
          className="text-xl text-foreground/90 font-medium font-mono tracking-wider mb-4"
          style={{
            transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
          }}
        >
          <span className="relative inline-block animate-glitch-1">
            {loadingText}
            <span className="absolute top-0 left-0 text-cyan-200 opacity-80 animate-glitch-2">
              {loadingText}
            </span>
            <span className="absolute top-0 left-0 text-cyan-400 opacity-60 animate-glitch-3">
              {loadingText}
            </span>
          </span>
          <span className="text-accent animate-pulse">{dots}</span>
        </div>

        {/* Status indicators with parallax and glitch */}
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
            <span className="text-foreground/70 font-mono relative inline-block animate-glitch-1">
              SYSTEM READY
              <span className="absolute top-0 left-0 text-cyan-200 opacity-60 animate-glitch-2">
                SYSTEM READY
              </span>
              <span className="absolute top-0 left-0 text-cyan-400 opacity-40 animate-glitch-3">
                SYSTEM READY
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"
              style={{
                transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)`,
              }}
            />
            <span className="text-foreground/70 font-mono relative inline-block animate-glitch-1">
              CONNECTING
              <span className="absolute top-0 left-0 text-cyan-200 opacity-60 animate-glitch-2">
                CONNECTING
              </span>
              <span className="absolute top-0 left-0 text-cyan-400 opacity-40 animate-glitch-3">
                CONNECTING
              </span>
            </span>
          </div>
        </div>

        {/* Bottom decorative elements with parallax */}
        <div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          style={{
            transform: `translate(${mousePosition.x * 6}px, ${
              mousePosition.y * 6
            }px) translateX(-50%)`,
          }}
        />
      </div>

      {/* Corner decorations with enhanced parallax */}
      <div
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-accent/40 animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * -12}px)`,
        }}
      />
      <div
        className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-accent/40 animate-pulse animation-delay-500"
        style={{
          transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * -12}px)`,
        }}
      />
      <div
        className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent/40 animate-pulse animation-delay-1000"
        style={{
          transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * 12}px)`,
        }}
      />
      <div
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent/40 animate-pulse animation-delay-1500"
        style={{
          transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)`,
        }}
      />

      {/* Additional corner elements */}
      <div
        className="absolute top-1/4 left-4 w-8 h-8 border-l border-accent/30 animate-pulse animation-delay-2000"
        style={{
          transform: `translate(${mousePosition.x * -18}px, ${mousePosition.y * -18}px)`,
        }}
      />
      <div
        className="absolute top-1/4 right-4 w-8 h-8 border-r border-accent/30 animate-pulse animation-delay-2500"
        style={{
          transform: `translate(${mousePosition.x * 18}px, ${mousePosition.y * -18}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 left-4 w-8 h-8 border-l border-accent/30 animate-pulse animation-delay-3000"
        style={{
          transform: `translate(${mousePosition.x * -18}px, ${mousePosition.y * 18}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-4 w-8 h-8 border-r border-accent/30 animate-pulse animation-delay-3500"
        style={{
          transform: `translate(${mousePosition.x * 18}px, ${mousePosition.y * 18}px)`,
        }}
      />
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
