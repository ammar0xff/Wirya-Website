"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-provider"
import { translations } from "@/lib/i18n"
import { Moon, Sun, Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

function HeaderContent() {
  const { language, theme, toggleTheme, toggleLanguage } = useTheme()
  const t = translations[language]
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const logoSrc = theme === "dark" ? "/wirya-logo-light.png" : "/wirya-logo-dark.png"

  const navigationItems = {
    company: [
      { href: "/about", label: t.nav.about },
      { href: "/story", label: t.nav.story },
      { href: "/team", label: t.nav.team || "Team" },
    ],
    services: [
      { href: "/services", label: t.nav.services },
      { href: "/case-studies", label: "Case Studies" },
    ],
    resources: [
      { href: "/blog", label: t.nav.blog },
      { href: "/faq", label: "FAQ" },
    ],
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-36 md:w-44 flex items-center justify-center overflow-hidden">
            <img src={logoSrc || "/placeholder.svg"} alt="Wirya" className="h-10 md:h-12 w-auto" />
          </div>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Company Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm text-foreground/80 hover:text-accent">
                {language === "ar" ? "الشركة" : "Company"}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {navigationItems.company.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === item.href && "bg-accent/50",
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{item.label}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Services Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm text-foreground/80 hover:text-accent">
                {t.nav.services}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {navigationItems.services.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === item.href && "bg-accent/50",
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{item.label}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Resources Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm text-foreground/80 hover:text-accent">
                {language === "ar" ? "الموارد" : "Resources"}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {navigationItems.resources.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === item.href && "bg-accent/50",
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{item.label}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Contact Link */}
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    pathname === "/contact" && "bg-accent/50",
                  )}
                >
                  {t.nav.contact}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent/20">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={language === "ar" ? "right" : "left"} className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>{language === "ar" ? "القائمة" : "Menu"}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-6">
                {/* Company Section */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                    {language === "ar" ? "الشركة" : "Company"}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {navigationItems.company.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href && "bg-accent text-accent-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Services Section */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{t.nav.services}</h3>
                  <div className="flex flex-col gap-2">
                    {navigationItems.services.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href && "bg-accent text-accent-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Resources Section */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                    {language === "ar" ? "الموارد" : "Resources"}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {navigationItems.resources.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href && "bg-accent text-accent-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block rounded-md bg-accent px-4 py-3 text-center text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/80",
                      pathname === "/contact" && "bg-accent/80",
                    )}
                  >
                    {t.nav.contact}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

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
