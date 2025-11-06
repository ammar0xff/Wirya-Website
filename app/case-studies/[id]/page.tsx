"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/footer"
import { useTheme } from "@/lib/theme-provider"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { caseStudiesData } from "@/lib/site-content"
import { FadeIn } from "@/components/animations/fade-in"
import { Card } from "@/components/ui/card"
import { useParams } from "next/navigation"
import { TrendingUp } from "lucide-react"

export default function CaseStudyDetailPage() {
  const { language } = useTheme()
  const params = useParams()
  const caseId = params.id as string

  const caseStudy = caseStudiesData.studies.find((s) => s.id === caseId)

  if (!caseStudy) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-foreground/60">{language === "ar" ? "دراسة الحالة غير موجودة" : "Case study not found"}</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <BreadcrumbNav />

        <FadeIn>
          <div className="mb-12">
            {caseStudy.imageUrl && (
              <div className="mb-8 rounded-xl overflow-hidden h-96">
                <img
                  src={caseStudy.imageUrl || "/placeholder.svg"}
                  alt={language === "ar" ? caseStudy.titleAr : caseStudy.titleEn}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
              {language === "ar" ? caseStudy.titleAr : caseStudy.titleEn}
            </h1>

            <p className="text-lg text-foreground/70 mb-6">
              {language === "ar" ? caseStudy.descriptionAr : caseStudy.descriptionEn}
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-8">
              <Card className="p-4 border border-border/40 bg-card/50">
                <p className="text-sm text-foreground/60 mb-2">{language === "ar" ? "العميل" : "Client"}</p>
                <p className="font-semibold text-foreground">{caseStudy.client}</p>
              </Card>
              <Card className="p-4 border border-border/40 bg-card/50">
                <p className="text-sm text-foreground/60 mb-2">{language === "ar" ? "التصنيف" : "Category"}</p>
                <p className="font-semibold text-foreground">{caseStudy.category}</p>
              </Card>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p>{language === "ar" ? caseStudy.contentAr : caseStudy.contentEn}</p>
          </div>
        </FadeIn>

        {caseStudy.results && caseStudy.results.length > 0 && (
          <FadeIn delay={200}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-accent" />
                {language === "ar" ? "النتائج" : "Results"}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {caseStudy.results.map((result, idx) => (
                  <Card key={idx} className="p-6 border border-border/40 bg-card/50 text-center">
                    <p className="text-3xl font-bold text-accent mb-2">{result.value}</p>
                    <p className="text-foreground/70">{result.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      <Footer />
    </main>
  )
}
