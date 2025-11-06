"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-provider"
import { translations } from "@/lib/i18n"
import { Moon, Sun, Globe, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

function HeaderContent() {
  const { language, theme, toggleTheme, toggleLanguage } = useTheme()
  const t = translations[language]
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const logoSrc = theme === "dark" ? "/wirya-logo-light.png" : "/wirya-logo-dark.png"

  const navigationSections = [
    {
      id: "company",
      title: language === "ar" ? "الشركة" : "Company",
      items: [
        { href: "/about", label: t.nav.about },
        { href: "/story", label: t.nav.story },
        { href: "/team", label: "Team" },
      ],
    },
    {
      id: "services",
      title: t.nav.services,
      items: [
        { href: "/services", label: t.nav.services },
        { href: "/case-studies", label: "Case Studies" },
      ],
    },
    {
      id: "resources",
      title: language === "ar" ? "الموارد" : "Resources",
      items: [
        { href: "/blog", label: t.nav.blog },
        { href: "/faq", label: "FAQ" },
      ],
    },
  ]

  const primaryLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-32 md:w-40 flex items-center justify-center overflow-hidden">
              <img src={logoSrc || "/placeholder.svg"} alt="Wirya" className="h-8 md:h-10 w-auto object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent/50",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-foreground hover:bg-accent/20"
              title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground hover:bg-accent/20">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-foreground hover:bg-accent/20"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={cn(
              "absolute top-[73px] w-full max-w-md bg-background border-b border-border shadow-lg",
              language === "ar" ? "right-0" : "left-0",
            )}
          >
            <nav className="max-h-[calc(100vh-73px)] overflow-y-auto p-6">
              {/* Primary Links */}
              <div className="mb-6">
                <div className="flex flex-col gap-2">
                  {primaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                        pathname === link.href
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent/50",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Expandable Sections */}
              <div className="space-y-4 border-t border-border pt-6">
                {navigationSections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {section.title}
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", expandedSection === section.id && "rotate-180")}
                      />
                    </button>
                    {expandedSection === section.id && (
                      <div className="mt-2 flex flex-col gap-1 pl-4">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "px-4 py-2 text-sm rounded-md transition-colors",
                              pathname === item.href
                                ? "bg-accent/50 text-accent-foreground"
                                : "text-foreground/70 hover:bg-accent/30 hover:text-foreground",
                            )}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
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
