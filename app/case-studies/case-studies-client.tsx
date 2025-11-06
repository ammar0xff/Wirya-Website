"use client"

import { useTheme } from "@/lib/theme-provider"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { caseStudiesData } from "@/lib/site-content"
import { FadeIn } from "@/components/animations/fade-in"
import { ScaleOnScroll } from "@/components/animations/scale-on-scroll"
import { Card } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import Link from "next/link"

export default function CaseStudiesClient() {
  const { language } = useTheme()

  return (
    <div className="container mx-auto px-4 py-12">
      <BreadcrumbNav />

      <FadeIn>
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-8 w-8 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">
              {language === "ar" ? "دراسات الحالة" : "Case Studies"}
            </h1>
          </div>
          <p className="text-lg text-foreground/70">
            {language === "ar" ? "اطلع على نجاحاتنا مع عملائنا" : "Explore our success stories with clients"}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        {caseStudiesData.studies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudiesData.studies.map((study, idx) => (
              <ScaleOnScroll key={study.id} delay={idx * 50}>
                <Link href={`/case-studies/${study.id}`}>
                  <Card className="h-full border border-border/40 overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all cursor-pointer">
                    {study.imageUrl && (
                      <div className="h-48 bg-gradient-to-br from-accent/10 to-primary/10">
                        <img
                          src={study.imageUrl || "/placeholder.svg"}
                          alt={language === "ar" ? study.titleAr : study.titleEn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-semibold text-foreground">
                        {language === "ar" ? study.titleAr : study.titleEn}
                      </h3>
                      <p className="text-sm text-foreground/60 mt-2">
                        {language === "ar" ? study.descriptionAr : study.descriptionEn}
                      </p>
                      <p className="text-xs text-foreground/50 mt-4">
                        {language === "ar" ? "العميل: " : "Client: "}
                        {study.client}
                      </p>
                    </div>
                  </Card>
                </Link>
              </ScaleOnScroll>
            ))}
          </div>
        ) : (
          <Card className="p-12 border border-border/40 text-center">
            <p className="text-foreground/60">
              {language === "ar" ? "لا توجد دراسات حالة حتى الآن" : "No case studies yet"}
            </p>
          </Card>
        )}
      </FadeIn>
    </div>
  )
}
