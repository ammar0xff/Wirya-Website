"use client"

import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"

interface Feature {
  nameAr: string
  nameEn: string
  included: boolean
}

interface ServicePlan {
  id: string
  nameAr: string
  nameEn: string
  priceAr: string
  priceEn: string
  descAr: string
  descEn: string
  features: Feature[]
  recommended?: boolean
}

interface ServiceComparisonProps {
  services: ServicePlan[]
  title?: string
}

export function ServiceComparison({ services, title }: ServiceComparisonProps) {
  const { language } = useTheme()

  if (!services || services.length === 0) return null

  return (
    <section className="border-t border-border/40 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              {title || (language === "ar" ? "مقارنة الخدمات" : "Compare Services")}
            </h2>
          </div>
        </FadeIn>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">
                  {language === "ar" ? "المميزات" : "Features"}
                </th>
                {services.map((service) => (
                  <th key={service.id} className="px-4 py-4 text-center">
                    <Card
                      className={`p-4 text-center ${
                        service.recommended ? "border-accent bg-accent/10" : "border border-border/40 bg-card/50"
                      }`}
                    >
                      {service.recommended && (
                        <div className="mb-2 inline-block bg-accent px-3 py-1 rounded-full text-xs font-semibold text-white">
                          {language === "ar" ? "موصى به" : "Recommended"}
                        </div>
                      )}
                      <h3 className="font-semibold text-foreground">
                        {language === "ar" ? service.nameAr : service.nameEn}
                      </h3>
                      <p className="mt-2 text-sm text-foreground/60">
                        {language === "ar" ? service.descAr : service.descEn}
                      </p>
                    </Card>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services[0]?.features.map((feature, idx) => (
                <tr key={idx} className="border-b border-border/20 hover:bg-card/30">
                  <td className="px-4 py-4 text-sm font-medium text-foreground">
                    {language === "ar" ? feature.nameAr : feature.nameEn}
                  </td>
                  {services.map((service) => {
                    const serviceFeature = service.features[idx]
                    return (
                      <td key={service.id} className="px-4 py-4 text-center">
                        {serviceFeature?.included ? (
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-foreground/30 mx-auto" />
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
