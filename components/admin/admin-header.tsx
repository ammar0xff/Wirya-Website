"use client"

import { useTheme } from "@/lib/theme-provider"
import { Button } from "@/components/ui/button"
import { LogOut, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContentManager } from "@/hooks/use-content-manager"
import { SyncService } from "@/lib/sync-service"
import { useState } from "react"

export function AdminHeader() {
  const { language } = useTheme()
  const router = useRouter()
  const { state, manager } = useContentManager()
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<string>("")

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const handleSyncAll = async () => {
    setIsSyncing(true)
    setSyncStatus(language === "ar" ? "جاري المزامنة..." : "Syncing...")

    try {
      const results = await SyncService.syncAll(
        state.blogPosts,
        state.blogCategories,
        state.services,
        state.serviceCategories,
        state.aboutContent,
        state.contactContent,
        state.storyContent,
        state.footerContent,
        state.siteSettings,
      )

      const allSuccess = Object.values(results).every((r) => r.success)

      if (allSuccess) {
        manager.markSynced()
        setSyncStatus(language === "ar" ? "تمت المزامنة بنجاح!" : "Synced successfully!")
      } else {
        const failedSyncs = Object.entries(results)
          .filter(([_, r]) => !r.success)
          .map(([key]) => key)
        setSyncStatus(
          language === "ar" ? `فشلت المزامنة: ${failedSyncs.join(", ")}` : `Sync failed: ${failedSyncs.join(", ")}`,
        )
      }
    } catch (error) {
      console.error("[v0] Sync error:", error)
      setSyncStatus(language === "ar" ? `خطأ: ${error}` : `Error: ${error}`)
    } finally {
      setIsSyncing(false)
      setTimeout(() => setSyncStatus(""), 3000)
    }
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-foreground">{language === "ar" ? "لوحة التحكم" : "Admin Panel"}</h1>
          {syncStatus && (
            <span
              className={`text-sm ${
                syncStatus.includes("Error") || syncStatus.includes("خطأ") || syncStatus.includes("فشلت")
                  ? "text-destructive"
                  : syncStatus.includes("Syncing") || syncStatus.includes("جاري")
                    ? "text-foreground/60"
                    : "text-accent"
              }`}
            >
              {syncStatus}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleSyncAll} disabled={isSyncing || !state.hasContent} variant="default" size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing
              ? language === "ar"
                ? "جاري المزامنة..."
                : "Syncing..."
              : language === "ar"
                ? "مزامنة الكل"
                : "Sync All"}
          </Button>

          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            {language === "ar" ? "تسجيل الخروج" : "Logout"}
          </Button>
        </div>
      </div>
    </header>
  )
}
