"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/footer"
import { useTheme } from "@/lib/theme-provider"
import { FAQSection } from "@/components/faq-section"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { faqData } from "@/lib/site-content"
import { FadeIn } from "@/components/animations/fade-in"
import { HelpCircle } from "lucide-react"

export default function FAQPage() {
  const { language } = useTheme()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <BreadcrumbNav />

        <FadeIn>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-8 w-8 text-accent" />
              <h1 className="text-4xl font-bold text-foreground">
                {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
              </h1>
            </div>
            <p className="text-lg text-foreground/70">
              {language === "ar"
                ? "ابحث عن إجابات سريعة على الأسئلة الشائعة"
                : "Find quick answers to common questions"}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <FAQSection faqs={faqData.faqs} />
        </FadeIn>
      </div>

      <Footer />
    </main>
  )
}
