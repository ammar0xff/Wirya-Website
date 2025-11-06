"use client"

import type React from "react"
import { useTheme } from "@/lib/theme-provider"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import {
  Moon,
  Sun,
  Save,
  Globe,
  Mail,
  Phone,
  MessageCircle,
  ImageIcon,
  SettingsIcon,
  Share2,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"
import { siteSettings as defaultSiteSettings, contactPageContent as defaultContactContent } from "@/lib/site-content"

export const dynamic = "force-dynamic"

export default function AdminSettings() {
  const { language, setLanguage, theme, setTheme } = useTheme()
  const { state, manager } = useContentManager()
  const [mounted, setMounted] = useState(false)

  const [settings, setSettings] = useState({
    // Site Settings
    siteName: "",
    logoUrl: "",
    favicon: "",
    metaTitleAr: "",
    metaTitleEn: "",
    metaDescAr: "",
    metaDescEn: "",
    // Contact Settings
    contactEmail: "",
    contactPhone: "",
    whatsappNumber: "",
    addressAr: "",
    addressEn: "",
    businessHoursAr: "",
    businessHoursEn: "",
    // Social Media
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Load settings from content manager or defaults
    const siteSettings = state.siteSettings || defaultSiteSettings
    const contactContent = state.contactContent || defaultContactContent

    setSettings({
      siteName: siteSettings.siteName || "Wirya", // Changed default from Werya to Wirya
      logoUrl: siteSettings.logoUrl || "/logo.svg",
      favicon: siteSettings.favicon || "/favicon.ico",
      metaTitleAr: siteSettings.metaTitleAr || "",
      metaTitleEn: siteSettings.metaTitleEn || "",
      metaDescAr: siteSettings.metaDescAr || "",
      metaDescEn: siteSettings.metaDescEn || "",
      contactEmail: contactContent.email || "",
      contactPhone: contactContent.phone || "",
      whatsappNumber: siteSettings.whatsappNumber || "",
      addressAr: contactContent.addressAr || "",
      addressEn: contactContent.addressEn || "",
      businessHoursAr: contactContent.businessHoursAr || "",
      businessHoursEn: contactContent.businessHoursEn || "",
      facebookUrl: contactContent.socialLinks?.facebook || "",
      twitterUrl: contactContent.socialLinks?.twitter || "",
      instagramUrl: contactContent.socialLinks?.instagram || "",
      linkedinUrl: contactContent.socialLinks?.linkedin || "",
    })
  }, [mounted, state.siteSettings, state.contactContent])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-foreground/60">{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus({ type: "", message: language === "ar" ? "جاري الحفظ..." : "Saving..." })

    try {
      // Update site settings
      const updatedSiteSettings = {
        ...(state.siteSettings || defaultSiteSettings),
        siteName: settings.siteName,
        logoUrl: settings.logoUrl,
        favicon: settings.favicon,
        metaTitleAr: settings.metaTitleAr,
        metaTitleEn: settings.metaTitleEn,
        metaDescAr: settings.metaDescAr,
        metaDescEn: settings.metaDescEn,
        whatsappNumber: settings.whatsappNumber,
      }

      // Update contact content
      const updatedContact = {
        ...(state.contactContent || defaultContactContent),
        email: settings.contactEmail,
        phone: settings.contactPhone,
        addressAr: settings.addressAr,
        addressEn: settings.addressEn,
        businessHoursAr: settings.businessHoursAr,
        businessHoursEn: settings.businessHoursEn,
        socialLinks: {
          facebook: settings.facebookUrl,
          twitter: settings.twitterUrl,
          instagram: settings.instagramUrl,
          linkedin: settings.linkedinUrl,
        },
      }

      manager.setSiteSettings(updatedSiteSettings)
      manager.setContactContent(updatedContact)

      // Sync to GitHub
      const result = await SyncService.syncSiteContent(
        state.aboutContent,
        updatedContact,
        state.storyContent,
        state.footerContent,
        updatedSiteSettings,
      )

      if (result.success) {
        manager.markSynced()
        setSaveStatus({
          type: "success",
          message: language === "ar" ? "تم حفظ الإعدادات بنجاح ✓" : "Settings saved successfully ✓",
        })
        setTimeout(() => setSaveStatus({ type: "", message: "" }), 5000)
      } else {
        setSaveStatus({ type: "error", message: result.message })
      }
    } catch (error) {
      setSaveStatus({
        type: "error",
        message: error instanceof Error ? error.message : language === "ar" ? "حدث خطأ" : "Error occurred",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="pb-8 px-4 sm:px-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === "ar" ? "إعدادات الموقع" : "Site Settings"}
        </h1>
        <p className="text-sm sm:text-base text-foreground/60">
          {language === "ar"
            ? "إدارة إعدادات الموقع والمعلومات العامة"
            : "Manage site settings and general information"}
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-2 h-auto p-1">
          <TabsTrigger value="general" className="gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{language === "ar" ? "عام" : "General"}</span>
            <span className="sm:hidden">{language === "ar" ? "عام" : "Gen"}</span>
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5">
            <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{language === "ar" ? "العلامة التجارية" : "Branding"}</span>
            <span className="sm:hidden">{language === "ar" ? "علامة" : "Brand"}</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5">
            <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{language === "ar" ? "الاتصال" : "Contact"}</span>
            <span className="sm:hidden">{language === "ar" ? "اتصال" : "Contact"}</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5">
            <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{language === "ar" ? "التواصل" : "Social"}</span>
            <span className="sm:hidden">{language === "ar" ? "تواصل" : "Social"}</span>
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5 col-span-2 sm:col-span-1"
          >
            <SettingsIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{language === "ar" ? "المظهر" : "Appearance"}</span>
            <span className="sm:hidden">{language === "ar" ? "مظهر" : "Look"}</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 sm:space-y-6">
          <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  {language === "ar" ? "الإعدادات العامة" : "General Settings"}
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60">
                  {language === "ar" ? "معلومات الموقع الأساسية" : "Basic site information"}
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="siteName" className="text-sm font-medium text-foreground">
                  {language === "ar" ? "اسم الموقع" : "Site Name"}
                </Label>
                <Input
                  id="siteName"
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="bg-input border-border"
                  placeholder={language === "ar" ? "أدخل اسم الموقع" : "Enter site name"}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="metaTitleAr" className="text-sm font-medium text-foreground">
                    {language === "ar" ? "عنوان الصفحة (عربي)" : "Page Title (Arabic)"}
                  </Label>
                  <Input
                    id="metaTitleAr"
                    type="text"
                    name="metaTitleAr"
                    value={settings.metaTitleAr}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder={language === "ar" ? "عنوان الصفحة بالعربية" : "Page title in Arabic"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaTitleEn" className="text-sm font-medium text-foreground">
                    {language === "ar" ? "عنوان الصفحة (إنجليزي)" : "Page Title (English)"}
                  </Label>
                  <Input
                    id="metaTitleEn"
                    type="text"
                    name="metaTitleEn"
                    value={settings.metaTitleEn}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder={language === "ar" ? "عنوان الصفحة بالإنجليزية" : "Page title in English"}
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="metaDescAr" className="text-sm font-medium text-foreground">
                    {language === "ar" ? "وصف الموقع (عربي)" : "Site Description (Arabic)"}
                  </Label>
                  <textarea
                    id="metaDescAr"
                    name="metaDescAr"
                    value={settings.metaDescAr}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm resize-none"
                    placeholder={language === "ar" ? "وصف الموقع بالعربية" : "Site description in Arabic"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescEn" className="text-sm font-medium text-foreground">
                    {language === "ar" ? "وصف الموقع (إنجليزي)" : "Site Description (English)"}
                  </Label>
                  <textarea
                    id="metaDescEn"
                    name="metaDescEn"
                    value={settings.metaDescEn}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm resize-none"
                    placeholder={language === "ar" ? "وصف الموقع بالإنجليزية" : "Site description in English"}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Branding Settings */}
        <TabsContent value="branding" className="space-y-4 sm:space-y-6">
          <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  {language === "ar" ? "العلامة التجارية" : "Branding"}
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60">
                  {language === "ar" ? "الشعار والأيقونات" : "Logo and icons"}
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="logoUrl" className="text-sm font-medium text-foreground">
                  {language === "ar" ? "رابط الشعار" : "Logo URL"}
                </Label>
                <Input
                  id="logoUrl"
                  type="text"
                  name="logoUrl"
                  value={settings.logoUrl}
                  onChange={handleChange}
                  className="bg-input border-border"
                  placeholder="/logo.svg"
                />
                <p className="text-xs text-foreground/50">
                  {language === "ar" ? "رابط ملف الشعار (SVG أو PNG)" : "URL to logo file (SVG or PNG)"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon" className="text-sm font-medium text-foreground">
                  {language === "ar" ? "رابط الأيقونة المفضلة (Favicon)" : "Favicon URL"}
                </Label>
                <Input
                  id="favicon"
                  type="text"
                  name="favicon"
                  value={settings.favicon}
                  onChange={handleChange}
                  className="bg-input border-border"
                  placeholder="/favicon.ico"
                />
                <p className="text-xs text-foreground/50">
                  {language === "ar"
                    ? "رابط ملف الأيقونة المفضلة (.ico أو .png)"
                    : "URL to favicon file (.ico or .png)"}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-accent mt-0.5" />
                  <div className="text-sm text-foreground/70 leading-relaxed">
                    <p className="font-medium text-foreground mb-1">{language === "ar" ? "ملاحظة:" : "Note:"}</p>
                    {language === "ar"
                      ? "قم برفع ملفات الشعار والأيقونة إلى مجلد public/ في المشروع، ثم أدخل المسار هنا (مثال: /logo.svg)"
                      : "Upload logo and favicon files to the public/ folder in your project, then enter the path here (e.g., /logo.svg)"}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-4 sm:space-y-6">
          <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60">
                  {language === "ar" ? "طرق التواصل مع الشركة" : "Company contact details"}
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder="info@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {language === "ar" ? "رقم الهاتف" : "Phone"}
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder="+966 12 345 6789"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNumber" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  {language === "ar" ? "رقم WhatsApp" : "WhatsApp Number"}
                </Label>
                <Input
                  id="whatsappNumber"
                  type="tel"
                  name="whatsappNumber"
                  value={settings.whatsappNumber}
                  onChange={handleChange}
                  className="bg-input border-border"
                  placeholder="+966501234567"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="addressAr" className="text-sm font-medium text-foreground">
                    {language === "ar" ? "العنوان (عربي)" : "Address (Arabic)"}
                  </Label>
                  <Input
                    id="addressAr"
                    type="text"
                    name="addressAr"
                    value={settings.addressAr}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder={language === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressEn" className="text-sm font-medium text-foreground">
                    {language === "ar" ? "العنوان (إنجليزي)" : "Address (English)"}
                  </Label>
                  <Input
                    id="addressEn"
                    type="text"
                    name="addressEn"
                    value={settings.addressEn}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder="Riyadh, Saudi Arabia"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessHoursAr" className="text-sm font-medium text-foreground">
                    {language === "ar" ? "ساعات العمل (عربي)" : "Business Hours (Arabic)"}
                  </Label>
                  <Input
                    id="businessHoursAr"
                    type="text"
                    name="businessHoursAr"
                    value={settings.businessHoursAr}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder="الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessHoursEn" className="text-sm font-medium text-foreground">
                    {language === "ar" ? "ساعات العمل (إنجليزي)" : "Business Hours (English)"}
                  </Label>
                  <Input
                    id="businessHoursEn"
                    type="text"
                    name="businessHoursEn"
                    value={settings.businessHoursEn}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder="Sunday - Thursday: 9:00 AM - 6:00 PM"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-4 sm:space-y-6">
          <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  {language === "ar" ? "وسائل التواصل الاجتماعي" : "Social Media"}
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60">
                  {language === "ar" ? "روابط حسابات التواصل الاجتماعي" : "Social media profile links"}
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="facebookUrl" className="text-sm font-medium text-foreground">
                    Facebook
                  </Label>
                  <Input
                    id="facebookUrl"
                    type="url"
                    name="facebookUrl"
                    value={settings.facebookUrl}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterUrl" className="text-sm font-medium text-foreground">
                    Twitter / X
                  </Label>
                  <Input
                    id="twitterUrl"
                    type="url"
                    name="twitterUrl"
                    value={settings.twitterUrl}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagramUrl" className="text-sm font-medium text-foreground">
                    Instagram
                  </Label>
                  <Input
                    id="instagramUrl"
                    type="url"
                    name="instagramUrl"
                    value={settings.instagramUrl}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl" className="text-sm font-medium text-foreground">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    name="linkedinUrl"
                    value={settings.linkedinUrl}
                    onChange={handleChange}
                    className="bg-input border-border"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4 sm:space-y-6">
          <Card className="border border-border/40 bg-card/50 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                <SettingsIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  {language === "ar" ? "المظهر واللغة" : "Appearance & Language"}
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60">
                  {language === "ar" ? "تخصيص مظهر الموقع" : "Customize site appearance"}
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">{language === "ar" ? "المظهر" : "Theme"}</Label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      theme === "light"
                        ? "border-accent bg-accent/10 text-accent shadow-sm"
                        : "border-border/40 text-foreground/60 hover:border-border/60 hover:bg-card/50"
                    }`}
                  >
                    <Sun className="h-5 w-5" />
                    <span className="font-medium">{language === "ar" ? "فاتح" : "Light"}</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      theme === "dark"
                        ? "border-accent bg-accent/10 text-accent shadow-sm"
                        : "border-border/40 text-foreground/60 hover:border-border/60 hover:bg-card/50"
                    }`}
                  >
                    <Moon className="h-5 w-5" />
                    <span className="font-medium">{language === "ar" ? "داكن" : "Dark"}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">
                  {language === "ar" ? "اللغة" : "Language"}
                </Label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setLanguage("ar")}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                      language === "ar"
                        ? "border-accent bg-accent/10 text-accent shadow-sm"
                        : "border-border/40 text-foreground/60 hover:border-border/60 hover:bg-card/50"
                    }`}
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                      language === "en"
                        ? "border-accent bg-accent/10 text-accent shadow-sm"
                        : "border-border/40 text-foreground/60 hover:border-border/60 hover:bg-card/50"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-0 mt-6 sm:mt-8 p-3 sm:p-4 bg-background/95 backdrop-blur-sm border-t border-border/40 -mx-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white gap-2 px-4 sm:px-6 w-full sm:w-auto text-sm sm:text-base"
          >
            <Save className="h-4 w-4" />
            {isSaving
              ? language === "ar"
                ? "جاري الحفظ..."
                : "Saving..."
              : language === "ar"
                ? "حفظ جميع الإعدادات"
                : "Save All Settings"}
          </Button>

          {saveStatus.message && (
            <div
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${
                saveStatus.type === "success"
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                  : saveStatus.type === "error"
                    ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                    : "bg-accent/10 text-accent border border-accent/20"
              }`}
            >
              {saveStatus.type === "success" && <CheckCircle2 className="h-4 w-4 flex-shrink-0" />}
              {saveStatus.type === "error" && <AlertCircle className="h-4 w-4 flex-shrink-0" />}
              <span className="break-words">{saveStatus.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
