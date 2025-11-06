"use client"

import { useTheme } from "@/lib/theme-provider"
import { useContentManager } from "@/hooks/use-content-manager"
import { translations } from "@/lib/i18n"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { useEffect, useState } from "react"
import { NewsletterSubscription } from "@/components/newsletter-subscription"

const defaultFooterContent = {
  companyDescAr: "شركة رائدة في مجال التحول الرقمي والتكنولوجيا، نقدم حلولاً مبتكرة لتطوير الأعمال",
  companyDescEn:
    "A leading company in digital transformation and technology, providing innovative solutions for business development",
  quickLinks: [
    { id: "services", labelAr: "الخدمات", labelEn: "Services", href: "/services" },
    { id: "about", labelAr: "من نحن", labelEn: "About", href: "/about" },
    { id: "blog", labelAr: "المدونة", labelEn: "Blog", href: "/blog" },
    { id: "contact", labelAr: "اتصل بنا", labelEn: "Contact", href: "/contact" },
  ],
  services: [
    { id: "support", labelAr: "الدعم الفني", labelEn: "Technical Support" },
    { id: "transformation", labelAr: "التحول الرقمي", labelEn: "Digital Transformation" },
    { id: "security", labelAr: "الأمان السيبراني", labelEn: "Cybersecurity" },
    { id: "development", labelAr: "تطوير البرامج", labelEn: "Software Development" },
  ],
  copyrightAr: "جميع الحقوق محفوظة",
  copyrightEn: "All rights reserved",
}

const defaultContactContent = {
  email: "info@werya.com",
  phone: "+966 12 345 6789",
  addressAr: "الرياض، المملكة العربية السعودية",
  addressEn: "Riyadh, Saudi Arabia",
  businessHoursAr: "الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً",
  businessHoursEn: "Sunday - Thursday: 9:00 AM - 6:00 PM",
  socialLinks: {
    facebook: "https://facebook.com/wirya",
    twitter: "https://twitter.com/wirya",
    instagram: "https://instagram.com/wirya",
    linkedin: "https://linkedin.com/company/wirya",
  },
}

export function Footer() {
  const { language } = useTheme()
  const { state } = useContentManager()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const footerContent = (mounted && state.footerContent) || defaultFooterContent
  const contactContent = (mounted && state.contactContent) || defaultContactContent

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-card/30 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Newsletter Subscription */}
        <div className="mb-12 p-6 rounded-lg bg-accent/5 border border-accent/20">
          <NewsletterSubscription
            title={language === "ar" ? "اشترك في نشرتنا البريدية" : "Subscribe to Our Newsletter"}
            description={
              language === "ar" ? "احصل على أحدث الأخبار والعروض الحصرية" : "Get the latest news and exclusive offers"
            }
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">{language === "ar" ? "عن وريا" : "About Wirya"}</h3>
            <p className="mb-4 text-sm text-foreground/60 leading-relaxed">
              {language === "ar" ? footerContent.companyDescAr : footerContent.companyDescEn}
            </p>
            <div className="flex gap-3">
              {contactContent.socialLinks?.facebook && (
                <a
                  href={contactContent.socialLinks.facebook}
                  className="text-foreground/60 hover:text-accent transition-colors"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {contactContent.socialLinks?.twitter && (
                <a
                  href={contactContent.socialLinks.twitter}
                  className="text-foreground/60 hover:text-accent transition-colors"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {contactContent.socialLinks?.linkedin && (
                <a
                  href={contactContent.socialLinks.linkedin}
                  className="text-foreground/60 hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {contactContent.socialLinks?.instagram && (
                <a
                  href={contactContent.socialLinks.instagram}
                  className="text-foreground/60 hover:text-accent transition-colors"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">{language === "ar" ? "روابط سريعة" : "Quick Links"}</h3>
            <ul className="space-y-2 text-sm">
              {footerContent.quickLinks?.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="text-foreground/60 hover:text-accent transition-colors">
                    {language === "ar" ? link.labelAr : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">{language === "ar" ? "خدماتنا" : "Our Services"}</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              {footerContent.services?.map((service) => (
                <li key={service.id}>{language === "ar" ? service.labelAr : service.labelEn}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">{language === "ar" ? "تواصل معنا" : "Contact Us"}</h3>
            <ul className="space-y-3 text-sm text-foreground/60">
              {contactContent.email && (
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${contactContent.email}`} className="hover:text-accent transition-colors">
                    {contactContent.email}
                  </a>
                </li>
              )}
              {contactContent.phone && (
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <a href={`tel:${contactContent.phone}`} className="hover:text-accent transition-colors">
                    {contactContent.phone}
                  </a>
                </li>
              )}
              {(contactContent.addressAr || contactContent.addressEn) && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{language === "ar" ? contactContent.addressAr : contactContent.addressEn}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-foreground/50">
          <p>
            {language === "ar"
              ? `© ${currentYear} وريا. ${footerContent.copyrightAr}`
              : `© ${currentYear} Wirya. ${footerContent.copyrightEn}`}
          </p>
        </div>
      </div>
    </footer>
  )
}
