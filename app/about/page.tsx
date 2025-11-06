"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Header } from "@/components/navigation/header"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { translations } from "@/lib/i18n"
import { CheckCircle2 } from "lucide-react"

function AboutContent() {
  const { language } = useTheme()
  const t = translations[language]

  const values = [
    {
      titleAr: "الابتكار",
      titleEn: "Innovation",
      descAr: "نحن نبتكر حلولاً جديدة تواكب التطورات التكنولوجية",
      descEn: "We innovate solutions that keep pace with technological advances",
    },
    {
      titleAr: "الموثوقية",
      titleEn: "Reliability",
      descAr: "نضمن خدمات موثوقة وآمنة لعملائنا",
      descEn: "We ensure reliable and secure services for our clients",
    },
    {
      titleAr: "التميز",
      titleEn: "Excellence",
      descAr: "نسعى للتميز في كل ما نقدمه",
      descEn: "We strive for excellence in everything we do",
    },
    {
      titleAr: "الشفافية",
      titleEn: "Transparency",
      descAr: "نتعامل بشفافية كاملة مع عملائنا",
      descEn: "We deal with complete transparency with our clients",
    },
  ]

  const achievements = [
    { numberAr: "+500", numberEn: "+500", titleAr: "عميل سعيد", titleEn: "Happy Clients" },
    { numberAr: "+1000", numberEn: "+1000", titleAr: "مشروع منجز", titleEn: "Completed Projects" },
    { numberAr: "+50", numberEn: "+50", titleAr: "فريق متخصص", titleEn: "Expert Team Members" },
    { numberAr: "+15", numberEn: "+15", titleAr: "سنة خبرة", titleEn: "Years of Experience" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border/40 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">{t.about.title}</h1>
          <p className="text-lg text-foreground/70">
            {language === "ar"
              ? "ويريا هي شركة رائدة في مجال التحول الرقمي والتكنولوجيا"
              : "Werya is a leading company in digital transformation and technology"}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-b border-border/40 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">{t.about.mission}</h2>
              <p className="text-foreground/70 leading-relaxed">
                {language === "ar"
                  ? "مهمتنا هي تمكين المؤسسات من خلال حلول تكنولوجية مبتكرة تحسن كفاءتها وتعزز نموها"
                  : "Our mission is to empower organizations through innovative technology solutions that improve efficiency and drive growth"}
              </p>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">{t.about.vision}</h2>
              <p className="text-foreground/70 leading-relaxed">
                {language === "ar"
                  ? "رؤيتنا هي أن نصبح الشريك المفضل للتحول الرقمي والتكنولوجيا في المنطقة"
                  : "Our vision is to be the preferred partner for digital transformation and technology in the region"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border/40 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            {language === "ar" ? "قيمنا" : "Our Values"}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => (
              <div key={idx} className="rounded-lg border border-border/40 bg-card/50 p-6">
                <div className="mb-3 text-accent">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {language === "ar" ? value.titleAr : value.titleEn}
                </h3>
                <p className="text-sm text-foreground/60">{language === "ar" ? value.descAr : value.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            {language === "ar" ? "إنجازاتنا" : "Our Achievements"}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                  {language === "ar" ? achievement.numberAr : achievement.numberEn}
                </div>
                <p className="text-foreground/70">{language === "ar" ? achievement.titleAr : achievement.titleEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile spacing for bottom nav */}
      <div className="h-20 md:h-0" />
      <MobileNav />
    </main>
  )
}

export default function AboutPage() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="h-20 md:h-0" />
        <MobileNav />
      </main>
    )
  }

  return <AboutContent />
}
