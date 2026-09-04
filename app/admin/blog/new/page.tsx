"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Calendar, Eye } from "lucide-react"
import {
  getDraftPosts,
  saveDraft,
  schedulePost,
  type BlogPostDraft,
  type BlogPost,
  BLOG_POSTS,
} from "@/lib/blog-loader"

export default function NewBlogPostPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const draftId = searchParams.get("draftId")
  const { language } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")

  const [formData, setFormData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    contentAr: "",
    contentEn: "",
    image: "",
    author: "",
    category: "",
    tags: "",
  })

  useEffect(() => {
    setMounted(true)
    if (draftId) {
      const drafts = getDraftPosts()
      const draft = drafts.find((d) => d.id === draftId)
      if (draft) {
        setFormData({
          titleAr: draft.titleAr,
          titleEn: draft.titleEn,
          descriptionAr: draft.descriptionAr,
          descriptionEn: draft.descriptionEn,
          contentAr: draft.contentAr,
          contentEn: draft.contentEn,
          image: draft.imageUrl || "",
          author: draft.author,
          category: draft.category,
          tags: draft.tags.join(", "),
        })
      }
    }
  }, [draftId])

  const handleSaveDraft = useCallback(async () => {
    setIsSaving(true)
    try {
      const draft: BlogPostDraft = {
        id: draftId || `draft-${Date.now()}`,
        titleAr: formData.titleAr,
        titleEn: formData.titleEn,
        descriptionAr: formData.descriptionAr,
        descriptionEn: formData.descriptionEn,
        contentAr: formData.contentAr,
        contentEn: formData.contentEn,
        imageUrl: formData.image,
        author: formData.author,
        category: formData.category,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        status: "autosaved",
        lastModified: new Date().toISOString(),
      }
      saveDraft(draft)
      alert(language === "ar" ? "تم حفظ المسودة بنجاح" : "Draft saved successfully")
    } finally {
      setIsSaving(false)
    }
  }, [formData, draftId, language])

  const handlePublish = () => {
    if (!formData.titleAr || !formData.titleEn) {
      alert(language === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields")
      return
    }

    if (showSchedule && scheduledDate) {
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        slugAr: formData.titleAr.toLowerCase().replace(/\s+/g, "-"),
        slugEn: formData.titleEn.toLowerCase().replace(/\s+/g, "-"),
        status: "published",
        date: new Date().toISOString(),
        readTime: Math.ceil((formData.contentEn.split(" ").length || 0) / 200),
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
      } as BlogPost

      BLOG_POSTS.push(newPost)
      schedulePost(newPost.id, scheduledDate)
      alert(language === "ar" ? "تم جدولة المقال للنشر" : "Post scheduled for publishing")
      router.push("/admin/blog/scheduled")
    } else {
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        slugAr: formData.titleAr.toLowerCase().replace(/\s+/g, "-"),
        slugEn: formData.titleEn.toLowerCase().replace(/\s+/g, "-"),
        status: "published",
        date: new Date().toISOString(),
        readTime: Math.ceil((formData.contentEn.split(" ").length || 0) / 200),
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
      } as BlogPost

      BLOG_POSTS.push(newPost)
      alert(language === "ar" ? "تم نشر المقال بنجاح" : "Post published successfully")
      router.push("/admin/blog")
    }
  }

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          {draftId
            ? language === "ar"
              ? "تحرير المسودة"
              : "Edit Draft"
            : language === "ar"
              ? "كتابة مقال جديد"
              : "Write New Post"}
        </h1>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">{language === "ar" ? "المحتوى" : "Content"}</TabsTrigger>
          <TabsTrigger value="settings">{language === "ar" ? "الإعدادات" : "Settings"}</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card className="p-6 border border-border/40">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              {language === "ar" ? "محتوى المقال بالعربية" : "Arabic Content"}
            </h2>
            <div className="space-y-4">
              <Input
                placeholder={language === "ar" ? "العنوان بالعربية" : "Title in Arabic"}
                value={formData.titleAr}
                onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              />
              <Input
                placeholder={language === "ar" ? "الوصف بالعربية" : "Description in Arabic"}
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              />
              <textarea
                placeholder={language === "ar" ? "المحتوى بالعربية" : "Content in Arabic"}
                value={formData.contentAr}
                onChange={(e) => setFormData({ ...formData, contentAr: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
              />
            </div>
          </Card>

          <Card className="p-6 border border-border/40">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              {language === "ar" ? "محتوى المقال بالإنجليزية" : "English Content"}
            </h2>
            <div className="space-y-4">
              <Input
                placeholder="Title in English"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              />
              <Input
                placeholder="Description in English"
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              />
              <textarea
                placeholder="Content in English"
                value={formData.contentEn}
                onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6 border border-border/40">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              {language === "ar" ? "إعدادات المقال" : "Post Settings"}
            </h2>
            <div className="space-y-4">
              <Input
                placeholder={language === "ar" ? "المؤلف" : "Author"}
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
              <Input
                placeholder={language === "ar" ? "التصنيف" : "Category"}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
              <Input
                placeholder={language === "ar" ? "الوسوم (مفصولة بفواصل)" : "Tags (comma-separated)"}
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <Input
                placeholder={language === "ar" ? "رابط الصورة" : "Image URL"}
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-0 mt-8 p-4 bg-background/95 border-t border-border/40 flex gap-2">
        <Button onClick={handleSaveDraft} disabled={isSaving} variant="outline" className="gap-2 bg-transparent">
          <Save className="h-4 w-4" />
          {language === "ar" ? "حفظ المسودة" : "Save Draft"}
        </Button>
        <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          {language === "ar" ? "جدولة" : "Schedule"}
        </Button>
        <Button onClick={handlePublish} className="gap-2 bg-accent hover:bg-accent/90 ml-auto">
          <Eye className="h-4 w-4" />
          {language === "ar" ? "نشر الآن" : "Publish Now"}
        </Button>
      </div>

      {showSchedule && (
        <Card className="mt-4 p-4 border border-border/40">
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === "ar" ? "تاريخ ووقت النشر" : "Publish Date & Time"}
          </label>
          <input
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
          />
        </Card>
      )}
    </div>
  )
}
