"use client"

import { useTheme } from "@/lib/theme-provider"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Plus, Trash2, Edit2, CheckCircle2, AlertCircle } from "lucide-react"
import type { ServiceReview } from "@/lib/site-content"

export default function ServiceReviews() {
  const { language } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [reviews, setReviews] = useState<ServiceReview[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<ServiceReview>>({
    ratingAr: "",
    ratingEn: "",
    contentAr: "",
    contentEn: "",
    clientName: "",
    rating: 5,
  })
  const [saveStatus, setSaveStatus] = useState<{ type: ""; message: "" }>({ type: "", message: "" })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const saved = localStorage.getItem("service_reviews_data")
    if (saved) {
      setReviews(JSON.parse(saved))
    }
  }, [mounted])

  const handleSave = () => {
    if (!formData.clientName || !formData.ratingAr || !formData.ratingEn) {
      setSaveStatus({ type: "error" as any, message: "Please fill required fields" })
      return
    }

    let updated: ServiceReview[]
    if (editingId) {
      updated = reviews.map((r) => (r.id === editingId ? { ...r, ...formData, id: editingId } : r))
    } else {
      const newReview: ServiceReview = {
        id: Date.now().toString(),
        ratingAr: formData.ratingAr,
        ratingEn: formData.ratingEn,
        contentAr: formData.contentAr || "",
        contentEn: formData.contentEn || "",
        clientName: formData.clientName,
        rating: formData.rating || 5,
        date: new Date().toISOString(),
        verified: false,
      }
      updated = [...reviews, newReview]
    }

    setReviews(updated)
    localStorage.setItem("service_reviews_data", JSON.stringify(updated))
    setSaveStatus({
      type: "success" as any,
      message: editingId ? "Review updated" : "Review added",
    })
    setEditingId(null)
    setFormData({
      ratingAr: "",
      ratingEn: "",
      contentAr: "",
      contentEn: "",
      clientName: "",
      rating: 5,
    })
    setTimeout(() => setSaveStatus({ type: "", message: "" }), 3000)
  }

  const handleDelete = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id))
    localStorage.setItem("service_reviews_data", JSON.stringify(reviews.filter((r) => r.id !== id)))
  }

  const handleEdit = (review: ServiceReview) => {
    setEditingId(review.id)
    setFormData(review)
  }

  const handleToggleVerified = (id: string) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, verified: !r.verified } : r))
    setReviews(updated)
    localStorage.setItem("service_reviews_data", JSON.stringify(updated))
  }

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  return (
    <div className="pb-8 px-4 sm:px-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === "ar" ? "تقييمات الخدمات" : "Service Reviews"}
        </h1>
        <p className="text-sm sm:text-base text-foreground/60">
          {language === "ar" ? "إدارة تقييمات الخدمات" : "Manage service reviews"}
        </p>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 gap-2">
          <TabsTrigger value="list" className="gap-2">
            <Star className="h-4 w-4" />
            {language === "ar" ? "القائمة" : "List"}
          </TabsTrigger>
          <TabsTrigger value="add" className="gap-2">
            <Plus className="h-4 w-4" />
            {language === "ar" ? "إضافة" : "Add New"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {reviews.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {reviews.map((review) => (
                <Card key={review.id} className="border border-border/40 bg-card/50 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="font-semibold text-sm text-foreground">{review.clientName}</p>
                    </div>
                    {review.verified && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
                  </div>
                  <p className="text-sm text-foreground/70 mb-3">
                    {language === "ar" ? review.ratingAr : review.ratingEn}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1 bg-transparent"
                      onClick={() => handleToggleVerified(review.id)}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {review.verified
                        ? language === "ar"
                          ? "موثق"
                          : "Verified"
                        : language === "ar"
                          ? "توثيق"
                          : "Verify"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(review)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(review.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-border/40 bg-card/50 p-12 text-center">
              <Star className="h-12 w-12 text-foreground/20 mx-auto mb-3" />
              <p className="text-foreground/60">{language === "ar" ? "لا توجد تقييمات" : "No reviews found"}</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card className="border border-border/40 bg-card/50 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{language === "ar" ? "اسم العميل" : "Client Name"}</Label>
                <Input
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
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
                      {rating} Star{rating !== 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label>{language === "ar" ? "التقييم (عربي)" : "Review (Arabic)"}</Label>
              <textarea
                value={formData.ratingAr}
                onChange={(e) => setFormData({ ...formData, ratingAr: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground resize-none"
              />
            </div>

            <div className="mt-4 space-y-2">
              <Label>{language === "ar" ? "التقييم (إنجليزي)" : "Review (English)"}</Label>
              <textarea
                value={formData.ratingEn}
                onChange={(e) => setFormData({ ...formData, ratingEn: e.target.value })}
                rows={3}
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
                      ratingAr: "",
                      ratingEn: "",
                      contentAr: "",
                      contentEn: "",
                      clientName: "",
                      rating: 5,
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
