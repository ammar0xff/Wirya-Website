"use client"

import { useTheme } from "@/lib/theme-provider"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Upload, AlertCircle, Filter } from "lucide-react"
import Link from "next/link"
import { BLOG_POSTS } from "@/lib/blog-loader"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"

export default function BlogManager() {
  const { language } = useTheme()
  const { state, manager, mounted } = useContentManager()
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published" | "archived">("all")

  useEffect(() => {
    if (state.blogPosts.length === 0) {
      manager.setBlogPosts(BLOG_POSTS)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground/60">{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>
        </div>
      </div>
    )
  }

  const handleDelete = (id: string) => {
    if (confirm(language === "ar" ? "هل تريد حذف هذا المقال؟" : "Delete this post?")) {
      manager.deleteBlogPost(id)
    }
  }

  const handleSync = async () => {
    setIsSyncing(true)
    setSyncStatus(language === "ar" ? "جاري المزامنة..." : "Syncing...")

    try {
      const result = await SyncService.syncBlogPosts(state.blogPosts)

      if (result.success) {
        manager.markSynced()
        setSyncStatus(language === "ar" ? "تم التحديث بنجاح" : "Synced successfully")
        setTimeout(() => setSyncStatus(""), 3000)
      } else {
        setSyncStatus(result.message)
      }
    } catch (error) {
      setSyncStatus(error instanceof Error ? error.message : "Sync failed")
    } finally {
      setIsSyncing(false)
    }
  }

  const filteredPosts =
    statusFilter === "all" ? state.blogPosts : state.blogPosts.filter((post) => post.status === statusFilter)

  const draftCount = state.blogPosts.filter((p) => p.status === "draft").length
  const publishedCount = state.blogPosts.filter((p) => p.status === "published").length

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === "ar" ? "إدارة المقالات" : "Manage Blog Posts"}
          </h1>
          <p className="mt-2 text-foreground/60">
            {language === "ar"
              ? `${publishedCount} منشور • ${draftCount} مسودة`
              : `${publishedCount} published • ${draftCount} drafts`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSync}
            disabled={isSyncing || !state.isDirty}
            className="gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {isSyncing ? "Syncing..." : language === "ar" ? "مزامنة" : "Sync"}
          </Button>
          <Link href="/admin/blog/new">
            <Button className="gap-2 bg-accent hover:bg-accent/90">
              <Plus className="h-4 w-4" />
              {language === "ar" ? "كتابة مقال" : "Write Post"}
            </Button>
          </Link>
        </div>
      </div>

      {state.isDirty && !syncStatus && (
        <Card className="mb-6 border border-orange-500/40 bg-orange-500/10 p-4">
          <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
            <AlertCircle className="h-4 w-4" />
            <p>{language === "ar" ? "لديك تغييرات غير محفوظة" : "You have unsaved changes"}</p>
          </div>
        </Card>
      )}

      {syncStatus && (
        <Card className="mb-6 border border-border/40 bg-accent/10 p-4">
          <p className="text-sm text-foreground">{syncStatus}</p>
        </Card>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {["all", "published", "draft", "archived"].map((status) => (
          <Button
            key={status}
            size="sm"
            variant={statusFilter === status ? "default" : "outline"}
            onClick={() => setStatusFilter(status as any)}
            className="gap-2"
          >
            <Filter className="h-3 w-3" />
            {status === "all" && (language === "ar" ? "الكل" : "All")}
            {status === "published" && (language === "ar" ? "منشور" : "Published")}
            {status === "draft" && (language === "ar" ? "مسودة" : "Draft")}
            {status === "archived" && (language === "ar" ? "مؤرشف" : "Archived")}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="border border-border/40 bg-card/50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded font-medium">
                    {post.category}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      post.status === "published"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : post.status === "draft"
                          ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                          : "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {post.status === "published" && (language === "ar" ? "منشور" : "Published")}
                    {post.status === "draft" && (language === "ar" ? "مسودة" : "Draft")}
                    {post.status === "archived" && (language === "ar" ? "مؤرشف" : "Archived")}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{language === "ar" ? post.titleAr : post.titleEn}</h3>
                <p className="mt-2 text-sm text-foreground/60 line-clamp-2">
                  {language === "ar" ? post.descriptionAr : post.descriptionEn}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-card px-2 py-1 rounded text-foreground/60">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-foreground/40">+{post.tags.length - 3}</span>
                    )}
                  </div>
                )}
                <div className="mt-3 flex items-center gap-4 text-xs text-foreground/50">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/blog/${post.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
