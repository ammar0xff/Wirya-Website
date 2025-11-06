"use client"

import { useTheme } from "@/lib/theme-provider"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Zap,
  FileText,
  Settings,
  Home,
  Mail,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Users,
  Search,
  FileImage,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function AdminSidebar() {
  const { language } = useTheme()
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(["content", "blog", "services"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const menuItems = [
    {
      icon: Home,
      labelAr: "لوحة التحكم",
      labelEn: "Dashboard",
      href: "/admin",
    },
    {
      section: "content",
      icon: LayoutDashboard,
      labelAr: "المحتوى",
      labelEn: "Content",
      children: [
        {
          labelAr: "الصفحات",
          labelEn: "Pages",
          href: "/admin/content/about",
        },
        {
          labelAr: "الفوتر",
          labelEn: "Footer",
          href: "/admin/content/footer",
        },
        {
          labelAr: "إعدادات الموقع",
          labelEn: "Site Settings",
          href: "/admin/content/site-settings",
        },
      ],
    },
    {
      section: "blog",
      icon: FileText,
      labelAr: "المدونة",
      labelEn: "Blog",
      href: "/admin/blog",
    },
    {
      section: "services",
      icon: Zap,
      labelAr: "الخدمات",
      labelEn: "Services",
      href: "/admin/services",
    },
    {
      icon: Briefcase,
      labelAr: "الأعمال",
      labelEn: "Portfolio",
      href: "/admin/case-studies",
    },
    {
      icon: Users,
      labelAr: "الفريق",
      labelEn: "Team",
      href: "/admin/team",
    },
    {
      icon: MessageSquare,
      labelAr: "الآراء",
      labelEn: "Testimonials",
      href: "/admin/testimonials",
    },
    {
      icon: HelpCircle,
      labelAr: "الأسئلة",
      labelEn: "FAQ",
      href: "/admin/faq",
    },
    {
      icon: Mail,
      labelAr: "النشرة",
      labelEn: "Newsletter",
      href: "/admin/newsletter",
    },
    {
      icon: FileImage,
      labelAr: "الوسائط",
      labelEn: "Media",
      href: "/admin/media",
    },
    {
      icon: Search,
      labelAr: "SEO",
      labelEn: "SEO",
      href: "/admin/seo",
    },
    {
      icon: Settings,
      labelAr: "الإعدادات",
      labelEn: "Settings",
      href: "/admin/settings",
    },
  ]

  return (
    <aside className="hidden w-64 border-r border-border/40 bg-card/50 md:flex md:flex-col">
      <div className="border-b border-border/40 p-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg shadow-accent/20">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-foreground">Wirya Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const Icon = item.icon

          // Section with children
          if (item.section && item.children) {
            const isExpanded = expandedSections.includes(item.section)
            const hasActiveChild = item.children.some((child) => pathname.startsWith(child.href))

            return (
              <div key={idx}>
                <button
                  onClick={() => toggleSection(item.section)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                    hasActiveChild
                      ? "bg-accent/10 text-accent"
                      : "text-foreground/60 hover:text-foreground hover:bg-card/50",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {language === "ar" ? item.labelAr : item.labelEn}
                  </div>
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-border/40 pl-4">
                    {item.children.map((child, childIdx) => {
                      const isActive = pathname === child.href || pathname.startsWith(child.href + "/")
                      return (
                        <Link
                          key={childIdx}
                          href={child.href}
                          className={cn(
                            "block rounded-lg px-4 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-accent/10 text-accent font-medium"
                              : "text-foreground/60 hover:text-foreground hover:bg-card/30",
                          )}
                        >
                          {language === "ar" ? child.labelAr : child.labelEn}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          // Regular menu item
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href + "/"))
          return (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-accent/10 text-accent" : "text-foreground/60 hover:text-foreground hover:bg-card/50",
              )}
            >
              <Icon className="h-4 w-4" />
              {language === "ar" ? item.labelAr : item.labelEn}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border/40 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
          {language === "ar" ? "العودة إلى الموقع" : "Back to Website"}
        </Link>
      </div>
    </aside>
  )
}
