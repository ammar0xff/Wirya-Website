"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/lib/theme-provider"
import { useContentManager } from "@/hooks/use-content-manager"
import { ContactInfoCard } from "@/components/contact/contact-info-card"
import { BusinessHours } from "@/components/contact/business-hours"
import { SocialLinks } from "@/components/contact/social-links"
import { translations } from "@/lib/i18n"
import { contactPageContent as defaultContactContent } from "@/lib/site-content"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function ContactClientPage() {
  const { language } = useTheme()
  const { state } = useContentManager()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const contactContent = mounted && state.contactContent ? state.contactContent : defaultContactContent

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: contactContent.socialLinks?.facebook || "https://facebook.com/wirya",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: contactContent.socialLinks?.twitter || "https://twitter.com/wirya",
      color: "hover:text-sky-500 dark:hover:text-sky-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: contactContent.socialLinks?.instagram || "https://instagram.com/wirya",
      color: "hover:text-pink-600 dark:hover:text-pink-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: contactContent.socialLinks?.linkedin || "https://linkedin.com/company/wirya",
      color: "hover:text-blue-700 dark:hover:text-blue-500",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border/40 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">{t.common.contact.title}</h1>
          <p className="text-lg text-foreground/70">{t.common.contact.subtitle}</p>
        </div>
      </section>

      <section className="px-4 py-20 md:px-6 md:py-32 border-b border-border/40">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            <ContactInfoCard
              icon={<Mail className="h-6 w-6 text-accent" />}
              title={t.common.contact.email}
              content={contactContent.email}
              href={`mailto:${contactContent.email}`}
            />
            <ContactInfoCard
              icon={<Phone className="h-6 w-6 text-accent" />}
              title={t.common.contact.phone}
              content={contactContent.phone}
              href={`tel:${contactContent.phone}`}
            />
            <ContactInfoCard
              icon={<MapPin className="h-6 w-6 text-accent" />}
              title={t.common.contact.address}
              content={language === "ar" ? contactContent.addressAr : contactContent.addressEn}
            />
            <BusinessHours
              title={t.common.contact.businessHours}
              hours={language === "ar" ? contactContent.businessHoursAr : contactContent.businessHoursEn}
            />
          </div>
        </div>
      </section>

      <SocialLinks title={t.common.contact.followUs} links={socialLinks} />
    </main>
  )
}
