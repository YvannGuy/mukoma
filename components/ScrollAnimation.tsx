"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
}

export function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const directionClasses = {
    up: "translate-y-8 opacity-0",
    down: "-translate-y-8 opacity-0",
    left: "-translate-x-8 opacity-0",
    right: "translate-x-8 opacity-0",
    fade: "opacity-0",
  }

  const visibleClasses = {
    up: "translate-y-0 opacity-100",
    down: "translate-y-0 opacity-100",
    left: "translate-x-0 opacity-100",
    right: "translate-x-0 opacity-100",
    fade: "opacity-100",
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? visibleClasses[direction] : directionClasses[direction]
      } ${className}`}
    >
      {children}
    </div>
  )
}

