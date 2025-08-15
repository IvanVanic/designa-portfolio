import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
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
  const [loadingText, setLoadingText] = useState("initializing");
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // preload particles with consistent positions for smoother experience
    const generatedParticles = [
      { id: 0, left: "12%", size: "10px", delay: "-12s", speedClass: "animate-flow-up-slow" },
      { id: 1, left: "28%", size: "14px", delay: "-8s", speedClass: "animate-flow-up-medium" },
      { id: 2, left: "45%", size: "18px", delay: "-15s", speedClass: "animate-flow-up-fast" },
      { id: 3, left: "62%", size: "10px", delay: "-3s", speedClass: "animate-flow-up-slow" },
      { id: 4, left: "78%", size: "14px", delay: "-20s", speedClass: "animate-flow-up-medium" },
      { id: 5, left: "15%", size: "18px", delay: "-7s", speedClass: "animate-flow-up-fast" },
      { id: 6, left: "33%", size: "10px", delay: "-18s", speedClass: "animate-flow-up-slow" },
      { id: 7, left: "51%", size: "14px", delay: "-11s", speedClass: "animate-flow-up-medium" },
      { id: 8, left: "69%", size: "18px", delay: "-5s", speedClass: "animate-flow-up-fast" },
      { id: 9, left: "87%", size: "10px", delay: "-14s", speedClass: "animate-flow-up-slow" },
      { id: 10, left: "8%", size: "14px", delay: "-22s", speedClass: "animate-flow-up-medium" },
      { id: 11, left: "25%", size: "18px", delay: "-9s", speedClass: "animate-flow-up-fast" },
      { id: 12, left: "42%", size: "10px", delay: "-16s", speedClass: "animate-flow-up-slow" },
      { id: 13, left: "59%", size: "14px", delay: "-2s", speedClass: "animate-flow-up-medium" },
      { id: 14, left: "76%", size: "18px", delay: "-13s", speedClass: "animate-flow-up-fast" },
      { id: 15, left: "92%", size: "10px", delay: "-19s", speedClass: "animate-flow-up-slow" },
      { id: 16, left: "5%", size: "14px", delay: "-6s", speedClass: "animate-flow-up-medium" },
      { id: 17, left: "22%", size: "18px", delay: "-17s", speedClass: "animate-flow-up-fast" },
      { id: 18, left: "38%", size: "10px", delay: "-4s", speedClass: "animate-flow-up-slow" },
      { id: 19, left: "55%", size: "14px", delay: "-21s", speedClass: "animate-flow-up-medium" },
      { id: 20, left: "72%", size: "18px", delay: "-10s", speedClass: "animate-flow-up-fast" },
      { id: 21, left: "89%", size: "10px", delay: "-1s", speedClass: "animate-flow-up-slow" },
      { id: 22, left: "18%", size: "14px", delay: "-23s", speedClass: "animate-flow-up-medium" },
      { id: 23, left: "35%", size: "18px", delay: "-12s", speedClass: "animate-flow-up-fast" },
    ];
    setParticles(generatedParticles);

    const textStages = ["initializing", "loading assets", "preparing", "almost ready"];

    let currentStage = 0;
    let lastStageAt = Date.now();
    const MIN_STAGE_MS = 800;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 12 + 4;

        const now = Date.now();
        // update text based on progress with a minimum dwell time per stage
        if (newProgress > 25 && currentStage === 0 && now - lastStageAt >= MIN_STAGE_MS) {
          currentStage = 1;
          lastStageAt = now;
          setLoadingText(textStages[1]);
        } else if (newProgress > 50 && currentStage === 1 && now - lastStageAt >= MIN_STAGE_MS) {
          currentStage = 2;
          lastStageAt = now;
          setLoadingText(textStages[2]);
        } else if (newProgress > 75 && currentStage === 2 && now - lastStageAt >= MIN_STAGE_MS) {
          currentStage = 3;
          lastStageAt = now;
          setLoadingText(textStages[3]);
        }

        return Math.min(newProgress, 95);
      });
    }, 180);

    // animated dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 150);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  // cursor parallax (background moves less than foreground)
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (rafIdRef.current == null) {
        rafIdRef.current = requestAnimationFrame(() => {
          setMouse({ x, y });
          rafIdRef.current = null;
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove as EventListener);
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background/95">
      {/* subtle background trails and particles */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate(${mouse.x * 2}px, ${mouse.y * 2}px)` }}
      >
        {Array.from({ length: 10 }).map((_, i) => {
          const left = Math.round((i + 1) * (100 / 11));
          const delay = (i % 5) * -6;
          const speedClass =
            i % 3 === 0
              ? "animate-flow-up-slow"
              : i % 3 === 1
              ? "animate-flow-up-medium"
              : "animate-flow-up-fast";
          return (
            <div
              key={`line-${i}`}
              className={`${speedClass} absolute bottom-[-20vh] w-px h-[140vh] bg-gradient-to-t from-transparent via-border to-border/40`}
              style={{ left: `${left}%`, animationDelay: `${delay}s` }}
            />
          );
        })}

        {particles.map((p) => (
          <div
            key={`particle-${p.id}`}
            className={`${p.speedClass} absolute bottom-[-10vh] opacity-60 bg-accent/50 rounded-full`}
            style={{
              left: p.left,
              width: `${parseFloat(p.size) * 0.25}px`,
              height: `${parseFloat(p.size) * 0.25}px`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
      <div className="text-center relative z-10 max-w-md w-full px-8">
        <div
          className="mb-8 relative flex flex-col items-center"
          style={{ transform: `translate(${mouse.x * 5}px, ${mouse.y * 5}px)` }}
        >
          <div className="relative w-80 md:w-96 lg:w-[28rem] h-12 md:h-14 lg:h-16">
            <Image
              src="/brand/designa-wordmark.svg"
              alt="DESIGNA"
              fill
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div
          className="mb-6"
          style={{ transform: `translate(${mouse.x * 9}px, ${mouse.y * 9}px)` }}
        >
          <div className="w-full h-2 bg-muted rounded-full border border-border overflow-hidden mb-2 relative">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          className="text-base text-foreground/90 font-medium font-mono tracking-wide"
          style={{ transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)` }}
        >
          <span>{loadingText}</span>
          <span className="text-accent">{dots}</span>
        </div>
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
