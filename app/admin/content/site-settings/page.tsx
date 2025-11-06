"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"
import { siteSettings } from "@/lib/site-content"

export const dynamic = "force-dynamic"

export default function SiteSettingsPage() {
  const { language } = useTheme()
  const { state, manager } = useContentManager()

  const [formData, setFormData] = useState(siteSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (state.siteSettings) {
      setFormData(state.siteSettings)
    } else {
      manager.setSiteSettings(siteSettings)
    }
    setIsLoaded(true)
  }, [state.siteSettings])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
      </div>
    )
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveStatus(language === "ar" ? "جاري الحفظ..." : "Saving...")

    try {
      manager.setSiteSettings(formData)

      const result = await SyncService.syncSiteContent(
        state.aboutContent,
        state.contactContent,
        state.storyContent,
        state.footerContent,
        formData,
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
        {language === "ar" ? "إعدادات الموقع" : "Site Settings"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {language === "ar" ? "المعلومات الأساسية" : "Basic Information"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{language === "ar" ? "اسم الموقع" : "Site Name"}</label>
              <Input value={formData.siteName} onChange={(e) => handleChange("siteName", e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "أيقونة الموقع" : "Site Icon"}
              </label>
              <Input
                type="text"
                value={formData.siteIcon}
                onChange={(e) => handleChange("siteIcon", e.target.value)}
                placeholder="/logo.svg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Favicon</label>
              <Input
                type="text"
                value={formData.favicon}
                onChange={(e) => handleChange("favicon", e.target.value)}
                placeholder="/favicon.ico"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{language === "ar" ? "SEO" : "SEO"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "عنوان الصفحة (عربي)" : "Meta Title (Arabic)"}
              </label>
              <Input value={formData.metaTitleAr} onChange={(e) => handleChange("metaTitleAr", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "عنوان الصفحة (إنجليزي)" : "Meta Title (English)"}
              </label>
              <Input value={formData.metaTitleEn} onChange={(e) => handleChange("metaTitleEn", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "وصف الصفحة (عربي)" : "Meta Description (Arabic)"}
              </label>
              <textarea
                value={formData.metaDescAr}
                onChange={(e) => handleChange("metaDescAr", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "وصف الصفحة (إنجليزي)" : "Meta Description (English)"}
              </label>
              <textarea
                value={formData.metaDescEn}
                onChange={(e) => handleChange("metaDescEn", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {language === "ar" ? "إعدادات التجارة الإلكترونية" : "E-commerce Settings"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "العملة الافتراضية" : "Default Currency"}
              </label>
              <Input
                value={formData.defaultCurrency}
                onChange={(e) => handleChange("defaultCurrency", e.target.value)}
                placeholder="SAR"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.enableEcommerce}
                onChange={(e) => handleChange("enableEcommerce", e.target.checked)}
                className="h-4 w-4"
              />
              <label className="text-sm font-medium">
                {language === "ar" ? "تفعيل التجارة الإلكترونية" : "Enable E-commerce"}
              </label>
            </div>
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
