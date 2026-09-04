"use client"

import { useTheme } from "@/lib/theme-provider"
import { useContentManager } from "@/hooks/use-content-manager"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function ContentOverview() {
  const { language } = useTheme()
  const { state } = useContentManager()
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !state.blogPosts) return

    // Group posts by category for chart
    const categoryCount: Record<string, number> = {}
    state.blogPosts.forEach((post) => {
      const category = post.category || "Uncategorized"
      categoryCount[category] = (categoryCount[category] || 0) + 1
    })

    const chartData = Object.entries(categoryCount).map(([category, count]) => ({
      name: category,
      posts: count,
    }))

    setData(chartData)
  }, [mounted, state.blogPosts])

  if (!mounted || data.length === 0) return null

  return (
    <Card className="border border-border/40 bg-card/50 p-6 col-span-full lg:col-span-2">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        {language === "ar" ? "نظرة عامة على المحتوى" : "Content Overview"}
      </h2>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.2} />
            <XAxis dataKey="name" stroke="var(--color-foreground)" opacity={0.6} />
            <YAxis stroke="var(--color-foreground)" opacity={0.6} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="posts" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
