"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, AlertCircle } from "lucide-react"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"
import { CategoryForm } from "@/components/admin/category-form"
import { CategoryItem } from "@/components/admin/category-item"
import type { ServiceCategory } from "@/lib/services"
import type { BlogCategory } from "@/lib/blog"

export default function CategoriesPage() {
  const { language } = useTheme()
  const { state, manager, mounted } = useContentManager()

  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([])
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  useEffect(() => {
    if (!mounted) return
    setServiceCategories(state.serviceCategories)
    setBlogCategories(state.blogCategories)
  }, [state.serviceCategories, state.blogCategories, mounted])

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

  const handleAddServiceCategory = (data: { nameAr: string; nameEn: string }) => {
    const category: ServiceCategory = {
      id: `cat-${Date.now()}`,
      nameAr: data.nameAr.trim(),
      nameEn: data.nameEn.trim(),
    }
    const updated = [...serviceCategories, category]
    setServiceCategories(updated)
    manager.setServiceCategories(updated)
    setSaveStatus({ type: "success", message: language === "ar" ? "تمت الإضافة بنجاح" : "Added successfully" })
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleUpdateServiceCategory = (id: string, nameAr: string, nameEn: string) => {
    const updated = serviceCategories.map((c) => (c.id === id ? { ...c, nameAr, nameEn } : c))
    setServiceCategories(updated)
    manager.setServiceCategories(updated)
    setSaveStatus({ type: "success", message: language === "ar" ? "تم التحديث بنجاح" : "Updated successfully" })
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleDeleteServiceCategory = (id: string) => {
    if (
      !confirm(language === "ar" ? "هل أنت متأكد من حذف هذه الفئة؟" : "Are you sure you want to delete this category?")
    ) {
      return
    }
    const updated = serviceCategories.filter((c) => c.id !== id)
    setServiceCategories(updated)
    manager.setServiceCategories(updated)
    setSaveStatus({ type: "success", message: language === "ar" ? "تم الحذف بنجاح" : "Deleted successfully" })
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleAddBlogCategory = (data: { nameAr: string; nameEn: string }) => {
    const category: BlogCategory = {
      id: `blog-cat-${Date.now()}`,
      nameAr: data.nameAr.trim(),
      nameEn: data.nameEn.trim(),
    }
    const updated = [...blogCategories, category]
    setBlogCategories(updated)
    manager.setBlogCategories(updated)
    setSaveStatus({ type: "success", message: language === "ar" ? "تمت الإضافة بنجاح" : "Added successfully" })
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleUpdateBlogCategory = (id: string, nameAr: string, nameEn: string) => {
    const updated = blogCategories.map((c) => (c.id === id ? { ...c, nameAr, nameEn } : c))
    setBlogCategories(updated)
    manager.setBlogCategories(updated)
    setSaveStatus({ type: "success", message: language === "ar" ? "تم التحديث بنجاح" : "Updated successfully" })
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleDeleteBlogCategory = (id: string) => {
    if (
      !confirm(language === "ar" ? "هل أنت متأكد من حذف هذه الفئة؟" : "Are you sure you want to delete this category?")
    ) {
      return
    }
    const updated = blogCategories.filter((c) => c.id !== id)
    setBlogCategories(updated)
    manager.setBlogCategories(updated)
    setSaveStatus({ type: "success", message: language === "ar" ? "تم الحذف بنجاح" : "Deleted successfully" })
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleSyncToGitHub = async () => {
    setIsSaving(true)
    setSaveStatus({ type: "success", message: language === "ar" ? "جاري المزامنة..." : "Syncing..." })

    try {
      await SyncService.syncServiceCategories(serviceCategories)
      await SyncService.syncBlogCategories(blogCategories)
      manager.markSynced()
      setSaveStatus({ type: "success", message: language === "ar" ? "تمت المزامنة بنجاح!" : "Synced successfully!" })
    } catch (error) {
      console.error("[v0] Sync error:", error)
      setSaveStatus({
        type: "error",
        message: language === "ar" ? "خطأ في المزامنة" : "Sync failed",
      })
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveStatus(null), 4000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === "ar" ? "إدارة الفئات" : "Manage Categories"}
          </h1>
          <p className="text-foreground/60 mt-1">
            {language === "ar" ? "إدارة فئات الخدمات والمدونة" : "Manage service and blog categories"}
          </p>
        </div>
        <Button onClick={handleSyncToGitHub} disabled={isSaving || !state.isDirty}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving
            ? language === "ar"
              ? "جاري الحفظ..."
              : "Saving..."
            : language === "ar"
              ? "حفظ التغييرات"
              : "Save Changes"}
        </Button>
      </div>

      {saveStatus && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 ${
            saveStatus.type === "error" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
          }`}
        >
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p>{saveStatus.message}</p>
        </div>
      )}

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services">{language === "ar" ? "فئات الخدمات" : "Service Categories"}</TabsTrigger>
          <TabsTrigger value="blog">{language === "ar" ? "فئات المدونة" : "Blog Categories"}</TabsTrigger>
        </TabsList>

        {/* Service Categories Tab */}
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "إضافة فئة خدمة جديدة" : "Add New Service Category"}</CardTitle>
              <CardDescription>
                {language === "ar" ? "أضف فئة جديدة للخدمات" : "Add a new category for services"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryForm
                onSubmit={handleAddServiceCategory}
                placeholderAr={language === "ar" ? "مثال: الدعم الفني" : "e.g., Technical Support"}
                placeholderEn="e.g., Technical Support"
                submitLabel={language === "ar" ? "إضافة" : "Add"}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "فئات الخدمات الحالية" : "Existing Service Categories"}</CardTitle>
              <CardDescription>
                {language === "ar"
                  ? `${serviceCategories.length} فئة`
                  : `${serviceCategories.length} categor${serviceCategories.length !== 1 ? "ies" : "y"}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {serviceCategories.length === 0 ? (
                <div className="text-center py-8 text-foreground/60">
                  <p>{language === "ar" ? "لا توجد فئات بعد" : "No categories yet"}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {serviceCategories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      id={category.id}
                      nameAr={category.nameAr}
                      nameEn={category.nameEn}
                      onUpdate={(nameAr, nameEn) => handleUpdateServiceCategory(category.id, nameAr, nameEn)}
                      onDelete={() => handleDeleteServiceCategory(category.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blog Categories Tab */}
        <TabsContent value="blog" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "إضافة فئة مدونة جديدة" : "Add New Blog Category"}</CardTitle>
              <CardDescription>
                {language === "ar" ? "أضف فئة جديدة للمدونة" : "Add a new category for blog posts"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryForm
                onSubmit={handleAddBlogCategory}
                placeholderAr={language === "ar" ? "مثال: التحول الرقمي" : "e.g., Digital Transformation"}
                placeholderEn="e.g., Digital Transformation"
                submitLabel={language === "ar" ? "إضافة" : "Add"}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "فئات المدونة الحالية" : "Existing Blog Categories"}</CardTitle>
              <CardDescription>
                {language === "ar"
                  ? `${blogCategories.length} فئة`
                  : `${blogCategories.length} categor${blogCategories.length !== 1 ? "ies" : "y"}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {blogCategories.length === 0 ? (
                <div className="text-center py-8 text-foreground/60">
                  <p>{language === "ar" ? "لا توجد فئات بعد" : "No categories yet"}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {blogCategories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      id={category.id}
                      nameAr={category.nameAr}
                      nameEn={category.nameEn}
                      onUpdate={(nameAr, nameEn) => handleUpdateBlogCategory(category.id, nameAr, nameEn)}
                      onDelete={() => handleDeleteBlogCategory(category.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
