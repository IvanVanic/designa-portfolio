"use client"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface ArtworkModalProps {
  artwork: {
    id: number
    title: string
    type: string
    image: string
    description: string
    tags: string[]
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ArtworkModal({ artwork, isOpen, onClose }: ArtworkModalProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300) // Match animation duration
  }

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false)
    }
  }, [isOpen])

  if (!isOpen && !isClosing) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out ${
          isClosing ? "opacity-0 backdrop-blur-none" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-[#E7E5DF] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ease-out ${
          isClosing ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        {/* Close Button */}
        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-[#393E41]/20 hover:bg-[#393E41]/40 text-[#393E41] rounded-full transition-all duration-200 hover:scale-110"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="grid md:grid-cols-2 gap-0 h-full">
          {/* Image Section */}
          <div className="relative bg-[#D3D0CB]/30">
            <img
              src={artwork?.image || "/placeholder.svg"}
              alt={artwork?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col justify-center">
            <div className="mb-4">
              <Badge className="bg-[#44BBA4] text-white hover:bg-[#44BBA4]/90 mb-3">{artwork?.type}</Badge>
              <h2 className="text-3xl font-bold text-[#393E41] mb-4">{artwork?.title}</h2>
            </div>

            <p className="text-[#393E41]/80 text-lg leading-relaxed mb-6">{artwork?.description}</p>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#393E41] uppercase tracking-wide">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {artwork?.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-[#44BBA4] text-[#393E41] hover:bg-[#44BBA4]/10"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
