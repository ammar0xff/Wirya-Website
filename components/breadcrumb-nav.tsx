"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { useTheme } from "@/lib/theme-provider"

interface BreadcrumbItem {
  label: string
  href: string
}

export function BreadcrumbNav() {
  const pathname = usePathname()
  const { language } = useTheme()

  if (pathname === "/" || pathname === "/ar" || pathname === "/en") return null

  const pathSegments = pathname.split("/").filter(Boolean)

  const breadcrumbs: BreadcrumbItem[] = [{ label: language === "ar" ? "الرئيسية" : "Home", href: "/" }]

  let currentPath = ""
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({ label, href: currentPath })
  })

  return (
    <nav className="flex items-center gap-1 text-sm text-foreground/60 mb-6">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center gap-1">
          {index === 0 ? (
            <Link href={item.href} className="hover:text-accent transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
            </Link>
          ) : (
            <Link href={item.href} className="hover:text-accent transition-colors capitalize">
              {item.label}
            </Link>
          )}
          {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4 text-foreground/30" />}
        </div>
      ))}
    </nav>
  )
}
