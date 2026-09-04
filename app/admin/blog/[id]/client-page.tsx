"use client"

import type React from "react"
import { useTheme } from "@/lib/theme-provider"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarkdownEditor } from "@/components/admin/markdown-editor"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"
import { Upload } from "lucide-react"

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function ClientBlogPostEditPage() {
  const { language } = useTheme()
  const params = useParams()
  const router = useRouter()
  const { state, manager } = useContentManager()
  const isNew = params.id === "new"

  const post = isNew ? null : state.blogPosts.find((p) => p.id === params.id)

  const [formData, setFormData] = useState({
    titleAr: post?.titleAr || "",
    titleEn: post?.titleEn || "",
    slugAr: post?.slugAr || "",
    slugEn: post?.slugEn || "",
    descriptionAr: post?.descriptionAr || "",
    descriptionEn: post?.descriptionEn || "",
    category: post?.category || state.blogCategories[0]?.id || "",
    author: post?.author || "فريق ويريا",
    date: post?.date || new Date().toISOString().split("T")[0],
    readTime: post?.readTime || 5,
    image: post?.image || "",
    series: post?.series || "",
    contentAr: post?.contentAr || "",
    contentEn: post?.contentEn || "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "titleAr" && !formData.slugAr) {
      setFormData((prev) => ({ ...prev, slugAr: generateSlug(value) }))
    }
    if (name === "titleEn" && !formData.slugEn) {
      setFormData((prev) => ({ ...prev, slugEn: generateSlug(value) }))
    }
  }

  const handleMarkdownChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveStatus(language === "ar" ? "جاري الحفظ..." : "Saving...")

    try {
      const postData = {
        id: isNew ? `post-${Date.now()}` : post!.id,
        ...formData,
        slugAr: formData.slugAr || generateSlug(formData.titleAr),
        slugEn: formData.slugEn || generateSlug(formData.titleEn),
        status: (isNew ? "draft" : (post?.status ?? "draft")) as "draft" | "published" | "archived" | "scheduled",
        tags: post?.tags ?? [],
      }

      if (isNew) {
        manager.addBlogPost(postData as any)
      } else {
        manager.updateBlogPost(postData.id, postData as any)
      }

      const result = await SyncService.syncBlogPosts(
        isNew ? [...state.blogPosts, postData] : state.blogPosts.map((p) => (p.id === postData.id ? postData : p)),
      )

      if (result.success) {
        manager.markSynced()
        setSaveStatus(language === "ar" ? "تم الحفظ بنجاح" : "Saved successfully")
        setTimeout(() => router.push("/admin/blog"), 1500)
      } else {
        setSaveStatus(result.message)
      }
    } catch (error) {
      setSaveStatus(error instanceof Error ? error.message : "Error saving")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <Link href="/admin/blog" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-6">
        <ArrowLeft className="h-4 w-4" />
        {language === "ar" ? "العودة" : "Back"}
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-8">
        {isNew
          ? language === "ar"
            ? "كتابة مقال جديد"
            : "Write New Post"
          : language === "ar"
            ? "تعديل المقال"
            : "Edit Post"}
      </h1>

      <Card className="border border-border/40 bg-card/50 p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "العنوان (العربية)" : "Title (Arabic)"}
              </label>
              <Input
                type="text"
                name="titleAr"
                value={formData.titleAr}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "العنوان (الإنجليزية)" : "Title (English)"}
              </label>
              <Input
                type="text"
                name="titleEn"
                value={formData.titleEn}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "الرابط (العربية)" : "Slug (Arabic)"}
              </label>
              <Input
                type="text"
                name="slugAr"
                value={formData.slugAr}
                onChange={handleChange}
                placeholder={language === "ar" ? "يتم إنشاؤه تلقائياً" : "Auto-generated"}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "الرابط (الإنجليزية)" : "Slug (English)"}
              </label>
              <Input
                type="text"
                name="slugEn"
                value={formData.slugEn}
                onChange={handleChange}
                placeholder={language === "ar" ? "يتم إنشاؤه تلقائياً" : "Auto-generated"}
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "الفئة" : "Category"}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                {state.blogCategories.length === 0 ? (
                  <option value="">{language === "ar" ? "لا توجد فئات" : "No categories"}</option>
                ) : (
                  state.blogCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {language === "ar" ? cat.nameAr : cat.nameEn}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "الكاتب" : "Author"}
              </label>
              <Input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "وقت القراءة (دقائق)" : "Read Time (minutes)"}
              </label>
              <Input
                type="number"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "تاريخ النشر" : "Publication Date"}
              </label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "السلسلة (اختياري)" : "Series (optional)"}
              </label>
              <Input
                type="text"
                name="series"
                value={formData.series}
                onChange={handleChange}
                placeholder={language === "ar" ? "مثال: أساسيات الأمن السيبراني" : "e.g., Security Essentials"}
                className="bg-input border-border"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === "ar" ? "رابط الصورة" : "Image URL"}
            </label>
            <Input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/abstract-colorful-swirls.png"
              className="bg-input border-border"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "الوصف (العربية)" : "Description (Arabic)"}
              </label>
              <textarea
                name="descriptionAr"
                value={formData.descriptionAr}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "ar" ? "الوصف (الإنجليزية)" : "Description (English)"}
              </label>
              <textarea
                name="descriptionEn"
                value={formData.descriptionEn}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === "ar" ? "المحتوى (العربية)" : "Content (Arabic) - Markdown"}
            </label>
            <MarkdownEditor
              value={formData.contentAr}
              onChange={(val) => handleMarkdownChange("contentAr", val)}
              language="ar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === "ar" ? "المحتوى (الإنجليزية)" : "Content (English) - Markdown"}
            </label>
            <MarkdownEditor
              value={formData.contentEn}
              onChange={(val) => handleMarkdownChange("contentEn", val)}
              language="en"
            />
          </div>

          {saveStatus && <div className="p-3 bg-accent/10 text-accent rounded-lg text-sm">{saveStatus}</div>}

          <div className="flex gap-4">
            <Button type="submit" disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
              <Upload className="h-4 w-4" />
              {isSaving ? "Saving..." : language === "ar" ? "حفظ ومزامنة" : "Save & Sync"}
            </Button>
            <Link href="/admin/blog">
              <Button variant="outline">{language === "ar" ? "إلغاء" : "Cancel"}</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
