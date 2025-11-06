"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Header } from "@/components/navigation/header"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { translations } from "@/lib/i18n"

function StoryContent() {
  const { language } = useTheme()
  const t = translations[language]

  const timeline = [
    {
      year: "2010",
      titleAr: "البداية",
      titleEn: "The Beginning",
      descAr: "تأسيس ويريا برؤية طموحة لتحويل المشهد التقني",
      descEn: "Founded Werya with an ambitious vision to transform the tech landscape",
    },
    {
      year: "2015",
      titleAr: "التوسع",
      titleEn: "Expansion",
      descAr: "توسعنا ليشمل خدمات جديدة وفريق أكبر من الخبراء",
      descEn: "We expanded to include new services and a larger expert team",
    },
    {
      year: "2018",
      titleAr: "الابتكار",
      titleEn: "Innovation",
      descAr: "طرحنا حلولاً مبتكرة غيرت صناعة التكنولوجيا",
      descEn: "We introduced innovative solutions that transformed the tech industry",
    },
    {
      year: "2021",
      titleAr: "القيادة",
      titleEn: "Leadership",
      descAr: "أصبحنا الشركة الرائدة في التحول الرقمي",
      descEn: "We became the leading company in digital transformation",
    },
    {
      year: "2024",
      titleAr: "المستقبل",
      titleEn: "The Future",
      descAr: "نستمر في الابتكار ودفع حدود التكنولوجيا",
      descEn: "We continue to innovate and push the boundaries of technology",
    },
  ]

  return (
    <>
      {/* Page Header */}
      <section className="border-b border-border/40 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">{t.story.title}</h1>
          <p className="text-lg text-foreground/70">
            {language === "ar"
              ? "رحلة ويريا نحو الابتكار والتميز"
              : "Werya's journey towards innovation and excellence"}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative flex gap-6 md:gap-12">
                {/* Timeline Line */}
                <div className="relative flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background font-bold">
                    {idx + 1}
                  </div>
                  {idx < timeline.length - 1 && <div className="h-24 w-0.5 bg-accent/30" />}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="mb-2 text-sm font-semibold text-accent">{item.year}</div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {language === "ar" ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-foreground/70">{language === "ar" ? item.descAr : item.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile spacing for bottom nav */}
      <div className="h-20 md:h-0" />
    </>
  )
}

export default function StoryPage() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <StoryContent />
      <MobileNav />
    </main>
  )
}
