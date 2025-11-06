"use client"

import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { FileText, Zap, Mail, MessageSquare, Users, Briefcase, HelpCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { ContentOverview } from "@/components/admin/content-overview"

export default function AdminDashboard() {
  const { language } = useTheme()

  const quickActions = [
    {
      icon: FileText,
      titleAr: "مقال جديد",
      titleEn: "New Post",
      descAr: "اكتب مقال جديد للمدونة",
      descEn: "Write a new blog post",
      href: "/admin/blog/new",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Zap,
      titleAr: "خدمة جديدة",
      titleEn: "New Service",
      descAr: "أضف خدمة جديدة",
      descEn: "Add a new service",
      href: "/admin/services/new",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: MessageSquare,
      titleAr: "رأي جديد",
      titleEn: "New Testimonial",
      descAr: "أضف رأي عميل",
      descEn: "Add client testimonial",
      href: "/admin/testimonials",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      titleAr: "عضو فريق",
      titleEn: "Team Member",
      descAr: "أضف عضو للفريق",
      descEn: "Add team member",
      href: "/admin/team",
      color: "from-orange-500 to-orange-600",
    },
  ]

  const contentSections = [
    {
      icon: FileText,
      titleAr: "المدونة",
      titleEn: "Blog",
      href: "/admin/blog",
      count: "24",
    },
    {
      icon: Zap,
      titleAr: "الخدمات",
      titleEn: "Services",
      href: "/admin/services",
      count: "12",
    },
    {
      icon: Briefcase,
      titleAr: "الأعمال",
      titleEn: "Portfolio",
      href: "/admin/case-studies",
      count: "8",
    },
    {
      icon: Users,
      titleAr: "الفريق",
      titleEn: "Team",
      href: "/admin/team",
      count: "6",
    },
    {
      icon: MessageSquare,
      titleAr: "الآراء",
      titleEn: "Testimonials",
      href: "/admin/testimonials",
      count: "15",
    },
    {
      icon: HelpCircle,
      titleAr: "الأسئلة",
      titleEn: "FAQ",
      href: "/admin/faq",
      count: "10",
    },
    {
      icon: Mail,
      titleAr: "النشرة",
      titleEn: "Newsletter",
      href: "/admin/newsletter",
      count: "142",
    },
    {
      icon: TrendingUp,
      titleAr: "SEO",
      titleEn: "SEO",
      href: "/admin/seo",
      count: "-",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{language === "ar" ? "لوحة التحكم" : "Dashboard"}</h1>
        <p className="text-foreground/60">
          {language === "ar" ? "مرحباً بك في لوحة التحكم" : "Welcome to your admin dashboard"}
        </p>
      </div>

      <div className="mb-8">
        <DashboardStats />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {language === "ar" ? "إجراءات سريعة" : "Quick Actions"}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon
            return (
              <Link key={idx} href={action.href}>
                <Card className="group relative overflow-hidden border border-border/40 bg-card/50 p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 cursor-pointer h-full">
                  <div
                    className={`mb-4 inline-block rounded-lg bg-gradient-to-br ${action.color} p-3 shadow-lg transition-all duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {language === "ar" ? action.titleAr : action.titleEn}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/60">{language === "ar" ? action.descAr : action.descEn}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {language === "ar" ? "نظرة عامة على المحتوى" : "Content Overview"}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contentSections.map((section, idx) => {
            const Icon = section.icon
            return (
              <Link key={idx} href={section.href}>
                <Card className="group border border-border/40 bg-card/50 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-card/80 cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="h-5 w-5 text-accent" />
                    <span className="text-2xl font-bold text-foreground">{section.count}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground/80">
                    {language === "ar" ? section.titleAr : section.titleEn}
                  </h3>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <ContentOverview />
        <RecentActivity />
      </div>
    </div>
  )
}
