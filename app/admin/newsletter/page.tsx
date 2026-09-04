"use client"

import { useTheme } from "@/lib/theme-provider"
import { useState, useEffect } from "react"
import { useContentManager } from "@/hooks/use-content-manager"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Settings, Users, Download, Trash2, Eye, EyeOff } from "lucide-react"
import type { NewsletterSettings } from "@/lib/site-content"

export default function AdminNewsletter() {
  const { language } = useTheme()
  const { state } = useContentManager()
  const [mounted, setMounted] = useState(false)
  const [subscribers, setSubscribers] = useState<NewsletterSettings["subscriptions"]>([])
  const [emailConfig, setEmailConfig] = useState<NewsletterSettings["emailConfig"]>({
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPass: "",
    senderEmail: "noreply@wirya.com",
    senderName: "Wirya",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ type: string; message: string }>({ type: "", message: "" })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    // Load from localStorage
    const saved = localStorage.getItem("newsletter_settings")
    if (saved) {
      const parsed = JSON.parse(saved)
      setSubscribers(parsed.subscriptions || [])
      setEmailConfig(parsed.emailConfig || emailConfig)
    }
  }, [mounted])

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== id))
    setSaveStatus({ type: "success", message: "Subscriber removed" })
  }

  const handleExportCSV = () => {
    const csv = [
      ["Email", "Subscribed At", "Language", "Status"],
      ...subscribers.map((s) => [s.email, s.subscribedAt, s.language, s.status]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "subscribers.csv"
    a.click()
  }

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  return (
    <div className="pb-8 px-4 sm:px-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === "ar" ? "النشرة البريدية" : "Newsletter"}
        </h1>
        <p className="text-sm sm:text-base text-foreground/60">
          {language === "ar" ? "إدارة المشتركين والإعدادات البريدية" : "Manage subscribers and email settings"}
        </p>
      </div>

      <Tabs defaultValue="subscribers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 gap-2">
          <TabsTrigger value="subscribers" className="gap-2">
            <Users className="h-4 w-4" />
            {language === "ar" ? "المشتركون" : "Subscribers"}
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            {language === "ar" ? "الإعدادات" : "Settings"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers" className="space-y-4">
          <Card className="border border-border/40 bg-card/50 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {language === "ar" ? "المشتركون" : "Subscribers"}
                </h2>
                <p className="text-sm text-foreground/60">
                  {language === "ar"
                    ? `إجمالي المشتركين: ${subscribers.length}`
                    : `Total Subscribers: ${subscribers.length}`}
                </p>
              </div>
              <Button onClick={handleExportCSV} variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                {language === "ar" ? "تحميل CSV" : "Export CSV"}
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left py-3 px-4 font-semibold text-foreground/80">
                      {language === "ar" ? "البريد" : "Email"}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/80">
                      {language === "ar" ? "التاريخ" : "Date"}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/80">
                      {language === "ar" ? "اللغة" : "Language"}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/80">
                      {language === "ar" ? "الحالة" : "Status"}
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/80">
                      {language === "ar" ? "الإجراء" : "Action"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.length > 0 ? (
                    subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-border/20 hover:bg-card/50 transition">
                        <td className="py-3 px-4 text-foreground">{sub.email}</td>
                        <td className="py-3 px-4 text-foreground/60 text-xs">
                          {new Date(sub.subscribedAt).toLocaleDateString(language === "ar" ? "ar" : "en")}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded bg-accent/10 text-accent text-xs font-medium">
                            {sub.language === "ar" ? "العربية" : "English"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              sub.status === "active"
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                            }`}
                          >
                            {sub.status === "active"
                              ? language === "ar"
                                ? "نشط"
                                : "Active"
                              : language === "ar"
                                ? "ملغى"
                                : "Unsubscribed"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="text-red-500 hover:text-red-600 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-foreground/50">
                        {language === "ar" ? "لا توجد مشتركين حالياً" : "No subscribers yet"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="border border-border/40 bg-card/50 p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {language === "ar" ? "إعدادات البريد الإلكتروني" : "Email Configuration"}
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{language === "ar" ? "خادم SMTP" : "SMTP Server"}</Label>
                <Input
                  placeholder="smtp.gmail.com"
                  value={emailConfig.smtpHost}
                  onChange={(e) => setEmailConfig({ ...emailConfig, smtpHost: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>{language === "ar" ? "منفذ SMTP" : "SMTP Port"}</Label>
                <Input
                  type="number"
                  value={emailConfig.smtpPort}
                  onChange={(e) => setEmailConfig({ ...emailConfig, smtpPort: Number.parseInt(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>{language === "ar" ? "بريد المستخدم" : "Username"}</Label>
                <Input
                  placeholder="your-email@gmail.com"
                  value={emailConfig.smtpUser}
                  onChange={(e) => setEmailConfig({ ...emailConfig, smtpUser: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>{language === "ar" ? "كلمة المرور" : "Password"}</Label>
                <div className="flex gap-2">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={emailConfig.smtpPass}
                    onChange={(e) => setEmailConfig({ ...emailConfig, smtpPass: e.target.value })}
                    className="bg-input border-border flex-1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{language === "ar" ? "بريد المرسل" : "Sender Email"}</Label>
                <Input
                  type="email"
                  value={emailConfig.senderEmail}
                  onChange={(e) => setEmailConfig({ ...emailConfig, senderEmail: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>{language === "ar" ? "اسم المرسل" : "Sender Name"}</Label>
                <Input
                  value={emailConfig.senderName}
                  onChange={(e) => setEmailConfig({ ...emailConfig, senderName: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <Button className="mt-6 bg-accent hover:bg-accent/90 text-white">
              {language === "ar" ? "حفظ الإعدادات" : "Save Settings"}
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
