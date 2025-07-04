"use client"

import { useEffect } from "react"

export function useSmoothScroll() {
  useEffect(() => {
    // Remove custom scroll handling - use native smooth scrolling
    const style = document.createElement("style")
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])
}
