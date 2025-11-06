"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { useContentManager } from "@/hooks/use-content-manager"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Filter } from "lucide-react"
import { faqData as defaultFaqData, type FAQ } from "@/lib/site-content"

export default function FAQManager() {
  const { language } = useTheme()
  const { state, manager, mounted } = useContentManager()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")

  const [formData, setFormData] = useState({
    questionAr: "",
    questionEn: "",
    answerAr: "",
    answerEn: "",
    category: "general",
  })

  useEffect(() => {
    if (mounted) {
      setFaqs(state.faqs || defaultFaqData.faqs)
    }
  }, [mounted, state.faqs])

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  const filteredFaqs = statusFilter === "all" ? faqs : faqs.filter((faq) => faq.status === statusFilter)

  const handleAddFAQ = () => {
    if (editingId) {
      setFaqs(faqs.map((faq) => (faq.id === editingId ? { ...faq, ...formData } : faq)))
      setEditingId(null)
    } else {
      const newFAQ: FAQ = {
        id: `faq-${Date.now()}`,
        ...formData,
        status: "active",
        order: faqs.length + 1,
      }
      setFaqs([...faqs, newFAQ])
    }

    setFormData({
      questionAr: "",
      questionEn: "",
      answerAr: "",
      answerEn: "",
      category: "general",
    })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    if (confirm(language === "ar" ? "هل تريد حذف هذا السؤال؟" : "Delete this FAQ?")) {
      setFaqs(faqs.filter((faq) => faq.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === "ar" ? "إدارة الأسئلة الشائعة" : "Manage FAQs"}
          </h1>
          <p className="mt-2 text-foreground/60">
            {language === "ar" ? `${faqs.length} سؤال شائع` : `${faqs.length} FAQs`}
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2 bg-accent hover:bg-accent/90">
          <Plus className="h-4 w-4" />
          {language === "ar" ? "إضافة سؤال" : "Add FAQ"}
        </Button>
      </div>

      <div className="mb-6 flex gap-2">
        {["all", "active", "inactive"].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? "default" : "outline"}
            onClick={() => setStatusFilter(status as any)}
            size="sm"
            className="gap-2"
          >
            <Filter className="h-3 w-3" />
            {status === "all" && (language === "ar" ? "الكل" : "All")}
            {status === "active" && (language === "ar" ? "مفعّل" : "Active")}
            {status === "inactive" && (language === "ar" ? "معطّل" : "Inactive")}
          </Button>
        ))}
      </div>

      {showForm && (
        <Card className="mb-6 p-6 border border-border/40">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            {language === "ar" ? "إضافة سؤال شائع" : "Add FAQ"}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder={language === "ar" ? "السؤال (عربي)" : "Question (Arabic)"}
              value={formData.questionAr}
              onChange={(e) => setFormData({ ...formData, questionAr: e.target.value })}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <input
              type="text"
              placeholder={language === "ar" ? "السؤال (إنجليزي)" : "Question (English)"}
              value={formData.questionEn}
              onChange={(e) => setFormData({ ...formData, questionEn: e.target.value })}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <textarea
              placeholder={language === "ar" ? "الإجابة (عربي)" : "Answer (Arabic)"}
              value={formData.answerAr}
              onChange={(e) => setFormData({ ...formData, answerAr: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <textarea
              placeholder={language === "ar" ? "الإجابة (إنجليزي)" : "Answer (English)"}
              value={formData.answerEn}
              onChange={(e) => setFormData({ ...formData, answerEn: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddFAQ}>{language === "ar" ? "حفظ" : "Save"}</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({
                    questionAr: "",
                    questionEn: "",
                    answerAr: "",
                    answerEn: "",
                    category: "general",
                  })
                }}
              >
                {language === "ar" ? "إلغاء" : "Cancel"}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredFaqs.map((faq) => (
          <Card key={faq.id} className="p-4 border border-border/40">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{language === "ar" ? faq.questionAr : faq.questionEn}</h3>
                <p className="text-sm text-foreground/60 mt-2">{language === "ar" ? faq.answerAr : faq.answerEn}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(faq.id)
                    setFormData({
                      questionAr: faq.questionAr,
                      questionEn: faq.questionEn,
                      answerAr: faq.answerAr,
                      answerEn: faq.answerEn,
                      category: faq.category,
                    })
                    setShowForm(true)
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(faq.id)} className="text-destructive">
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
