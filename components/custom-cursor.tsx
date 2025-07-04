"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  useEffect(() => {
    const updateCursorPosition = () => {
      setCursorPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.25,
        y: prev.y + (mousePosition.y - prev.y) * 0.25,
      }))
    }

    const animationFrame = requestAnimationFrame(updateCursorPosition)
    return () => cancelAnimationFrame(animationFrame)
  }, [mousePosition, cursorPosition])

  return (
    <>
      {/* Main cursor dot - inverted/negative space */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${cursorPosition.x - 4}px, ${cursorPosition.y - 4}px)`,
          transition: "transform 0.05s ease-out",
        }}
      />
      {/* Trailing ring effect - also inverted */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-white/60 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
          transition: "transform 0.08s ease-out, opacity 0.08s ease-out",
        }}
      />
    </>
  )
}
