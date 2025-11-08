"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Save } from "lucide-react"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"
import { aboutPageContent } from "@/lib/site-content"

export const dynamic = "force-dynamic"

export default function AboutContentPage() {
  const { language } = useTheme()
  const { state, manager } = useContentManager()

  const [formData, setFormData] = useState(state.aboutContent || aboutPageContent)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!state.aboutContent) {
      // Initialize with default content if not present
      manager.setAboutContent(aboutPageContent)
    }
    setIsLoaded(true)
  }, []) // Empty dependency array - only run once on mount

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
      </div>
    )
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addValue = () => {
    setFormData((prev) => ({
      ...prev,
      values: [...prev.values, { id: `value-${Date.now()}`, titleAr: "", titleEn: "", descAr: "", descEn: "" }],
    }))
  }

  const updateValue = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.map((v, i) => (i === index ? { ...v, [field]: value } : v)),
    }))
  }

  const removeValue = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }))
  }

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { id: `achievement-${Date.now()}`, numberAr: "", numberEn: "", titleAr: "", titleEn: "" },
      ],
    }))
  }

  const updateAchievement = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
    }))
  }

  const removeAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveStatus(language === "ar" ? "جاري الحفظ..." : "Saving...")

    try {
      manager.setAboutContent(formData)

      const result = await SyncService.syncSiteContent(
        formData,
        state.contactContent,
        state.storyContent,
        state.footerContent,
        state.siteSettings,
      )

      if (result.success) {
        manager.markSynced()
        setSaveStatus(language === "ar" ? "تم الحفظ بنجاح" : "Saved successfully")
        setTimeout(() => setSaveStatus(""), 3000)
      } else {
        setSaveStatus(result.message)
      }
    } catch (error) {
      setSaveStatus(error instanceof Error ? error.message : "Error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">
        {language === "ar" ? "إدارة صفحة من نحن" : "Manage About Page"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{language === "ar" ? "المهمة والرؤية" : "Mission & Vision"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "المهمة (عربي)" : "Mission (Arabic)"}
              </label>
              <textarea
                value={formData.missionAr}
                onChange={(e) => handleChange("missionAr", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "المهمة (إنجليزي)" : "Mission (English)"}
              </label>
              <textarea
                value={formData.missionEn}
                onChange={(e) => handleChange("missionEn", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "الرؤية (عربي)" : "Vision (Arabic)"}
              </label>
              <textarea
                value={formData.visionAr}
                onChange={(e) => handleChange("visionAr", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "الرؤية (إنجليزي)" : "Vision (English)"}
              </label>
              <textarea
                value={formData.visionEn}
                onChange={(e) => handleChange("visionEn", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{language === "ar" ? "القيم" : "Values"}</h2>
          <div className="space-y-4">
            {formData.values.map((value, idx) => (
              <Card key={idx} className="p-4 bg-card/30">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    placeholder={language === "ar" ? "العنوان (عربي)" : "Title (Arabic)"}
                    value={value.titleAr}
                    onChange={(e) => updateValue(idx, "titleAr", e.target.value)}
                  />
                  <Input
                    placeholder={language === "ar" ? "العنوان (إنجليزي)" : "Title (English)"}
                    value={value.titleEn}
                    onChange={(e) => updateValue(idx, "titleEn", e.target.value)}
                  />
                  <Input
                    placeholder={language === "ar" ? "الوصف (عربي)" : "Description (Arabic)"}
                    value={value.descAr}
                    onChange={(e) => updateValue(idx, "descAr", e.target.value)}
                  />
                  <Input
                    placeholder={language === "ar" ? "الوصف (إنجليزي)" : "Description (English)"}
                    value={value.descEn}
                    onChange={(e) => updateValue(idx, "descEn", e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeValue(idx)}
                  className="mt-2 gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {language === "ar" ? "حذف" : "Remove"}
                </Button>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addValue} className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              {language === "ar" ? "إضافة قيمة" : "Add Value"}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{language === "ar" ? "الإنجازات" : "Achievements"}</h2>
          <div className="space-y-4">
            {formData.achievements.map((achievement, idx) => (
              <Card key={idx} className="p-4 bg-card/30">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    placeholder={language === "ar" ? "الرقم (عربي)" : "Number (Arabic)"}
                    value={achievement.numberAr}
                    onChange={(e) => updateAchievement(idx, "numberAr", e.target.value)}
                  />
                  <Input
                    placeholder={language === "ar" ? "الرقم (إنجليزي)" : "Number (English)"}
                    value={achievement.numberEn}
                    onChange={(e) => updateAchievement(idx, "numberEn", e.target.value)}
                  />
                  <Input
                    placeholder={language === "ar" ? "العنوان (عربي)" : "Title (Arabic)"}
                    value={achievement.titleAr}
                    onChange={(e) => updateAchievement(idx, "titleAr", e.target.value)}
                  />
                  <Input
                    placeholder={language === "ar" ? "العنوان (إنجليزي)" : "Title (English)"}
                    value={achievement.titleEn}
                    onChange={(e) => updateAchievement(idx, "titleEn", e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeAchievement(idx)}
                  className="mt-2 gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {language === "ar" ? "حذف" : "Remove"}
                </Button>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addAchievement} className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              {language === "ar" ? "إضافة إنجاز" : "Add Achievement"}
            </Button>
          </div>
        </Card>

        {saveStatus && (
          <div className="p-3 rounded-lg text-sm bg-accent/10 text-accent border border-accent/20">{saveStatus}</div>
        )}

        <Button type="submit" disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? (language === "ar" ? "جاري الحفظ..." : "Saving...") : language === "ar" ? "حفظ" : "Save"}
        </Button>
      </form>
    </div>
  )
}
