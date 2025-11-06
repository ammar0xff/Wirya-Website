"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Trash2, Clock, CheckCircle } from "lucide-react"
import { getScheduledPosts, type BlogPostSchedule, getBlogPostById, POST_SCHEDULES } from "@/lib/blog-loader"

export default function ScheduledPage() {
  const { language } = useTheme()
  const [schedules, setSchedules] = useState<BlogPostSchedule[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSchedules(getScheduledPosts())
  }, [])

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  const handleCancel = (postId: string) => {
    if (confirm(language === "ar" ? "هل تريد إلغاء الجدولة؟" : "Cancel scheduling?")) {
      const index = POST_SCHEDULES.findIndex((s) => s.postId === postId && s.status === "scheduled")
      if (index >= 0) {
        POST_SCHEDULES[index].status = "cancelled"
        setSchedules(getScheduledPosts())
      }
    }
  }

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString(language === "ar" ? "ar-SA" : "en-US")
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          {language === "ar" ? "المنشورات المجدولة" : "Scheduled Posts"}
        </h1>
        <p className="mt-2 text-foreground/60">
          {language === "ar" ? `${schedules.length} منشور مجدول` : `${schedules.length} scheduled posts`}
        </p>
      </div>

      {schedules.length === 0 ? (
        <Card className="p-12 border border-border/40 text-center">
          <Calendar className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
          <p className="text-foreground/60">{language === "ar" ? "لا توجد منشورات مجدولة" : "No scheduled posts"}</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {schedules.map((schedule) => {
            const post = getBlogPostById(schedule.postId)
            if (!post) return null

            const isUpcoming = new Date(schedule.scheduledDate) > new Date()
            return (
              <Card
                key={schedule.postId}
                className="border border-border/40 p-6 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {isUpcoming ? (
                        <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${
                          isUpcoming
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "bg-green-500/10 text-green-600 dark:text-green-400"
                        }`}
                      >
                        {language === "ar"
                          ? isUpcoming
                            ? "قادم قريباً"
                            : "تم النشر"
                          : isUpcoming
                            ? "Upcoming"
                            : "Published"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground">{language === "ar" ? post.titleAr : post.titleEn}</h3>
                    <div className="mt-3 flex items-center gap-4 text-xs text-foreground/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDateTime(schedule.scheduledDate)}
                      </span>
                    </div>
                  </div>
                  {isUpcoming && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(schedule.postId)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
