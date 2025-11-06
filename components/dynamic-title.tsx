"use client"

import { useEffect, useState } from "react"
import { useContentManager } from "@/hooks/use-content-manager"
import { useTheme } from "@/lib/theme-provider"
import { siteSettings as defaultSiteSettings } from "@/lib/site-content"
import { usePathname } from "next/navigation"

export function DynamicTitle() {
  const { state } = useContentManager()
  const { language } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Get settings from content manager or use defaults
    const settings = state.siteSettings || defaultSiteSettings

    const siteName = language === "ar" ? "وريا" : "Wirya"

    let pageName = ""

    if (pathname === "/") {
      pageName = language === "ar" ? "الرئيسية" : "Home"
    } else if (pathname === "/about") {
      pageName = language === "ar" ? "من نحن" : "About"
    } else if (pathname === "/services") {
      pageName = language === "ar" ? "الخدمات" : "Services"
    } else if (pathname.startsWith("/services/")) {
      // For individual service pages, we'll use the service name from state if available
      const serviceId = pathname.split("/services/")[1]
      const service = state.services?.find((s: any) => s.id === serviceId)
      if (service) {
        pageName = language === "ar" ? service.titleAr : service.titleEn
      } else {
        pageName = language === "ar" ? "الخدمة" : "Service"
      }
    } else if (pathname === "/blog") {
      pageName = language === "ar" ? "المدونة" : "Blog"
    } else if (pathname.startsWith("/blog/")) {
      pageName = language === "ar" ? "مقالة" : "Article"
    } else if (pathname === "/contact") {
      pageName = language === "ar" ? "اتصل بنا" : "Contact"
    } else if (pathname === "/story") {
      pageName = language === "ar" ? "قصتنا" : "Our Story"
    } else if (pathname.startsWith("/admin")) {
      pageName = language === "ar" ? "لوحة التحكم" : "Admin Dashboard"
    }

    const title = pageName
      ? `${siteName} - ${pageName}`
      : language === "ar"
        ? settings.metaTitleAr || "وريا - حلول التحول الرقمي والتكنولوجيا"
        : settings.metaTitleEn || "Wirya - Digital Transformation & Technology Solutions"

    // Update document title
    if (typeof document !== "undefined") {
      document.title = title
    }

    console.log("[v0] DynamicTitle: Updated page title to:", title)
  }, [mounted, state.siteSettings, state.services, language, pathname])

  return null
}
