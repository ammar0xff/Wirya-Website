"use client"

import type { BlogPost } from "@/lib/blog-loader"
import { useTheme } from "@/lib/theme-provider"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const { language } = useTheme()

  if (posts.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-border/40">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        {language === "ar" ? "مقالات ذات صلة" : "Related Articles"}
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card className="group h-full p-4 border border-border/40 hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex flex-col h-full">
                <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {language === "ar" ? post.titleAr : post.titleEn}
                </h4>
                <p className="text-sm text-foreground/60 mt-2 line-clamp-2 flex-1">
                  {language === "ar" ? post.descriptionAr : post.descriptionEn}
                </p>
                <div className="flex items-center gap-2 mt-4 text-accent group-hover:gap-3 transition-all">
                  <span className="text-xs">{language === "ar" ? "اقرأ المزيد" : "Read More"}</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
