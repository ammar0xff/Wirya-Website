"use client"

import Link from "next/link"
import { useTheme } from "@/lib/theme-provider"
import { translations } from "@/lib/i18n"
import { Home, Briefcase, Users, Settings, Newspaper } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export function MobileNav() {
  const [isHydrated, setIsHydrated] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated ? <MobileNavContent pathname={pathname} /> : null
}

function MobileNavContent({ pathname }: { pathname: string }) {
  const { language } = useTheme()
  const t = translations[language]

  const navItems = [
    { href: "/", icon: Home, label: t.nav.home },
    { href: "/services", icon: Briefcase, label: t.nav.services },
    { href: "/blog", icon: Newspaper, label: t.nav.blog },
    { href: "/about", icon: Users, label: t.nav.about },
    { href: "/settings", icon: Settings, label: t.nav.settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-3 text-xs transition-colors ${
              pathname === href ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px]">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
