"use client"

import { useEffect, useRef } from "react"

interface LocationMapProps {
  className?: string
}

export function LocationMap({ className = "" }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined" && mapRef.current) {
      const loadMap = async () => {
        // Create a simple iframe map pointing to Rijeka, Croatia
        const iframe = document.createElement("iframe")
        iframe.src =
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45086.39271746851!2d14.407543799999999!3d45.3271352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4764a12517aabe2d%3A0x373c6f383dcbb670!2sRijeka%2C%20Croatia!5e0!3m2!1sen!2sus!4v1720037553045!5m2!1sen!2sus"
        iframe.width = "100%"
        iframe.height = "100%"
        iframe.style.border = "0"
        iframe.allowFullscreen = false
        iframe.loading = "lazy"
        iframe.referrerPolicy = "no-referrer-when-downgrade"

        // Clear any existing content and append the iframe
        if (mapRef.current) {
          mapRef.current.innerHTML = ""
          mapRef.current.appendChild(iframe)
        }
      }

      loadMap()
    }
  }, [])

  return (
    <div ref={mapRef} className={`w-full h-full min-h-[300px] rounded-lg overflow-hidden shadow-lg ${className}`} />
  )
}
