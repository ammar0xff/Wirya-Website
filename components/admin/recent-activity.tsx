"use client"

import { useTheme } from "@/lib/theme-provider"
import { useContentManager } from "@/hooks/use-content-manager"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"

interface Activity {
  id: string
  type: "post" | "service" | "testimonial" | "subscriber"
  action: "created" | "updated" | "deleted"
  title: string
  timestamp: string
}

export function RecentActivity() {
  const { language } = useTheme()
  const { state } = useContentManager()
  const [mounted, setMounted] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !state.blogPosts) return

    // Generate recent activities from blog posts
    const recentActivities: Activity[] = state.blogPosts.slice(0, 5).map((post) => ({
      id: post.id,
      type: "post" as const,
      action: "created" as const,
      title: language === "ar" ? post.titleAr : post.titleEn,
      timestamp: new Date(post.date).toLocaleDateString(language === "ar" ? "ar" : "en"),
    }))

    setActivities(recentActivities)
  }, [mounted, state.blogPosts, language])

  const getActivityIcon = (type: Activity["type"], action: Activity["action"]) => {
    if (action === "created") return <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
    if (action === "updated") return <Edit2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
    return <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
  }

  const getActivityLabel = (type: Activity["type"], action: Activity["action"]) => {
    const labels: Record<Activity["type"], Record<Activity["action"], { ar: string; en: string }>> = {
      post: {
        created: { ar: "مقالة جديدة", en: "New post" },
        updated: { ar: "تحديث مقالة", en: "Post updated" },
        deleted: { ar: "حذف مقالة", en: "Post deleted" },
      },
      service: {
        created: { ar: "خدمة جديدة", en: "New service" },
        updated: { ar: "تحديث خدمة", en: "Service updated" },
        deleted: { ar: "حذف خدمة", en: "Service deleted" },
      },
      testimonial: {
        created: { ar: "رأي جديد", en: "New testimonial" },
        updated: { ar: "تحديث رأي", en: "Testimonial updated" },
        deleted: { ar: "حذف رأي", en: "Testimonial deleted" },
      },
      subscriber: {
        created: { ar: "مشترك جديد", en: "New subscriber" },
        updated: { ar: "تحديث مشترك", en: "Subscriber updated" },
        deleted: { ar: "حذف مشترك", en: "Subscriber deleted" },
      },
    }

    const label = labels[type][action]
    return language === "ar" ? label.ar : label.en
  }

  if (!mounted) return null

  return (
    <Card className="border border-border/40 bg-card/50 p-6 col-span-full lg:col-span-2">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        {language === "ar" ? "النشاط الأخير" : "Recent Activity"}
      </h2>

      <div className="space-y-3">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 pb-3 border-b border-border/20 last:border-0">
              <div className="p-2 rounded-lg bg-card/50">{getActivityIcon(activity.type, activity.action)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {getActivityLabel(activity.type, activity.action)}
                </p>
                <p className="text-xs text-foreground/60 truncate">{activity.title}</p>
              </div>
              <span className="text-xs text-foreground/50 whitespace-nowrap">{activity.timestamp}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-foreground/60 text-center py-4">
            {language === "ar" ? "لا توجد أنشطة حالياً" : "No recent activity"}
          </p>
        )}
      </div>
    </Card>
  )
}
