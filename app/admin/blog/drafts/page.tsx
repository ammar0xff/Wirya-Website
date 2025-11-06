"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Clock, FileText } from "lucide-react"
import { getDraftPosts, deleteDraft, type BlogPostDraft } from "@/lib/blog-loader"
import Link from "next/link"

export default function DraftsPage() {
  const { language } = useTheme()
  const [drafts, setDrafts] = useState<BlogPostDraft[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDrafts(getDraftPosts())
  }, [])

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  const handleDelete = (id: string) => {
    if (confirm(language === "ar" ? "هل تريد حذف هذه المسودة؟" : "Delete this draft?")) {
      deleteDraft(id)
      setDrafts(getDraftPosts())
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US")
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{language === "ar" ? "المسودات" : "Drafts"}</h1>
          <p className="mt-2 text-foreground/60">
            {language === "ar" ? `${drafts.length} مسودة` : `${drafts.length} drafts`}
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="gap-2 bg-accent">
            <Plus className="h-4 w-4" />
            {language === "ar" ? "مسودة جديدة" : "New Draft"}
          </Button>
        </Link>
      </div>

      {drafts.length === 0 ? (
        <Card className="p-12 border border-border/40 text-center">
          <FileText className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
          <p className="text-foreground/60">{language === "ar" ? "لا توجد مسودات حتى الآن" : "No drafts yet"}</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {drafts.map((draft) => (
            <Card key={draft.id} className="border border-border/40 p-6 hover:border-accent/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded font-medium">
                      {language === "ar" ? "مسودة" : "Draft"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{language === "ar" ? draft.titleAr : draft.titleEn}</h3>
                  <p className="mt-2 text-sm text-foreground/60 line-clamp-2">
                    {language === "ar" ? draft.descriptionAr : draft.descriptionEn}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-foreground/50">
                    <span>{draft.author}</span>
                    <span>{formatDate(draft.lastModified)}</span>
                    <span className={draft.status === "autosaved" ? "text-green-600" : ""}>
                      {language === "ar"
                        ? draft.status === "autosaved"
                          ? "محفوظ تلقائياً"
                          : "غير محفوظ"
                        : draft.status === "autosaved"
                          ? "Autosaved"
                          : "Unsaved"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/blog/new?draftId=${draft.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(draft.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
