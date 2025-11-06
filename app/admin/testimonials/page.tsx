"use client"

import { useTheme } from "@/lib/theme-provider"
import { useState, useEffect } from "react"
import { useContentManager } from "@/hooks/use-content-manager"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Star, Plus, Trash2, Edit2, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react"
import type { Testimonial } from "@/lib/site-content"

export default function AdminTestimonials() {
  const { language } = useTheme()
  const { state } = useContentManager()
  const [mounted, setMounted] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    nameAr: "",
    nameEn: "",
    roleAr: "",
    roleEn: "",
    companyAr: "",
    companyEn: "",
    contentAr: "",
    contentEn: "",
    rating: 5,
    imageUrl: "",
    featured: false,
    status: "active",
  })
  const [saveStatus, setSaveStatus] = useState<{ type: ""; message: "" }>({ type: "", message: "" })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const saved = localStorage.getItem("testimonials_data")
    if (saved) {
      setTestimonials(JSON.parse(saved))
    }
  }, [mounted])

  const handleSave = () => {
    if (!formData.nameAr || !formData.nameEn || !formData.contentAr || !formData.contentEn) {
      setSaveStatus({ type: "error" as any, message: "Please fill all required fields" })
      return
    }

    let updated: Testimonial[]
    if (editingId) {
      updated = testimonials.map((t) => (t.id === editingId ? { ...t, ...formData, id: editingId } : t))
    } else {
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        nameAr: formData.nameAr,
        nameEn: formData.nameEn,
        roleAr: formData.roleAr || "",
        roleEn: formData.roleEn || "",
        companyAr: formData.companyAr || "",
        companyEn: formData.companyEn || "",
        contentAr: formData.contentAr,
        contentEn: formData.contentEn,
        rating: formData.rating || 5,
        imageUrl: formData.imageUrl,
        featured: formData.featured || false,
        createdAt: new Date().toISOString(),
        status: "active",
      }
      updated = [...testimonials, newTestimonial]
    }

    setTestimonials(updated)
    localStorage.setItem("testimonials_data", JSON.stringify(updated))

    setSaveStatus({
      type: "success" as any,
      message: editingId ? "Testimonial updated" : "Testimonial added",
    })
    setEditingId(null)
    setFormData({
      nameAr: "",
      nameEn: "",
      roleAr: "",
      roleEn: "",
      companyAr: "",
      companyEn: "",
      contentAr: "",
      contentEn: "",
      rating: 5,
      imageUrl: "",
      featured: false,
      status: "active",
    })
    setTimeout(() => setSaveStatus({ type: "", message: "" }), 3000)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setFormData(testimonial)
  }

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id))
    localStorage.setItem("testimonials_data", JSON.stringify(testimonials.filter((t) => t.id !== id)))
  }

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  return (
    <div className="pb-8 px-4 sm:px-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === "ar" ? "الآراء والتقييمات" : "Testimonials"}
        </h1>
        <p className="text-sm sm:text-base text-foreground/60">
          {language === "ar" ? "إدارة آراء العملاء" : "Manage client testimonials"}
        </p>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 gap-2">
          <TabsTrigger value="list" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            {language === "ar" ? "القائمة" : "List"}
          </TabsTrigger>
          <TabsTrigger value="add" className="gap-2">
            <Plus className="h-4 w-4" />
            {language === "ar" ? "إضافة" : "Add New"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border border-border/40 bg-card/50 p-4 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {testimonial.featured && (
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">Featured</span>
                  )}
                </div>
                <p className="flex-1 text-sm text-foreground/70 mb-3 line-clamp-3">
                  "{language === "ar" ? testimonial.contentAr : testimonial.contentEn}"
                </p>
                <div className="border-t border-border/20 pt-3">
                  <p className="font-semibold text-sm text-foreground">
                    {language === "ar" ? testimonial.nameAr : testimonial.nameEn}
                  </p>
                  <p className="text-xs text-foreground/60">
                    {language === "ar" ? testimonial.roleAr : testimonial.roleEn}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Edit2 className="h-3 w-3" />
                    {language === "ar" ? "تعديل" : "Edit"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="px-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card className="border border-border/40 bg-card/50 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{language === "ar" ? "الاسم (عربي)" : "Name (Arabic)"}</Label>
                <Input
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>{language === "ar" ? "الاسم (إنجليزي)" : "Name (English)"}</Label>
                <Input
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>{language === "ar" ? "الدور (عربي)" : "Role (Arabic)"}</Label>
                <Input
                  value={formData.roleAr}
                  onChange={(e) => setFormData({ ...formData, roleAr: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>{language === "ar" ? "الدور (إنجليزي)" : "Role (English)"}</Label>
                <Input
                  value={formData.roleEn}
                  onChange={(e) => setFormData({ ...formData, roleEn: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>{language === "ar" ? "الشركة (عربي)" : "Company (Arabic)"}</Label>
                <Input
                  value={formData.companyAr}
                  onChange={(e) => setFormData({ ...formData, companyAr: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>{language === "ar" ? "الشركة (إنجليزي)" : "Company (English)"}</Label>
                <Input
                  value={formData.companyEn}
                  onChange={(e) => setFormData({ ...formData, companyEn: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>{language === "ar" ? "التقييم" : "Rating"}</Label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} {rating === 1 ? "Star" : "Stars"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>{language === "ar" ? "رابط الصورة" : "Image URL"}</Label>
                <Input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/images/client.jpg"
                  className="bg-input border-border"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-border"
                />
                <Label className="m-0">{language === "ar" ? "عرض مميز" : "Featured"}</Label>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label>{language === "ar" ? "الآراء (عربي)" : "Testimonial (Arabic)"}</Label>
              <textarea
                value={formData.contentAr}
                onChange={(e) => setFormData({ ...formData, contentAr: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground resize-none"
              />
            </div>

            <div className="mt-4 space-y-2">
              <Label>{language === "ar" ? "الآراء (إنجليزي)" : "Testimonial (English)"}</Label>
              <textarea
                value={formData.contentEn}
                onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground resize-none"
              />
            </div>

            {saveStatus.message && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
                  saveStatus.type === "success"
                    ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                }`}
              >
                {saveStatus.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <span>{saveStatus.message}</span>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-white flex-1">
                {editingId ? (language === "ar" ? "تحديث" : "Update") : language === "ar" ? "إضافة" : "Add"}
              </Button>
              {editingId && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({
                      nameAr: "",
                      nameEn: "",
                      roleAr: "",
                      roleEn: "",
                      companyAr: "",
                      companyEn: "",
                      contentAr: "",
                      contentEn: "",
                      rating: 5,
                      imageUrl: "",
                      featured: false,
                      status: "active",
                    })
                  }}
                  className="flex-1"
                >
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </Button>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
