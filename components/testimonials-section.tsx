"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { ScaleOnScroll } from "@/components/animations/scale-on-scroll"

interface Testimonial {
  id: string
  nameAr: string
  nameEn: string
  roleAr: string
  roleEn: string
  companyAr: string
  companyEn: string
  contentAr: string
  contentEn: string
  rating: number
  imageUrl?: string
  featured: boolean
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
  title?: string
  description?: string
  limit?: number
}

export function TestimonialsSection({ testimonials = [], title, description, limit = 6 }: TestimonialsSectionProps) {
  const { language } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [displayTestimonials, setDisplayTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && testimonials.length > 0) {
      // Show featured testimonials first, then others
      const featured = testimonials.filter((t) => t.featured).slice(0, limit)
      const others = testimonials.filter((t) => !t.featured).slice(0, limit - featured.length)
      setDisplayTestimonials([...featured, ...others])
    }
  }, [mounted, testimonials, limit])

  if (!mounted || displayTestimonials.length === 0) return null

  const defaultTitle = language === "ar" ? "آراء عملائنا" : "Client Testimonials"
  const defaultDescription =
    language === "ar" ? "استمع إلى ما يقوله عملاؤنا عن خدماتنا" : "Hear what our clients say about our services"

  return (
    <section className="border-t border-border/40 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{title || defaultTitle}</h2>
            {(description || defaultDescription) && (
              <p className="mt-2 text-foreground/60">{description || defaultDescription}</p>
            )}
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayTestimonials.map((testimonial, idx) => (
            <ScaleOnScroll key={testimonial.id} delay={idx * 100}>
              <Card className="border border-border/40 bg-card/50 p-6 flex flex-col h-full hover:border-accent/50 hover:bg-card/80 transition-all duration-300">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-border/40"
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="flex-1 mb-6 text-sm text-foreground/70 leading-relaxed">
                  "{language === "ar" ? testimonial.contentAr : testimonial.contentEn}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/20">
                  {testimonial.imageUrl && (
                    <img
                      src={testimonial.imageUrl || "/placeholder.svg"}
                      alt={language === "ar" ? testimonial.nameAr : testimonial.nameEn}
                      className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-foreground">
                      {language === "ar" ? testimonial.nameAr : testimonial.nameEn}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {language === "ar" ? testimonial.roleAr : testimonial.roleEn} •{" "}
                      {language === "ar" ? testimonial.companyAr : testimonial.companyEn}
                    </p>
                  </div>
                </div>
              </Card>
            </ScaleOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
