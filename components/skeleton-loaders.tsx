import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden border-2 border-accent/10 shadow-lg bg-gaming-card animate-pulse">
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
  )
}

export function PageLoader() {
  const [loadingText, setLoadingText] = useState("INITIALIZING")
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")

  useEffect(() => {
    const textStages = [
      "INITIALIZING",
      "LOADING ASSETS", 
      "PREPARING EXPERIENCE",
      "ALMOST READY"
    ]
    
    let currentStage = 0
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5
        
        // Update text based on progress
        if (newProgress > 25 && currentStage === 0) {
          currentStage = 1
          setLoadingText(textStages[1])
        } else if (newProgress > 50 && currentStage === 1) {
          currentStage = 2
          setLoadingText(textStages[2])
        } else if (newProgress > 75 && currentStage === 2) {
          currentStage = 3
          setLoadingText(textStages[3])
        }
        
        return Math.min(newProgress, 95)
      })
    }, 200)

    // Animated dots
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(dotsInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gaming-dark via-background to-gaming-dark z-50 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-ping animation-delay-0" />
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-accent/40 rounded-full animate-ping animation-delay-1000" />
        <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-accent/25 rounded-full animate-ping animation-delay-2000" />
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-accent/20 rounded-full animate-pulse animation-delay-500" />
        <div className="absolute bottom-1/3 right-1/6 w-2.5 h-2.5 bg-accent/35 rounded-full animate-pulse animation-delay-1500" />
      </div>

      {/* Scanning lines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent animate-scan-down" />
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-scan-up animation-delay-1000" />
      </div>

      <div className="text-center relative z-10 max-w-md w-full px-8">
        {/* Main logo with glitch effect */}
        <div className="mb-8 relative">
          <h1 className="text-6xl md:text-7xl font-bold tracking-[0.3em] text-foreground mb-2 font-sora relative">
            <span className="relative inline-block animate-glitch-1">
              DESIGNA
              <span className="absolute top-0 left-0 text-accent opacity-80 animate-glitch-2">DESIGNA</span>
              <span className="absolute top-0 left-0 text-cyan-400 opacity-60 animate-glitch-3">DESIGNA</span>
            </span>
          </h1>
          <div className="text-lg text-accent font-medium tracking-widest animate-pulse">
            GAME ART STUDIO
          </div>
        </div>

        {/* Loading progress bar */}
        <div className="mb-6">
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
          <div className="text-right text-accent text-sm font-mono">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="text-xl text-foreground/90 font-medium font-mono tracking-wider mb-4">
          {loadingText}
          <span className="text-accent animate-pulse">{dots}</span>
        </div>

        {/* Status indicators */}
        <div className="flex justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-foreground/70 font-mono">SYSTEM READY</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            <span className="text-foreground/70 font-mono">CONNECTING</span>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-accent/40 animate-pulse" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-accent/40 animate-pulse animation-delay-500" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent/40 animate-pulse animation-delay-1000" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent/40 animate-pulse animation-delay-1500" />
    </div>
  )
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
  )
}
