"use client"

import { useEffect } from "react"
import { useContentManager } from "@/hooks/use-content-manager"
import { siteSettings as defaultSiteSettings } from "@/lib/site-content"

export function DynamicFavicon() {
  const { state } = useContentManager()

  useEffect(() => {
    // Get favicon URL from settings or use default
    const faviconUrl = state.siteSettings?.favicon || defaultSiteSettings.favicon || "/favicon.ico"

    // Update all favicon link tags
    const updateFavicon = (url: string) => {
      // Remove existing favicon links
      const existingLinks = document.querySelectorAll('link[rel*="icon"]')
      existingLinks.forEach((link) => link.remove())

      // Add new favicon link
      const link = document.createElement("link")
      link.rel = "icon"
      link.href = url
      document.head.appendChild(link)

      // Add shortcut icon
      const shortcutLink = document.createElement("link")
      shortcutLink.rel = "shortcut icon"
      shortcutLink.href = url
      document.head.appendChild(shortcutLink)

      // Add apple touch icon if it's a PNG
      if (url.endsWith(".png")) {
        const appleLink = document.createElement("link")
        appleLink.rel = "apple-touch-icon"
        appleLink.href = url
        document.head.appendChild(appleLink)
      }
    }

    updateFavicon(faviconUrl)
  }, [state.siteSettings?.favicon])

  return null
}
