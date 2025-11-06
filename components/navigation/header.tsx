"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-provider"
import { translations } from "@/lib/i18n"
import { Moon, Sun, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

function HeaderContent() {
  const { language, theme, toggleTheme, toggleLanguage } = useTheme()
  const t = translations[language]

  const logoSrc = theme === "dark" ? "/wirya-logo-light.png" : "/wirya-logo-dark.png"

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-36 md:w-44 flex items-center justify-center overflow-hidden">
            <img src={logoSrc || "/placeholder.svg"} alt="Wirya" className="h-10 md:h-12 w-auto" />
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/services" className="text-sm text-foreground/80 hover:text-accent transition-colors">
            {t.nav.services}
          </Link>
          <Link href="/about" className="text-sm text-foreground/80 hover:text-accent transition-colors">
            {t.nav.about}
          </Link>
          <Link href="/story" className="text-sm text-foreground/80 hover:text-accent transition-colors">
            {t.nav.story}
          </Link>
          <Link href="/blog" className="text-sm text-foreground/80 hover:text-accent transition-colors">
            {t.nav.blog}
          </Link>
          <Link href="/contact" className="text-sm text-foreground/80 hover:text-accent transition-colors">
            {t.nav.contact}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="text-foreground hover:bg-accent/20"
            title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
          >
            <Globe className="h-5 w-5" />
            <span className="ml-1 text-xs font-semibold">{language === "ar" ? "EN" : "AR"}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground hover:bg-accent/20">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}

export function Header() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return null
  }

  return <HeaderContent />
}
