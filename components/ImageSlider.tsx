"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageModal } from "./ImageModal"

interface ImageSliderProps {
  images: string[]
  alt: string
  className?: string
  autoPlay?: boolean
  interval?: number
  enableZoom?: boolean
}

export function ImageSlider({ 
  images, 
  alt, 
  className = "", 
  autoPlay = true, 
  interval = 5000,
  enableZoom = true
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <ImageModal
        src={images[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className={`relative w-full aspect-[3/4] max-w-md mx-auto ${className}`}>
        <div 
          className={`relative w-full h-full overflow-hidden rounded-lg shadow-2xl ${
            enableZoom ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
          }`}
          onClick={() => enableZoom && setIsModalOpen(true)}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`${alt} - Image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
          {enableZoom && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20 rounded-lg pointer-events-none">
              <div className="bg-black/50 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2">
                <ZoomIn className="h-4 w-4" />
                Cliquez pour agrandir
              </div>
            </div>
          )}
        </div>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full z-10"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full z-10"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  goToSlide(index)
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-amber-400"
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      </div>
    </>
  )
}

