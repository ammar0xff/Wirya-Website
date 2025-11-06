"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Save, LinkIcon, Layers } from "lucide-react"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"
import type { FooterContent } from "@/lib/site-content"

export const dynamic = "force-dynamic"

const defaultFooterContent: FooterContent = {
  companyDescAr: "شركة رائدة في مجال التحول الرقمي والتكنولوجيا، نقدم حلولاً مبتكرة لتطوير الأعمال",
  companyDescEn:
    "A leading company in digital transformation and technology, providing innovative solutions for business development",
  quickLinks: [
    { id: "services", labelAr: "الخدمات", labelEn: "Services", href: "/services" },
    { id: "about", labelAr: "من نحن", labelEn: "About", href: "/about" },
    { id: "blog", labelAr: "المدونة", labelEn: "Blog", href: "/blog" },
    { id: "contact", labelAr: "اتصل بنا", labelEn: "Contact", href: "/contact" },
  ],
  services: [
    { id: "support", labelAr: "الدعم الفني", labelEn: "Technical Support" },
    { id: "transformation", labelAr: "التحول الرقمي", labelEn: "Digital Transformation" },
    { id: "security", labelAr: "الأمان السيبراني", labelEn: "Cybersecurity" },
    { id: "development", labelAr: "تطوير البرامج", labelEn: "Software Development" },
  ],
  copyrightAr: "جميع الحقوق محفوظة",
  copyrightEn: "All rights reserved",
}

