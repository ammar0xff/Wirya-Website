"use client"

import { useTheme } from "@/lib/theme-provider"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Zap,
  FileText,
  Settings,
  Home,
  Layers,
  Mail,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Users,
  Search,
  Clock,
  Inbox,
  FilterIcon as FooterIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const { language } = useTheme()
  const pathname = usePathname()

  const menuItems = [
    {
      icon: Home,
      labelAr: "الرئيسية",
      labelEn: "Dashboard",
      href: "/admin",
    },
    {
      icon: FileText,
      labelAr: "المقالات",
      labelEn: "Blog Posts",
      href: "/admin/blog",
    },
    {
      icon: Inbox,
      labelAr: "المسودات",
      labelEn: "Drafts",
      href: "/admin/blog/drafts",
    },
    {
      icon: Clock,
      labelAr: "المجدولة",
      labelEn: "Scheduled",
      href: "/admin/blog/scheduled",
    },
    {
      icon: Zap,
      labelAr: "الخدمات",
      labelEn: "Services",
      href: "/admin/services",
    },
    {
      icon: Layers,
      labelAr: "الفئات",
      labelEn: "Categories",
      href: "/admin/categories",
    },
    {
      icon: MessageSquare,
      labelAr: "الآراء",
      labelEn: "Testimonials",
      href: "/admin/testimonials",
    },
    {
      icon: HelpCircle,
      labelAr: "الأسئلة الشائعة",
      labelEn: "FAQ",
      href: "/admin/faq",
    },
    {
      icon: Briefcase,
      labelAr: "دراسات الحالة",
      labelEn: "Case Studies",
      href: "/admin/case-studies",
    },
    {
      icon: Users,
      labelAr: "الفريق",
      labelEn: "Team",
      href: "/admin/team",
    },
    {
      icon: Search,
      labelAr: "SEO",
      labelEn: "SEO",
      href: "/admin/seo",
    },
    {
      icon: Mail,
      labelAr: "النشرة البريدية",
      labelEn: "Newsletter",
      href: "/admin/newsletter",
    },
    {
      icon: FooterIcon,
      labelAr: "الفوتر",
      labelEn: "Footer",
      href: "/admin/content/footer",
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
          <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <span className="font-semibold text-foreground">Wirya Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
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
        <Link href="/" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
          {language === "ar" ? "العودة إلى الموقع" : "Back to Website"}
        </Link>
      </div>
    </aside>
  )
}
