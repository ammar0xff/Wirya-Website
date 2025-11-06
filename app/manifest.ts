import type { MetadataRoute } from "next"
import { siteSettings } from "@/lib/site-content"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSettings.siteName || "Wirya",
    short_name: siteSettings.siteName || "Wirya",
    description: siteSettings.metaDescEn || "Digital Transformation & Technology Solutions",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: siteSettings.favicon || "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
