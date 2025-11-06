"use client"

import type React from "react"
import { useTheme } from "@/lib/theme-provider"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"
import type { ServiceAttribute, ServiceOption } from "@/lib/services"

export default function EditService() {
  const params = useParams()
  const id = (params.id as string) || ""

  const { language, isDark } = useTheme()
  const router = useRouter()
  const { state, manager, mounted } = useContentManager()

  const isNewService = id === "new"

  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")
  const [isError, setIsError] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    category: "",
    price: 0,
    currency: "SAR",
    stock: 0,
    inStock: true,
    image: "",
    previewImages: [] as string[],
    attributes: [] as ServiceAttribute[],
    options: [] as ServiceOption[],
    whatsappLink: "",
    detailedDescAr: "",
    detailedDescEn: "",
    longDescriptionAr: "",
    longDescriptionEn: "",
  })

  useEffect(() => {
    console.log("[v0] Effect running. mounted:", mounted, "isNewService:", isNewService, "id:", id)

    if (!mounted) {
      console.log("[v0] Not mounted yet, returning")
      return
    }

    if (isNewService) {
      console.log("[v0] New service detected, initializing form")
      setFormData((prev) => ({
        ...prev,
        id: prev.id || `service-${Date.now()}`,
        category: state.serviceCategories?.[0]?.id || "support",
      }))
      return
    }

    console.log("[v0] Looking for existing service with id:", id)
    const service = state.services.find((s) => s.id === id)
    if (!service) {
      console.log("[v0] Service not found, redirecting")
      router.push("/admin/services")
      return
    }

    setFormData({
      id: service.id,
      nameAr: service.nameAr,
      nameEn: service.nameEn,
      descriptionAr: service.descriptionAr,
      descriptionEn: service.descriptionEn,
      category: service.category || state.serviceCategories[0]?.id || "support",
      price: service.price || 0,
      currency: service.currency || "SAR",
      stock: service.stock || 0,
      inStock: service.inStock ?? true,
      image: service.image || "",
      previewImages: service.previewImages || [],
      attributes: service.attributes || [],
      options: service.options || [],
      whatsappLink: service.whatsappLink || "",
      detailedDescAr: service.detailedDescAr || "",
      detailedDescEn: service.detailedDescEn || "",
      longDescriptionAr: service.longDescriptionAr || "",
      longDescriptionEn: service.longDescriptionEn || "",
    })
  }, [mounted, isNewService, id, state.serviceCategories, router])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground/60">{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>
        </div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number.parseFloat(value)
          : type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
    }))
  }

  const addAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { id: `attr-${Date.now()}`, nameAr: "", nameEn: "", valueAr: "", valueEn: "" }],
    }))
  }

  const updateAttribute = (index: number, field: keyof ServiceAttribute, value: string) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) => (i === index ? { ...attr, [field]: value } : attr)),
    }))
  }

  const removeAttribute = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }))
  }

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { id: `opt-${Date.now()}`, nameAr: "", nameEn: "", priceModifier: 0 }],
    }))
  }

  const updateOption = (index: number, field: keyof ServiceOption, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? { ...opt, [field]: value } : opt)),
    }))
  }

  const removeOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }))
  }

  const addPreviewImage = () => {
    const url = prompt(language === "ar" ? "أدخل رابط الصورة" : "Enter image URL")
    if (url) {
      setFormData((prev) => ({
        ...prev,
        previewImages: [...prev.previewImages, url],
      }))
    }
  }

  const removePreviewImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      previewImages: prev.previewImages.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSaving(true)
    setIsError(false)
    setSaveStatus(language === "ar" ? "جاري الحفظ..." : "Saving...")

    try {
      const serviceData = {
        ...formData,
        id: formData.id || `service-${Date.now()}`,
      }

      if (isNewService) {
        manager.addService(serviceData)
      } else {
        manager.updateService(serviceData.id, serviceData)
      }

      const currentState = manager.getState()

      const result = await SyncService.syncServices(currentState.services, currentState.serviceCategories)

      if (result.success) {
        manager.markSynced()
        setSaveStatus(language === "ar" ? "تم الحفظ بنجاح" : "Saved successfully")
        setIsError(false)
        setTimeout(() => router.push("/admin/services"), 1500)
      } else {
        setSaveStatus(result.message || (language === "ar" ? "فشل الحفظ" : "Save failed"))
        setIsError(true)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setSaveStatus(errorMessage)
      setIsError(true)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <Link href="/admin/services" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-6">
        <ArrowLeft className="h-4 w-4" />
        {language === "ar" ? "العودة" : "Back"}
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-8">
        {isNewService
          ? language === "ar"
            ? "إضافة خدمة جديدة"
            : "Add New Service"
          : language === "ar"
            ? "تعديل الخدمة"
            : "Edit Service"}
      </h1>

      <Card className="border border-border/40 bg-card/50 p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "ar" ? "المعلومات الأساسية" : "Basic Information"}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {isNewService && (
                <div>
                  <label htmlFor="service-id" className="block text-sm font-medium text-foreground mb-2">
                    {language === "ar" ? "معرّف الخدمة (اختياري)" : "Service ID (Optional)"}
                  </label>
                  <Input
                    id="service-id"
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder={`service-${Date.now()}`}
                    className="bg-input border-border font-mono text-xs"
                  />
                  <p className="mt-1 text-xs text-foreground/50">
                    {language === "ar" ? "سيتم إنشاء واحد تلقائياً إذا تركته فارغاً" : "Auto-generated if left empty"}
                  </p>
                </div>
              )}
              <div>
                <label htmlFor="nameAr" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "اسم الخدمة (العربية)" : "Service Name (Arabic)"}
                </label>
                <Input
                  id="nameAr"
                  type="text"
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label htmlFor="nameEn" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "اسم الخدمة (الإنجليزية)" : "Service Name (English)"}
                </label>
                <Input
                  id="nameEn"
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>
            </div>
          </div>

          {/* Category and Pricing */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "ar" ? "الفئة والتسعير" : "Category & Pricing"}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "الفئة" : "Category"}
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  {state.serviceCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {language === "ar" ? cat.nameAr : cat.nameEn}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "السعر" : "Price"}
                </label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "العملة" : "Currency"}
                </label>
                <Input
                  id="currency"
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>
            </div>
          </div>

          {/* Stock Management */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "ar" ? "إدارة المخزون" : "Stock Management"}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "الكمية المتوفرة" : "Stock Quantity"}
                </label>
                <Input
                  id="stock"
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>
              <div className="flex items-center gap-2 pt-8">
                <input
                  id="inStock"
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label htmlFor="inStock" className="text-sm font-medium text-foreground">
                  {language === "ar" ? "متوفر للطلب" : "Available for Order"}
                </label>
              </div>
            </div>
          </div>

          {/* Short Descriptions */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "ar" ? "الوصف المختصر" : "Short Description"}
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="descriptionAr" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "الوصف (العربية)" : "Description (Arabic)"}
                </label>
                <textarea
                  id="descriptionAr"
                  name="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                />
              </div>
              <div>
                <label htmlFor="descriptionEn" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "الوصف (الإنجليزية)" : "Description (English)"}
                </label>
                <textarea
                  id="descriptionEn"
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Long Descriptions */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "ar" ? "الوصف التفصيلي (Markdown)" : "Long Description (Markdown)"}
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="longDescriptionAr" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "الوصف التفصيلي (العربية)" : "Long Description (Arabic)"}
                </label>
                <textarea
                  id="longDescriptionAr"
                  name="longDescriptionAr"
                  value={formData.longDescriptionAr}
                  onChange={handleChange}
                  rows={10}
                  placeholder="# عنوان&#10;&#10;نص الوصف..."
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground font-mono text-sm"
                />
              </div>
              <div>
                <label htmlFor="longDescriptionEn" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "الوصف التفصيلي (الإنجليزية)" : "Long Description (English)"}
                </label>
                <textarea
                  id="longDescriptionEn"
                  name="longDescriptionEn"
                  value={formData.longDescriptionEn}
                  onChange={handleChange}
                  rows={10}
                  placeholder="# Heading&#10;&#10;Description text..."
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">{language === "ar" ? "الصور" : "Images"}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "الصورة الرئيسية" : "Main Image"}
                </label>
                <Input
                  id="image"
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/image.jpg"
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === "ar" ? "صور المعاينة" : "Preview Images"}
                </label>
                <div className="space-y-2">
                  {formData.previewImages.map((img, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input value={img} readOnly className="bg-input border-border" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePreviewImage(idx)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPreviewImage}
                    className="gap-2 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                    {language === "ar" ? "إضافة صورة" : "Add Image"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Attributes */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "ar" ? "الخصائص" : "Attributes"}
            </h2>
            <div className="space-y-4">
              {formData.attributes.map((attr, idx) => (
                <Card key={idx} className="p-4 bg-card/30">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      placeholder={language === "ar" ? "اسم الخاصية (عربي)" : "Attribute Name (Arabic)"}
                      value={attr.nameAr}
                      onChange={(e) => updateAttribute(idx, "nameAr", e.target.value)}
                      className="bg-input border-border"
                    />
                    <Input
                      placeholder={language === "ar" ? "اسم الخاصية (إنجليزي)" : "Attribute Name (English)"}
                      value={attr.nameEn}
                      onChange={(e) => updateAttribute(idx, "nameEn", e.target.value)}
                      className="bg-input border-border"
                    />
                    <Input
                      placeholder={language === "ar" ? "القيمة (عربي)" : "Value (Arabic)"}
                      value={attr.valueAr}
                      onChange={(e) => updateAttribute(idx, "valueAr", e.target.value)}
                      className="bg-input border-border"
                    />
                    <Input
                      placeholder={language === "ar" ? "القيمة (إنجليزي)" : "Value (English)"}
                      value={attr.valueEn}
                      onChange={(e) => updateAttribute(idx, "valueEn", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeAttribute(idx)}
                    className="mt-2 gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    {language === "ar" ? "حذف" : "Remove"}
                  </Button>
                </Card>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addAttribute} className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                {language === "ar" ? "إضافة خاصية" : "Add Attribute"}
              </Button>
            </div>
          </div>

          {/* Options */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">{language === "ar" ? "الخيارات" : "Options"}</h2>
            <div className="space-y-4">
              {formData.options.map((opt, idx) => (
                <Card key={idx} className="p-4 bg-card/30">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Input
                      placeholder={language === "ar" ? "اسم الخيار (عربي)" : "Option Name (Arabic)"}
                      value={opt.nameAr}
                      onChange={(e) => updateOption(idx, "nameAr", e.target.value)}
                      className="bg-input border-border"
                    />
                    <Input
                      placeholder={language === "ar" ? "اسم الخيار (إنجليزي)" : "Option Name (English)"}
                      value={opt.nameEn}
                      onChange={(e) => updateOption(idx, "nameEn", e.target.value)}
                      className="bg-input border-border"
                    />
                    <Input
                      type="number"
                      placeholder={language === "ar" ? "تعديل السعر" : "Price Modifier"}
                      value={opt.priceModifier}
                      onChange={(e) => updateOption(idx, "priceModifier", Number.parseFloat(e.target.value))}
                      className="bg-input border-border"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(idx)}
                    className="mt-2 gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    {language === "ar" ? "حذف" : "Remove"}
                  </Button>
                </Card>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addOption} className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                {language === "ar" ? "إضافة خيار" : "Add Option"}
              </Button>
            </div>
          </div>

          {/* WhatsApp Link */}
          <div>
            <label htmlFor="whatsappLink" className="block text-sm font-medium text-foreground mb-2">
              {language === "ar" ? "رابط واتساب" : "WhatsApp Link"}
            </label>
            <Input
              id="whatsappLink"
              type="text"
              name="whatsappLink"
              value={formData.whatsappLink}
              onChange={handleChange}
              placeholder="https://wa.me/..."
              className="bg-input border-border"
            />
          </div>

          {saveStatus && (
            <div
              className={`p-3 rounded-lg text-sm ${
                isError ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-accent/10 text-accent"
              }`}
            >
              {saveStatus}
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
              <Upload className="h-4 w-4" />
              {isSaving ? (language === "ar" ? "جاري الحفظ..." : "Saving...") : language === "ar" ? "حفظ" : "Save"}
            </Button>
            <Link href="/admin/services">
              <Button type="button" variant="outline">
                {language === "ar" ? "إلغاء" : "Cancel"}
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
