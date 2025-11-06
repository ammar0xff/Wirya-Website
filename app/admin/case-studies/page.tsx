"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { type CaseStudy, caseStudiesData as defaultData } from "@/lib/site-content"

export default function CaseStudiesManager() {
  const { language } = useTheme()
  const [studies, setStudies] = useState<CaseStudy[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const [formData, setFormData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    contentAr: "",
    contentEn: "",
    imageUrl: "",
    category: "",
    client: "",
  })

  useEffect(() => {
    setMounted(true)
    setStudies(defaultData.studies)
  }, [])

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  const handleAddStudy = () => {
    if (editingId) {
      setStudies(studies.map((s) => (s.id === editingId ? { ...s, ...formData } : s)))
      setEditingId(null)
    } else {
      const newStudy: CaseStudy = {
        id: `case-${Date.now()}`,
        ...formData,
        results: [],
        tags: [],
        featured: false,
        createdAt: new Date().toISOString(),
      }
      setStudies([...studies, newStudy])
    }
    setFormData({
      titleAr: "",
      titleEn: "",
      descriptionAr: "",
      descriptionEn: "",
      contentAr: "",
      contentEn: "",
      imageUrl: "",
      category: "",
      client: "",
    })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    if (confirm(language === "ar" ? "هل تريد حذف هذه الدراسة؟" : "Delete this case study?")) {
      setStudies(studies.filter((s) => s.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === "ar" ? "إدارة دراسات الحالة" : "Manage Case Studies"}
          </h1>
          <p className="mt-2 text-foreground/60">
            {language === "ar" ? `${studies.length} دراسة حالة` : `${studies.length} case studies`}
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2 bg-accent">
          <Plus className="h-4 w-4" />
          {language === "ar" ? "إضافة دراسة" : "Add Study"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 p-6 border border-border/40">
          <div className="space-y-4">
            <input
              type="text"
              placeholder={language === "ar" ? "العنوان (عربي)" : "Title (Arabic)"}
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <input
              type="text"
              placeholder={language === "ar" ? "العنوان (إنجليزي)" : "Title (English)"}
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <input
              type="text"
              placeholder={language === "ar" ? "اسم العميل" : "Client Name"}
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <input
              type="text"
              placeholder={language === "ar" ? "التصنيف" : "Category"}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddStudy}>{language === "ar" ? "حفظ" : "Save"}</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                {language === "ar" ? "إلغاء" : "Cancel"}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {studies.map((study) => (
          <Card key={study.id} className="p-4 border border-border/40">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{language === "ar" ? study.titleAr : study.titleEn}</h3>
                <p className="text-sm text-foreground/60 mt-1">
                  {language === "ar" ? `العميل: ${study.client}` : `Client: ${study.client}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(study.id)
                    setShowForm(true)
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(study.id)} className="text-destructive">
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
