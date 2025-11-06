"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Globe, FileText, Settings, Plus } from "lucide-react"

interface SEOPage {
  id: string
  url: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  keywordsAr: string[]
  keywordsEn: string[]
  canonicalUrl?: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  lastModified: string
}

export default function SEOManagementPage() {
  const { language } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [pages, setPages] = useState<SEOPage[]>([])
  const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("seo_pages")
    if (saved) {
      setPages(JSON.parse(saved))
    }
  }, [])

  const handleSave = (page: SEOPage) => {
    const updated = pages.some((p) => p.id === page.id)
      ? pages.map((p) => (p.id === page.id ? page : p))
      : [...pages, page]
    setPages(updated)
    localStorage.setItem("seo_pages", JSON.stringify(updated))
    setShowForm(false)
    setSelectedPage(null)
  }

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{language === "ar" ? "إدارة SEO" : "SEO Management"}</h1>
        <p className="mt-2 text-foreground/60">
          {language === "ar" ? "أدارة البيانات الوصفية وتحسين محركات البحث" : "Manage metadata and SEO optimization"}
        </p>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages" className="gap-2">
            <FileText className="h-4 w-4" />
            {language === "ar" ? "الصفحات" : "Pages"}
          </TabsTrigger>
          <TabsTrigger value="keywords" className="gap-2">
            <Search className="h-4 w-4" />
            {language === "ar" ? "الكلمات المفتاحية" : "Keywords"}
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            {language === "ar" ? "الإعدادات" : "Settings"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              {language === "ar" ? "صفحات الموقع" : "Website Pages"}
            </h2>
            <Button
              onClick={() => {
                setSelectedPage(null)
                setShowForm(true)
              }}
              className="gap-2 bg-accent"
            >
              <Plus className="h-4 w-4" />
              {language === "ar" ? "إضافة صفحة" : "Add Page"}
            </Button>
          </div>

          <div className="grid gap-4">
            {pages.map((page) => (
              <Card
                key={page.id}
                className="p-6 border border-border/40 hover:border-accent/50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedPage(page)
                  setShowForm(true)
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Globe className="h-4 w-4 text-accent" />
                      {page.url}
                    </h3>
                    <p className="text-sm text-foreground/60 mt-2 line-clamp-2">
                      {language === "ar" ? page.titleAr : page.titleEn}
                    </p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {(language === "ar" ? page.keywordsAr : page.keywordsEn).slice(0, 3).map((kw, idx) => (
                        <span key={idx} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                          {kw}
                        </span>
                      ))}
                      {(language === "ar" ? page.keywordsAr : page.keywordsEn).length > 3 && (
                        <span className="text-xs text-foreground/40">
                          +{(language === "ar" ? page.keywordsAr : page.keywordsEn).length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {language === "ar" ? "تحرير" : "Edit"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card className="p-6 border border-border/40">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {language === "ar" ? "تحليل الكلمات المفتاحية" : "Keyword Analysis"}
            </h2>
            <div className="space-y-4">
              {pages.map((page) => {
                const keywords = language === "ar" ? page.keywordsAr : page.keywordsEn
                return (
                  <div key={page.id} className="border border-border/20 rounded p-4">
                    <p className="font-medium text-foreground mb-2">{page.url}</p>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((kw, idx) => (
                        <span key={idx} className="text-xs bg-card px-2 py-1 rounded text-foreground/70">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6 border border-border/40">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              {language === "ar" ? "إعدادات SEO العامة" : "General SEO Settings"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "اسم الموقع الافتراضي" : "Default Site Name"}
                </label>
                <Input placeholder="Wirya" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "وصف الموقع الافتراضي" : "Default Site Description"}
                </label>
                <textarea
                  placeholder="Enter your site description"
                  rows={3}
                  className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "صورة Open Graph الافتراضية" : "Default OG Image URL"}
                </label>
                <Input placeholder="https://example.com/og-image.jpg" />
              </div>
              <Button className="bg-accent hover:bg-accent/90">
                {language === "ar" ? "حفظ الإعدادات" : "Save Settings"}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {showForm && (
        <SEOPageForm page={selectedPage || undefined} onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}
    </div>
  )
}

function SEOPageForm({
  page,
  onSave,
  onCancel,
}: {
  page?: SEOPage
  onSave: (page: SEOPage) => void
  onCancel: () => void
}) {
  const { language } = useTheme()
  const [formData, setFormData] = useState<SEOPage>(
    page || {
      id: `page-${Date.now()}`,
      url: "",
      titleAr: "",
      titleEn: "",
      descriptionAr: "",
      descriptionEn: "",
      keywordsAr: [],
      keywordsEn: [],
      lastModified: new Date().toISOString(),
    },
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 border border-border/40">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {page ? (language === "ar" ? "تحرير الصفحة" : "Edit Page") : language === "ar" ? "إضافة صفحة" : "Add Page"}
        </h2>

        <div className="space-y-4 mb-6">
          <Input
            placeholder="URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
          <Input
            placeholder={language === "ar" ? "العنوان (عربي)" : "Title (Arabic)"}
            value={formData.titleAr}
            onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
          />
          <Input
            placeholder="Title (English)"
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
          />
          <textarea
            placeholder={language === "ar" ? "الوصف (عربي)" : "Description (Arabic)"}
            rows={2}
            value={formData.descriptionAr}
            onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
            className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
          />
          <textarea
            placeholder="Description (English)"
            rows={2}
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
          />
          <Input
            placeholder={
              language === "ar" ? "الكلمات المفتاحية العربية (مفصولة بفواصل)" : "Arabic Keywords (comma-separated)"
            }
            value={formData.keywordsAr.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                keywordsAr: e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter((k) => k),
              })
            }
          />
          <Input
            placeholder="English Keywords (comma-separated)"
            value={formData.keywordsEn.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                keywordsEn: e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter((k) => k),
              })
            }
          />
          <Input
            placeholder={language === "ar" ? "رابط Canonical" : "Canonical URL (optional)"}
            value={formData.canonicalUrl || ""}
            onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
          />
          <Input
            placeholder={language === "ar" ? "رابط صورة OG" : "OG Image URL (optional)"}
            value={formData.ogImage || ""}
            onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            {language === "ar" ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={() => onSave(formData)} className="bg-accent hover:bg-accent/90">
            {language === "ar" ? "حفظ" : "Save"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
