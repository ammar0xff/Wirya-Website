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
import { contactPageContent } from "@/lib/site-content"

export const dynamic = "force-dynamic"

export default function ContactContentPage() {
  const { language } = useTheme()
  const { state, manager } = useContentManager()

  const [formData, setFormData] = useState(contactPageContent)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (state.contactContent) {
      setFormData(state.contactContent)
    } else {
      manager.setContactContent(contactPageContent)
    }
    setIsLoaded(true)
  }, [state.contactContent])

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

  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveStatus(language === "ar" ? "جاري الحفظ..." : "Saving...")

    try {
      manager.setContactContent(formData)

      const result = await SyncService.syncSiteContent(
        state.aboutContent,
        formData,
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
        {language === "ar" ? "إدارة صفحة اتصل بنا" : "Manage Contact Page"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "البريد الإلكتروني" : "Email"}
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{language === "ar" ? "الهاتف" : "Phone"}</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "العنوان (عربي)" : "Address (Arabic)"}
              </label>
              <Input value={formData.addressAr} onChange={(e) => handleChange("addressAr", e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "العنوان (إنجليزي)" : "Address (English)"}
              </label>
              <Input value={formData.addressEn} onChange={(e) => handleChange("addressEn", e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "ساعات العمل (عربي)" : "Business Hours (Arabic)"}
              </label>
              <Input
                value={formData.businessHoursAr}
                onChange={(e) => handleChange("businessHoursAr", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "ar" ? "ساعات العمل (إنجليزي)" : "Business Hours (English)"}
              </label>
              <Input
                value={formData.businessHoursEn}
                onChange={(e) => handleChange("businessHoursEn", e.target.value)}
                required
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {language === "ar" ? "روابط التواصل الاجتماعي" : "Social Media Links"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Facebook</label>
              <Input
                type="url"
                value={formData.socialLinks.facebook}
                onChange={(e) => handleSocialChange("facebook", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Twitter</label>
              <Input
                type="url"
                value={formData.socialLinks.twitter}
                onChange={(e) => handleSocialChange("twitter", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <Input
                type="url"
                value={formData.socialLinks.instagram}
                onChange={(e) => handleSocialChange("instagram", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn</label>
              <Input
                type="url"
                value={formData.socialLinks.linkedin}
                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
              />
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
