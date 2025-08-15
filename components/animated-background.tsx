/**
 * Animated Background Component
 * Provides a wave-like gradient background that flows past cursor disturbances
 */

"use client";

import { useEffect, useState, useRef } from "react";

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [wavePhase, setWavePhase] = useState(0);
  const [mouseTrail, setMouseTrail] = useState<Array<{ x: number; y: number; timestamp: number }>>(
    []
  );
  const rafIdRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // refs to avoid stale closures inside rAF
  const mousePosRef = useRef(mousePosition);
  const mouseTrailRef = useRef(mouseTrail);
  useEffect(() => {
    mousePosRef.current = mousePosition;
  }, [mousePosition]);
  useEffect(() => {
    mouseTrailRef.current = mouseTrail;
  }, [mouseTrail]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      rafIdRef.current = requestAnimationFrame(() => {
        const rect = canvasRef.current?.getBoundingClientRect();
        const width = rect?.width ?? window.innerWidth;
        const height = rect?.height ?? window.innerHeight;
        const left = rect?.left ?? 0;
        const top = rect?.top ?? 0;
        const x = Math.min(1, Math.max(0, (e.clientX - left) / width));
        const y = Math.min(1, Math.max(0, (e.clientY - top) / height));
        setMousePosition({ x, y });

        // append to mouse trail with ~2.8s lifetime (longer, faint)
        const now = Date.now();
        setMouseTrail((prev) => {
          const next = prev.filter((p) => now - p.timestamp < 2800);
          next.push({ x, y, timestamp: now });
          return next;
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // canvas setup and resize handler
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      setWavePhase((prev) => prev + 0.003); // slower

      // draw faint dot grid reacting to mouse and trail
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const grid = 36; // px spacing
      const now = Date.now();
      const mouse = mousePosRef.current;
      const trail = mouseTrailRef.current;

      for (let x = 0; x <= width; x += grid) {
        for (let y = 0; y <= height; y += grid) {
          const nx = x / width;
          const ny = y / height;

          const dx = nx - mouse.x;
          const dy = ny - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // base slow shimmer (more muted)
          const base = 0.004 + 0.006 * Math.sin(wavePhase * 0.45 + nx * 4.8 + ny * 3.8);

          // cursor reveal using a soft radius with feathered falloff
          const revealRadius = 0.1; // smaller reveal radius
          const feather = 0.07; // tighter feather for smaller zone
          const tReveal = Math.max(0, 1 - Math.max(0, dist - revealRadius) / feather);
          const reveal = tReveal * tReveal; // quadratic falloff for smooth edge

          // faint, longer trail glow
          let trailGlow = 0;
          for (let i = trail.length - 1; i >= 0; i--) {
            const t = trail[i];
            const age = (now - t.timestamp) / 2800; // 0..1
            if (age > 1) break;
            const ddx = nx - t.x;
            const ddy = ny - t.y;
            const d = Math.sqrt(ddx * ddx + ddy * ddy);
            const influence = Math.max(0, 1 - d * 9) * Math.max(0, 1 - age);
            trailGlow = Math.max(trailGlow, influence * 0.08);
          }

          // add slow opacity modulation (~30% range around base)
          const modPhase = Math.sin(wavePhase * 0.22 + nx * 3.2 + ny * 2.6);
          const modulation = 1 + 0.15 * modPhase; // 0.85 .. 1.15
          let intensity = Math.min(0.2, base + reveal * 0.18 + trailGlow);
          intensity *= modulation;
          intensity = Math.min(0.2, Math.max(0, intensity));

          if (intensity > 0.01) {
            // white, dimmed, with subtle glow
            const alpha = intensity * 0.25; // base dot alpha (dimmer)
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            // subtle glow; keep small for perf
            const glowAlpha = Math.min(0.08, intensity * 0.16);
            ctx.shadowColor = `rgba(200, 220, 255, ${glowAlpha})`;
            ctx.shadowBlur = intensity > 0.08 ? 3 : 1;
            ctx.beginPath();
            const size = 0.7 + intensity * 1.2; // 0.7px .. ~1.9px
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            // reset glow to avoid leaking to other ops
            ctx.shadowBlur = 0;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [wavePhase]);

  // Create wave disturbance that flows past the mouse
  const wave1X = (mousePosition.x * 0.2 + Math.sin(wavePhase) * 0.15 + 0.4) * 100;
  const wave1Y = (mousePosition.y * 0.2 + Math.cos(wavePhase * 0.6) * 0.15 + 0.3) * 100;

  const wave2X = (mousePosition.x * 0.15 + Math.sin(wavePhase * 0.7 + Math.PI) * 0.18 + 0.6) * 100;
  const wave2Y = (mousePosition.y * 0.15 + Math.cos(wavePhase * 0.5 + Math.PI) * 0.18 + 0.7) * 100;

  const wave3X = (mousePosition.x * 0.1 + Math.sin(wavePhase * 0.9) * 0.2 + 0.2) * 100;
  const wave3Y = (mousePosition.y * 0.1 + Math.cos(wavePhase * 0.8) * 0.2 + 0.8) * 100;

  const gradientStyle = {
    background: `
      radial-gradient(
        ellipse 130% 85% at ${wave1X}% ${wave1Y}%, 
        rgba(6, 10, 18, 0.007) 0%, /* near-black blue */
        rgba(10, 15, 28, 0.005) 25%, /* deep cool */
        rgba(24, 37, 84, 0.0035) 40%, /* darker blue */
        transparent 65%
      ),
      radial-gradient(
        ellipse 110% 130% at ${wave2X}% ${wave2Y}%, 
        rgba(30, 27, 75, 0.003) 0%, /* indigo-950 */
        rgba(17, 24, 39, 0.002) 25%, /* slate-900 */
        transparent 55%
      ),
      radial-gradient(
        ellipse 150% 95% at ${wave3X}% ${wave3Y}%, 
        rgba(4, 60, 50, 0.0012) 0%, /* deep teal shadow */
        rgba(2, 20, 30, 0.0006) 35%, /* darker teal-blue */
        transparent 60%
      )
    `,
    filter: "blur(26px)",
    transition: "background 1.6s ease-out",
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0" style={gradientStyle} />
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
    </>
  );
}
