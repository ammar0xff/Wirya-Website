"use client"

import { useTheme } from "@/lib/theme-provider"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Upload, AlertCircle } from "lucide-react"
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

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === "ar" ? "إدارة الخدمات" : "Manage Services"}
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
              {language === "ar" ? "إضافة خدمة" : "Add Service"}
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

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="border border-border/40 bg-card/50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{language === "ar" ? service.nameAr : service.nameEn}</h3>
                <p className="mt-2 text-sm text-foreground/60">
                  {language === "ar" ? service.descriptionAr : service.descriptionEn}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-foreground/50">
                  <span>{service.category}</span>
                  <span>
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
        ))}
      </div>
    </div>
  )
}
