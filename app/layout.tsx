import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { Cairo, Exo_2 } from "next/font/google"
import { DynamicFavicon } from "@/components/dynamic-favicon"
import { DynamicTitle } from "@/components/dynamic-title"
import { siteSettings } from "@/lib/site-content"

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
})

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo2",
})

export const metadata: Metadata = {
  title: siteSettings.metaTitleEn || "Wirya - Digital Transformation & Technology Solutions",
  description:
    siteSettings.metaDescEn || "Wirya offers innovative digital transformation and technology solutions for businesses",
  generator: "v0.app",
  icons: {
    icon: siteSettings.favicon || "/favicon.ico",
    shortcut: siteSettings.favicon || "/favicon.ico",
    apple: siteSettings.favicon?.endsWith(".png") ? siteSettings.favicon : "/apple-touch-icon.png",
  },
  verification: {
    google: "dqyL3FwUnUnSdMa8I1oyGQq1Xset112ksmpIAJHzYGg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${exo2.variable}`}>
      <head>
        <style>{`
          :root {
            --font-cairo: ${cairo.style.fontFamily};
            --font-exo2: ${exo2.style.fontFamily};
          }
        `}</style>
      </head>
      <body className={`antialiased`}>
        <ThemeProvider>
          <DynamicFavicon />
          <DynamicTitle />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
