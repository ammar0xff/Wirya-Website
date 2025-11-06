"use client"

import type React from "react"

import { useTheme } from "@/lib/theme-provider"
import { useContentManager } from "@/hooks/use-content-manager"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { FileText, Zap, MessageSquare, Mail, TrendingUp } from "lucide-react"

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number | string
  trend?: number
  color?: "accent" | "green" | "blue" | "purple"
}

function StatCard({ icon, label, value, trend, color = "accent" }: StatCardProps) {
  const colorClasses = {
    accent: "bg-accent/10 text-accent",
    green: "bg-green-500/10 text-green-600 dark:text-green-400",
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  }

  return (
    <Card className="border border-border/40 bg-card/50 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-foreground/60 mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend !== undefined && (
              <div
                className={`flex items-center gap-1 text-xs font-medium ${trend >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                <TrendingUp className="h-3 w-3" />
                {trend}%
              </div>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
      </div>
    </Card>
  )
}

export function DashboardStats() {
  const { language } = useTheme()
  const { state } = useContentManager()
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalServices: 0,
    totalTestimonials: 0,
    totalSubscribers: 0,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Calculate stats from state
    const posts = state.blogPosts?.length || 0
    const services = state.services?.length || 0

    const testimonials = localStorage.getItem("testimonials_data")
    const testimonialCount = testimonials ? JSON.parse(testimonials).length : 0

    const newsletter = localStorage.getItem("newsletter_settings")
    const subscriberCount = newsletter
      ? JSON.parse(newsletter).subscriptions?.filter((s: any) => s.status === "active").length || 0
      : 0

    setStats({
      totalPosts: posts,
      totalServices: services,
      totalTestimonials: testimonialCount,
      totalSubscribers: subscriberCount,
    })
  }, [mounted, state])

  if (!mounted) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={<FileText className="h-5 w-5" />}
        label={language === "ar" ? "إجمالي المقالات" : "Total Posts"}
        value={stats.totalPosts}
        color="blue"
      />
      <StatCard
        icon={<Zap className="h-5 w-5" />}
        label={language === "ar" ? "إجمالي الخدمات" : "Total Services"}
        value={stats.totalServices}
        color="accent"
      />
      <StatCard
        icon={<MessageSquare className="h-5 w-5" />}
        label={language === "ar" ? "الآراء والتقييمات" : "Testimonials"}
        value={stats.totalTestimonials}
        color="green"
      />
      <StatCard
        icon={<Mail className="h-5 w-5" />}
        label={language === "ar" ? "المشتركون" : "Subscribers"}
        value={stats.totalSubscribers}
        color="purple"
      />
    </div>
  )
}
