"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Trash2,
  Save,
  LinkIcon,
  Layers,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"
import type { FooterContent, ContactPageContent } from "@/lib/site-content"

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

const defaultContactContent: ContactPageContent = {
  email: "info@werya.com",
  phone: "+966 12 345 6789",
  addressAr: "الرياض، المملكة العربية السعودية",
  addressEn: "Riyadh, Saudi Arabia",
  businessHoursAr: "الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً",
  businessHoursEn: "Sunday - Thursday: 9:00 AM - 6:00 PM",
  socialLinks: {
    facebook: "https://facebook.com/wirya",
    twitter: "https://twitter.com/wirya",
    instagram: "https://instagram.com/wirya",
    linkedin: "https://linkedin.com/company/wirya",
  },
}

export default function FooterContentPage() {
  const { language } = useTheme()
  const { state, manager } = useContentManager()

  const [footerData, setFooterData] = useState<FooterContent>(defaultFooterContent)
  const [contactData, setContactData] = useState<ContactPageContent>(defaultContactContent)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (state.footerContent) {
      setFooterData(state.footerContent)
    } else {
      manager.setFooterContent(defaultFooterContent)
    }

    if (state.contactContent) {
      setContactData(state.contactContent)
    } else {
      manager.setContactContent(defaultContactContent)
    }

    setIsLoaded(true)
  }, [state.footerContent, state.contactContent, manager])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
      </div>
    )
  }

  const handleFooterChange = (field: string, value: string) => {
    setFooterData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContactChange = (field: string, value: string) => {
    setContactData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setContactData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }))
  }

  // Quick Links Management
  const addQuickLink = () => {
    setFooterData((prev) => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { id: `link-${Date.now()}`, labelAr: "", labelEn: "", href: "" }],
    }))
  }

  const updateQuickLink = (index: number, field: string, value: string) => {
    setFooterData((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    }))
  }

  const removeQuickLink = (index: number) => {
    setFooterData((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.filter((_, i) => i !== index),
    }))
  }

  // Services Management
  const addService = () => {
    setFooterData((prev) => ({
      ...prev,
      services: [...prev.services, { id: `service-${Date.now()}`, labelAr: "", labelEn: "" }],
    }))
  }

  const updateService = (index: number, field: string, value: string) => {
    setFooterData((prev) => ({
      ...prev,
      services: prev.services.map((service, i) => (i === index ? { ...service, [field]: value } : service)),
    }))
  }

  const removeService = (index: number) => {
    setFooterData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveStatus(language === "ar" ? "جاري الحفظ..." : "Saving...")

    try {
      manager.setFooterContent(footerData)
      manager.setContactContent(contactData)

      const result = await SyncService.syncSiteContent(
        state.aboutContent,
        contactData,
        state.storyContent,
        footerData,
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
          {language === "ar" ? "إدارة محتوى الفوتر" : "Footer Management"}
        </h1>
        <p className="text-sm sm:text-base text-foreground/60">
          {language === "ar"
            ? "تحرير محتوى الفوتر، الروابط، معلومات التواصل والشبكات الاجتماعية"
            : "Edit footer content, links, contact information and social media"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
            <TabsTrigger value="company" className="text-xs sm:text-sm">
              {language === "ar" ? "معلومات الشركة" : "Company Info"}
            </TabsTrigger>
            <TabsTrigger value="links" className="text-xs sm:text-sm">
              {language === "ar" ? "الروابط والخدمات" : "Links & Services"}
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-xs sm:text-sm">
              {language === "ar" ? "معلومات التواصل" : "Contact Info"}
            </TabsTrigger>
            <TabsTrigger value="social" className="text-xs sm:text-sm">
              {language === "ar" ? "الشبكات الاجتماعية" : "Social Media"}
            </TabsTrigger>
          </TabsList>

          {/* Company Info Tab */}
          <TabsContent value="company" className="space-y-6">
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
                    value={footerData.companyDescAr}
                    onChange={(e) => handleFooterChange("companyDescAr", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={language === "ar" ? "أدخل وصف الشركة بالعربية" : "Enter company description in Arabic"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    {language === "ar" ? "الوصف (إنجليزي)" : "Description (English)"}
                  </label>
                  <textarea
                    value={footerData.companyDescEn}
                    onChange={(e) => handleFooterChange("companyDescEn", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={
                      language === "ar" ? "أدخل وصف الشركة بالإنجليزية" : "Enter company description in English"
                    }
                  />
                </div>
              </div>
            </Card>

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
                    value={footerData.copyrightAr}
                    onChange={(e) => handleFooterChange("copyrightAr", e.target.value)}
                    placeholder={language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    {language === "ar" ? "حقوق النشر (إنجليزي)" : "Copyright (English)"}
                  </label>
                  <Input
                    value={footerData.copyrightEn}
                    onChange={(e) => handleFooterChange("copyrightEn", e.target.value)}
                    placeholder="All rights reserved"
                    className="bg-input border-border"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Links & Services Tab */}
          <TabsContent value="links" className="space-y-6">
            {/* Quick Links */}
            <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                  <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    {language === "ar" ? "الروابط السريعة" : "Quick Links"}
                  </h2>
                  <p className="text-xs sm:text-sm text-foreground/60">
                    {language === "ar" ? "روابط التنقل في الفوتر" : "Navigation links in footer"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {footerData.quickLinks.map((link, idx) => (
                  <Card key={link.id} className="p-3 sm:p-4 bg-card/30 border border-border/30">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-foreground/80">
                          {language === "ar" ? "التسمية (عربي)" : "Label (Arabic)"}
                        </label>
                        <Input
                          placeholder={language === "ar" ? "مثال: الخدمات" : "e.g., Services"}
                          value={link.labelAr}
                          onChange={(e) => updateQuickLink(idx, "labelAr", e.target.value)}
                          className="bg-input border-border text-sm h-9"
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
                          className="bg-input border-border text-sm h-9"
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
                          className="bg-input border-border text-sm h-9"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuickLink(idx)}
                      className="mt-2 gap-1.5 text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3" />
                      {language === "ar" ? "حذف" : "Remove"}
                    </Button>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addQuickLink}
                  className="gap-2 w-full sm:w-auto text-sm h-9 bg-transparent"
                >
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
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    {language === "ar" ? "قائمة الخدمات" : "Services List"}
                  </h2>
                  <p className="text-xs sm:text-sm text-foreground/60">
                    {language === "ar" ? "الخدمات المعروضة في الفوتر" : "Services displayed in footer"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {footerData.services.map((service, idx) => (
                  <Card key={service.id} className="p-3 sm:p-4 bg-card/30 border border-border/30">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-foreground/80">
                          {language === "ar" ? "اسم الخدمة (عربي)" : "Service Name (Arabic)"}
                        </label>
                        <Input
                          placeholder={language === "ar" ? "مثال: الدعم الفني" : "e.g., Technical Support"}
                          value={service.labelAr}
                          onChange={(e) => updateService(idx, "labelAr", e.target.value)}
                          className="bg-input border-border text-sm h-9"
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
                          className="bg-input border-border text-sm h-9"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeService(idx)}
                      className="mt-2 gap-1.5 text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3" />
                      {language === "ar" ? "حذف" : "Remove"}
                    </Button>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addService}
                  className="gap-2 w-full sm:w-auto text-sm h-9 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                  {language === "ar" ? "إضافة خدمة" : "Add Service"}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    {language === "ar" ? "معلومات التواصل" : "Contact Information"}
                  </h2>
                  <p className="text-xs sm:text-sm text-foreground/60">
                    {language === "ar" ? "معلومات الاتصال المعروضة في الفوتر" : "Contact details displayed in footer"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                      <Mail className="h-4 w-4 text-accent" />
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </label>
                    <Input
                      type="email"
                      value={contactData.email}
                      onChange={(e) => handleContactChange("email", e.target.value)}
                      placeholder="info@company.com"
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                      <Phone className="h-4 w-4 text-accent" />
                      {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                    </label>
                    <Input
                      type="tel"
                      value={contactData.phone}
                      onChange={(e) => handleContactChange("phone", e.target.value)}
                      placeholder="+966 12 345 6789"
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                      <MapPin className="h-4 w-4 text-accent" />
                      {language === "ar" ? "العنوان (عربي)" : "Address (Arabic)"}
                    </label>
                    <Input
                      value={contactData.addressAr}
                      onChange={(e) => handleContactChange("addressAr", e.target.value)}
                      placeholder={language === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                      <MapPin className="h-4 w-4 text-accent" />
                      {language === "ar" ? "العنوان (إنجليزي)" : "Address (English)"}
                    </label>
                    <Input
                      value={contactData.addressEn}
                      onChange={(e) => handleContactChange("addressEn", e.target.value)}
                      placeholder="Riyadh, Saudi Arabia"
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      {language === "ar" ? "ساعات العمل (عربي)" : "Business Hours (Arabic)"}
                    </label>
                    <Input
                      value={contactData.businessHoursAr}
                      onChange={(e) => handleContactChange("businessHoursAr", e.target.value)}
                      placeholder={
                        language === "ar"
                          ? "الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً"
                          : "Sunday - Thursday: 9:00 AM - 6:00 PM"
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      {language === "ar" ? "ساعات العمل (إنجليزي)" : "Business Hours (English)"}
                    </label>
                    <Input
                      value={contactData.businessHoursEn}
                      onChange={(e) => handleContactChange("businessHoursEn", e.target.value)}
                      placeholder="Sunday - Thursday: 9:00 AM - 6:00 PM"
                      className="bg-input border-border"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    {language === "ar" ? "روابط الشبكات الاجتماعية" : "Social Media Links"}
                  </h2>
                  <p className="text-xs sm:text-sm text-foreground/60">
                    {language === "ar" ? "روابط حساباتك على الشبكات الاجتماعية" : "Your social media profile links"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                    <Facebook className="h-4 w-4 text-[#1877F2]" />
                    Facebook
                  </label>
                  <Input
                    type="url"
                    value={contactData.socialLinks.facebook}
                    onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                    className="bg-input border-border"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                    <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                    Twitter
                  </label>
                  <Input
                    type="url"
                    value={contactData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                    placeholder="https://twitter.com/yourhandle"
                    className="bg-input border-border"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                    <Instagram className="h-4 w-4 text-[#E4405F]" />
                    Instagram
                  </label>
                  <Input
                    type="url"
                    value={contactData.socialLinks.instagram}
                    onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
                    placeholder="https://instagram.com/yourprofile"
                    className="bg-input border-border"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                    <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                    LinkedIn
                  </label>
                  <Input
                    type="url"
                    value={contactData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/company/yourcompany"
                    className="bg-input border-border"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

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
        <div className="sticky bottom-0 pt-4 pb-2 bg-background/95 backdrop-blur-sm border-t border-border/40 -mx-4 px-4 sm:-mx-6 sm:px-6">
          <Button type="submit" disabled={isSaving} className="gap-2 w-full sm:w-auto h-10">
            <Save className="h-4 w-4" />
            {isSaving
              ? language === "ar"
                ? "جاري الحفظ..."
                : "Saving..."
              : language === "ar"
                ? "حفظ التغييرات"
                : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