export default function FooterContentPage() {
  const { language } = useTheme()
  const { state, manager } = useContentManager()

  const [formData, setFormData] = useState<FooterContent>(defaultFooterContent)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (state.footerContent) {
      setFormData(state.footerContent)
    } else {
      manager.setFooterContent(defaultFooterContent)
    }
    setIsLoaded(true)
  }, [state.footerContent, manager])

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

  // Quick Links Management
  const addQuickLink = () => {
    setFormData((prev) => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { id: `link-${Date.now()}`, labelAr: "", labelEn: "", href: "" }],
    }))
  }

  const updateQuickLink = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    }))
  }

  const removeQuickLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.filter((_, i) => i !== index),
    }))
  }

  // Services Management
  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, { id: `service-${Date.now()}`, labelAr: "", labelEn: "" }],
    }))
  }

  const updateService = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.map((service, i) => (i === index ? { ...service, [field]: value } : service)),
    }))
  }

  const removeService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveStatus(language === "ar" ? "جاري الحفظ..." : "Saving...")

    try {
      manager.setFooterContent(formData)

      const result = await SyncService.syncSiteContent(
        state.aboutContent,
        state.contactContent,
        state.storyContent,
        formData,
        state.siteSettings,
      )

      if (result.success) {
        manager.markSynced()
        setSaveStatus(language === "ar" ? "تم الحفظ بنجاح ✓" : "Saved successfully ✓")
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
    <div className="pb-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === "ar" ? "إدارة محتوى الفوتر" : "Manage Footer Content"}
        </h1>
        <p className="text-sm sm:text-base text-foreground/60">
          {language === "ar"
            ? "تحرير محتوى الفوتر والروابط السريعة والخدمات"
            : "Edit footer content, quick links, and services"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Description */}
        <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
              <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                {language === "ar" ? "وصف الشركة" : "Company Description"}
              </h2>
              <p className="text-xs sm:text-sm text-foreground/60">
                {language === "ar" ? "النص الذي يظهر في الفوتر" : "Text displayed in the footer"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                {language === "ar" ? "الوصف (عربي)" : "Description (Arabic)"}
              </label>
              <textarea
                value={formData.companyDescAr}
                onChange={(e) => handleChange("companyDescAr", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm resize-none"
                placeholder={language === "ar" ? "أدخل وصف الشركة بالعربية" : "Enter company description in Arabic"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                {language === "ar" ? "الوصف (إنجليزي)" : "Description (English)"}
              </label>
              <textarea
                value={formData.companyDescEn}
                onChange={(e) => handleChange("companyDescEn", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm resize-none"
                placeholder={language === "ar" ? "أدخل وصف الشركة بالإنجليزية" : "Enter company description in English"}
              />
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
              <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                {language === "ar" ? "الروابط السريعة" : "Quick Links"}
              </h2>
              <p className="text-xs sm:text-sm text-foreground/60">
                {language === "ar" ? "روابط التنقل في الفوتر" : "Navigation links in footer"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {formData.quickLinks.map((link, idx) => (
              <Card key={link.id} className="p-4 bg-card/30 border border-border/30">
                <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-foreground/80">
                      {language === "ar" ? "التسمية (عربي)" : "Label (Arabic)"}
                    </label>
                    <Input
                      placeholder={language === "ar" ? "مثال: الخدمات" : "e.g., Services"}
                      value={link.labelAr}
                      onChange={(e) => updateQuickLink(idx, "labelAr", e.target.value)}
                      className="bg-input border-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-foreground/80">
                      {language === "ar" ? "التسمية (إنجليزي)" : "Label (English)"}
                    </label>
                    <Input
                      placeholder={language === "ar" ? "مثال: Services" : "e.g., Services"}
                      value={link.labelEn}
                      onChange={(e) => updateQuickLink(idx, "labelEn", e.target.value)}
                      className="bg-input border-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-foreground/80">
                      {language === "ar" ? "الرابط" : "Link"}
                    </label>
                    <Input
                      placeholder="/services"
                      value={link.href}
                      onChange={(e) => updateQuickLink(idx, "href", e.target.value)}
                      className="bg-input border-border text-sm"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeQuickLink(idx)}
                  className="mt-3 gap-2 text-xs"
                >
                  <Trash2 className="h-3 w-3" />
                  {language === "ar" ? "حذف" : "Remove"}
                </Button>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addQuickLink} className="gap-2 bg-transparent text-sm">
              <Plus className="h-4 w-4" />
              {language === "ar" ? "إضافة رابط سريع" : "Add Quick Link"}
            </Button>
          </div>
        </Card>

        {/* Services List */}
        <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
              <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                {language === "ar" ? "قائمة الخدمات" : "Services List"}
              </h2>
              <p className="text-xs sm:text-sm text-foreground/60">
                {language === "ar" ? "الخدمات المعروضة في الفوتر" : "Services displayed in footer"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {formData.services.map((service, idx) => (
              <Card key={service.id} className="p-4 bg-card/30 border border-border/30">
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-foreground/80">
                      {language === "ar" ? "اسم الخدمة (عربي)" : "Service Name (Arabic)"}
                    </label>
                    <Input
                      placeholder={language === "ar" ? "مثال: الدعم الفني" : "e.g., Technical Support"}
                      value={service.labelAr}
                      onChange={(e) => updateService(idx, "labelAr", e.target.value)}
                      className="bg-input border-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-foreground/80">
                      {language === "ar" ? "اسم الخدمة (إنجليزي)" : "Service Name (English)"}
                    </label>
                    <Input
                      placeholder={language === "ar" ? "مثال: Technical Support" : "e.g., Technical Support"}
                      value={service.labelEn}
                      onChange={(e) => updateService(idx, "labelEn", e.target.value)}
                      className="bg-input border-border text-sm"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeService(idx)}
                  className="mt-3 gap-2 text-xs"
                >
                  <Trash2 className="h-3 w-3" />
                  {language === "ar" ? "حذف" : "Remove"}
                </Button>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addService} className="gap-2 bg-transparent text-sm">
              <Plus className="h-4 w-4" />
              {language === "ar" ? "إضافة خدمة" : "Add Service"}
            </Button>
          </div>
        </Card>

        {/* Copyright Text */}
        <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
            {language === "ar" ? "نص حقوق النشر" : "Copyright Text"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                {language === "ar" ? "حقوق النشر (عربي)" : "Copyright (Arabic)"}
              </label>
              <Input
                value={formData.copyrightAr}
                onChange={(e) => handleChange("copyrightAr", e.target.value)}
                placeholder={language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                {language === "ar" ? "حقوق النشر (إنجليزي)" : "Copyright (English)"}
              </label>
              <Input
                value={formData.copyrightEn}
                onChange={(e) => handleChange("copyrightEn", e.target.value)}
                placeholder="All rights reserved"
                className="bg-input border-border"
              />
            </div>
          </div>
        </Card>

        {/* Save Status */}
        {saveStatus && (
          <div
            className={`p-3 rounded-lg text-sm border ${
              saveStatus.includes("✓")
                ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                : "bg-accent/10 text-accent border-accent/20"
            }`}
          >
            {saveStatus}
          </div>
        )}

        {/* Submit Button */}
        <div className="sticky bottom-0 pt-4 pb-2 bg-background/95 backdrop-blur-sm border-t border-border/40 -mx-4 px-4">
          <Button type="submit" disabled={isSaving} className="gap-2 w-full sm:w-auto">
            <Save className="h-4 w-4" />
            {isSaving ? (language === "ar" ? "جاري الحفظ..." : "Saving...") : language === "ar" ? "حفظ" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}
