"use client"

import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { FileText, Settings, Zap, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { ContentOverview } from "@/components/admin/content-overview"

export default function AdminDashboard() {
  const { language } = useTheme()

  const menuItems = [
    {
      icon: Zap,
      titleAr: "إدارة الخدمات",
      titleEn: "Manage Services",
      descAr: "أضف وعدل وحذف الخدمات",
      descEn: "Add, edit, and delete services",
      href: "/admin/services",
    },
    {
      icon: FileText,
      titleAr: "إدارة المقالات",
      titleEn: "Manage Blog Posts",
      descAr: "اكتب وعدل مقالات المدونة",
      descEn: "Write and edit blog posts",
      href: "/admin/blog",
    },
    {
      icon: MessageSquare,
      titleAr: "إدارة الآراء",
      titleEn: "Manage Testimonials",
      descAr: "إضافة وتعديل آراء العملاء",
      descEn: "Add and manage testimonials",
      href: "/admin/testimonials",
    },
    {
      icon: Mail,
      titleAr: "إدارة النشرة",
      titleEn: "Manage Newsletter",
      descAr: "إدارة المشتركين والبريد",
      descEn: "Manage subscribers and emails",
      href: "/admin/newsletter",
    },
    {
      icon: Settings,
      titleAr: "الإعدادات",
      titleEn: "Settings",
      descAr: "إعدادات الموقع والعامة",
      descEn: "Website and general settings",
      href: "/admin/settings",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{language === "ar" ? "لوحة التحكم" : "Admin Dashboard"}</h1>
        <p className="mt-2 text-foreground/60">
          {language === "ar" ? "إدارة محتوى موقعك الإلكتروني" : "Manage your website content"}
        </p>
      </div>

      <div className="mb-8">
        <DashboardStats />
      </div>

      <div className="grid gap-6 mb-8 lg:grid-cols-4">
        <ContentOverview />
        <RecentActivity />
      </div>

      {/* Quick actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {menuItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <Link key={idx} href={item.href}>
              <Card className="group relative overflow-hidden border border-border/40 bg-card/50 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/10 cursor-pointer h-full">
                <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">{language === "ar" ? item.titleAr : item.titleEn}</h3>
                <p className="mt-2 text-sm text-foreground/60">{language === "ar" ? item.descAr : item.descEn}</p>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
