"use client"
import Link from "next/link"
import { useTheme } from "@/lib/theme-provider"
import { FadeIn } from "@/components/animations/fade-in"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ChevronLeft, Tag } from "lucide-react"
import Image from "next/image"
import type { BlogPost } from "@/lib/blog-loader"

interface BlogPostPageClientProps {
  post: BlogPost | null
  params: { id: string }
}

export function BlogPostPageClient({ post, params }: BlogPostPageClientProps) {
  const { language } = useTheme()
  const t = translations[language]

  if (!post) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-foreground/50">{language === "ar" ? "المقالة غير موجودة" : "Article not found"}</p>
      </div>
    )
  }

  const content = language === "ar" ? post.contentAr : post.contentEn

  return (
    <article className="px-4 py-12">
      <FadeIn>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
            {post.series && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {language === "ar" ? "سلسلة:" : "Series:"} {post.series}
              </span>
            )}
          </div>

          <h1 className="mb-6 text-4xl font-bold text-foreground text-balance">
            {language === "ar" ? post.titleAr : post.titleEn}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-6 border-b border-border/40 pb-8 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US")}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime} {language === "ar" ? "دقيقة قراءة" : "min read"}
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
          </div>

          {post.image && (
            <div className="relative mb-8 h-96 w-full overflow-hidden rounded-xl border border-border/40">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={language === "ar" ? post.titleAr : post.titleEn}
                fill
                className="object-cover"
              />
            </div>
          )}

          <MarkdownRenderer content={content} />

          <div className="mt-12 pt-8 border-t border-border/40">
            <Link href="/blog">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
                {language === "ar" ? "العودة للمدونة" : "Back to Blog"}
              </Button>
            </Link>
          </div>
        </div>
      </FadeIn>
    </article>
  )
}
