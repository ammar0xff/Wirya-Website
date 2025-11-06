"use client"

import { useTheme } from "@/lib/theme-provider"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function GitHubSettings() {
  const { language } = useTheme()
  const [status, setStatus] = useState<"checking" | "configured" | "missing">("checking")

  useEffect(() => {
    // Check if GitHub is configured by testing the API
    fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filePath: "test",
        content: "test",
        commitMessage: "test",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message?.includes("configuration missing")) {
          setStatus("missing")
        } else {
          setStatus("configured")
        }
      })
      .catch(() => setStatus("missing"))
  }, [])

  return (
    <div className="space-y-8">
      <Link href="/admin/settings" className="flex items-center gap-2 text-accent hover:text-accent/80">
        <ArrowLeft className="h-4 w-4" />
        {language === "ar" ? "العودة" : "Back"}
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {language === "ar" ? "إعدادات GitHub" : "GitHub Settings"}
        </h1>
        <p className="text-foreground/60">
          {language === "ar" ? "حالة اتصال GitHub لمزامنة التغييرات" : "GitHub connection status for syncing changes"}
        </p>
      </div>

      <Card className="border border-border/40 bg-card/50 p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {status === "checking" && (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                <span className="text-foreground">
                  {language === "ar" ? "جاري التحقق من الاتصال..." : "Checking connection..."}
                </span>
              </>
            )}
            {status === "configured" && (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-foreground">
                  {language === "ar" ? "GitHub متصل بنجاح" : "GitHub connected successfully"}
                </span>
              </>
            )}
            {status === "missing" && (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-foreground">
                  {language === "ar" ? "GitHub غير متصل" : "GitHub not connected"}
                </span>
              </>
            )}
          </div>

          {status === "missing" && (
            <Card className="border border-orange-500/40 bg-orange-500/10 p-4">
              <h3 className="font-semibold text-foreground mb-2">
                {language === "ar" ? "الإعداد المطلوب" : "Setup Required"}
              </h3>
              <p className="text-sm text-foreground/80 mb-4">
                {language === "ar"
                  ? "يجب تكوين متغيرات البيئة التالية في إعدادات Vercel:"
                  : "The following environment variables must be configured in Vercel settings:"}
              </p>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="font-mono">GITHUB_TOKEN</li>
                <li className="font-mono">GITHUB_OWNER</li>
                <li className="font-mono">GITHUB_REPO</li>
              </ul>
              <p className="text-sm text-foreground/60 mt-4">
                {language === "ar"
                  ? "راجع ملف SETUP.md للحصول على تعليمات مفصلة"
                  : "See SETUP.md for detailed instructions"}
              </p>
            </Card>
          )}

          {status === "configured" && (
            <Card className="border border-green-500/40 bg-green-500/10 p-4">
              <h3 className="font-semibold text-foreground mb-2">
                {language === "ar" ? "كيف تعمل المزامنة" : "How Sync Works"}
              </h3>
              <ol className="space-y-2 text-sm text-foreground/80">
                <li>
                  {language === "ar" ? "1. قم بتحرير المحتوى في لوحة الإدارة" : "1. Edit content in the admin panel"}
                </li>
                <li>
                  {language === "ar"
                    ? "2. انقر على زر 'مزامنة' لحفظ التغييرات"
                    : "2. Click 'Sync' button to save changes"}
                </li>
                <li>
                  {language === "ar"
                    ? "3. يتم حفظ التغييرات مباشرة في GitHub"
                    : "3. Changes are committed directly to GitHub"}
                </li>
                <li>
                  {language === "ar"
                    ? "4. Vercel يعيد بناء الموقع تلقائياً"
                    : "4. Vercel automatically rebuilds your site"}
                </li>
              </ol>
            </Card>
          )}
        </div>
      </Card>

      <Card className="border border-border/40 bg-card/50 p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">{language === "ar" ? "الأمان" : "Security"}</h2>
        <div className="space-y-3 text-sm text-foreground/80">
          <p>
            {language === "ar"
              ? "✅ يتم تخزين بيانات GitHub على الخادم فقط ولا يتم إرسالها إلى المتصفح"
              : "✅ GitHub credentials are stored server-side only and never sent to the browser"}
          </p>
          <p>
            {language === "ar"
              ? "✅ جميع عمليات المزامنة تتم عبر API آمن"
              : "✅ All sync operations go through secure API routes"}
          </p>
          <p>
            {language === "ar"
              ? "✅ لا يمكن الوصول إلى التوكن من كود JavaScript"
              : "✅ Tokens are never accessible from JavaScript code"}
          </p>
        </div>
      </Card>
    </div>
  )
}
