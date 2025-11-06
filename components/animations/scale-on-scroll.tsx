"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"

interface ScaleOnScrollProps {
  children: React.ReactNode
  delay?: number
}

export function ScaleOnScroll({ children, delay = 0 }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        transform: isVisible ? "scale(1)" : "scale(0.95)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 500ms ease-out, opacity 500ms ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
