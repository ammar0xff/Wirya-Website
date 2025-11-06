"use client"

import { useTheme } from "@/lib/theme-provider"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Upload, AlertCircle, Calendar, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { services as initialServices, serviceCategories } from "@/lib/services"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"

export default function ServicesManager() {
  const { language } = useTheme()
  const { state, manager, mounted } = useContentManager()
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<string>("")

  useEffect(() => {
    if (!mounted) return

    if (state.services?.length === 0) {
      manager.setServices(initialServices)
    }
    if (state.serviceCategories?.length === 0) {
      manager.setServiceCategories(serviceCategories)
    }
  }, [mounted])

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

  const handleDelete = (id: string) => {
    if (confirm(language === "ar" ? "هل تريد حذف هذه الخدمة؟" : "Delete this service?")) {
      manager.deleteService(id)
    }
  }

  const handleSync = async () => {
    setIsSyncing(true)
    setSyncStatus(language === "ar" ? "جاري المزامنة..." : "Syncing...")

    try {
      const result = await SyncService.syncServices(state.services)

      if (result.success) {
        manager.markSynced()
        setSyncStatus(language === "ar" ? "تم التحديث بنجاح" : "Synced successfully")
        setTimeout(() => setSyncStatus(""), 3000)
      } else {
        setSyncStatus(result.message)
      }
    } catch (error) {
      setSyncStatus(error instanceof Error ? error.message : "Sync failed")
    } finally {
      setIsSyncing(false)
    }
  }

  const services = state.services || []

  const renderServices = () => (
    <div className="grid gap-4">
      {services.length === 0 ? (
        <Card className="border border-border/40 bg-card/50 p-12 text-center">
          <p className="text-foreground/60">{language === "ar" ? "لا توجد خدمات" : "No services found"}</p>
        </Card>
      ) : (
        services.map((service) => (
          <Card
            key={service.id}
            className="border border-border/40 bg-card/50 p-6 hover:border-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{language === "ar" ? service.nameAr : service.nameEn}</h3>
                <p className="mt-2 text-sm text-foreground/60">
                  {language === "ar" ? service.descriptionAr : service.descriptionEn}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-foreground/50">
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded">{service.category}</span>
                  <span className="font-semibold">
                    {service.currency} {service.price}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/services/${service.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === "ar" ? "إدارة الخدمات" : "Services Management"}
          </h1>
          <p className="mt-2 text-foreground/60">
            {language === "ar" ? `لديك ${services.length} خدمة` : `You have ${services.length} services`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSync}
            disabled={isSyncing || !state.isDirty}
            className="gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {isSyncing ? "Syncing..." : language === "ar" ? "مزامنة" : "Sync"}
          </Button>
          <Link href="/admin/services/new">
            <Button className="gap-2 bg-accent hover:bg-accent/90">
              <Plus className="h-4 w-4" />
              {language === "ar" ? "خدمة جديدة" : "New Service"}
            </Button>
          </Link>
        </div>
      </div>

      {state.isDirty && !syncStatus && (
        <Card className="mb-6 border border-orange-500/40 bg-orange-500/10 p-4">
          <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
            <AlertCircle className="h-4 w-4" />
            <p>{language === "ar" ? "لديك تغييرات غير محفوظة" : "You have unsaved changes"}</p>
          </div>
        </Card>
      )}

      {syncStatus && (
        <Card className="mb-6 border border-border/40 bg-accent/10 p-4">
          <p className="text-sm text-foreground">{syncStatus}</p>
        </Card>
      )}

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all" className="gap-2">
            {language === "ar" ? "الكل" : "All"}
          </TabsTrigger>
          <TabsTrigger value="bookings" className="gap-2">
            <Calendar className="h-4 w-4" />
            {language === "ar" ? "الحجوزات" : "Bookings"}
          </TabsTrigger>
          <TabsTrigger value="reviews" className="gap-2">
            <Star className="h-4 w-4" />
            {language === "ar" ? "التقييمات" : "Reviews"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderServices()}</TabsContent>

        <TabsContent value="bookings">
          <Card className="border border-border/40 bg-card/50 p-12 text-center">
            <Calendar className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
            <p className="text-foreground/60">
              {language === "ar" ? "إدارة الحجوزات قريباً" : "Bookings management coming soon"}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="border border-border/40 bg-card/50 p-12 text-center">
            <Star className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
            <p className="text-foreground/60">
              {language === "ar" ? "إدارة التقييمات قريباً" : "Reviews management coming soon"}
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
