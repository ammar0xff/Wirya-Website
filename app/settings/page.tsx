"use client"

import { useTheme } from "@/lib/theme-provider"
import { Header } from "@/components/navigation/header"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { translations, type Language, supportedLanguages } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Globe } from "lucide-react"

export default function SettingsPage() {
  const { language, setLanguage, theme, toggleTheme } = useTheme()
  const t = translations[language]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="border-b border-border/40 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {language === "ar" ? "الإعدادات" : "Settings"}
          </h1>
          <p className="mt-2 text-foreground/70">
            {language === "ar" ? "إدارة تفضيلاتك الشخصية" : "Manage your preferences"}
          </p>
        </div>
      </section>

      {/* Settings Content */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Language Settings */}
          <div className="rounded-lg border border-border/40 bg-card/50 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Globe className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">{t.settings.language}</h2>
            </div>

            <div className="space-y-3">
              {supportedLanguages.map((lang) => {
                const langName = lang === "ar" ? "العربية" : "English"
                return (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as Language)}
                    className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                      language === lang
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border/40 bg-background/50 text-foreground hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{langName}</span>
                      {language === lang && <span className="text-accent">✓</span>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Theme Settings */}
          <div className="rounded-lg border border-border/40 bg-card/50 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              {theme === "dark" ? <Moon className="h-6 w-6 text-accent" /> : <Sun className="h-6 w-6 text-accent" />}
              <h2 className="text-2xl font-bold text-foreground">{t.settings.theme}</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => {
                  if (theme !== "light") toggleTheme()
                }}
                className={`flex flex-col items-center gap-3 rounded-lg border-2 p-6 transition-all ${
                  theme === "light"
                    ? "border-accent bg-accent/10"
                    : "border-border/40 bg-background/50 hover:border-accent/50"
                }`}
              >
                <Sun className="h-8 w-8" />
                <span className="font-medium">{t.settings.light}</span>
              </button>

              <button
                onClick={() => {
                  if (theme !== "dark") toggleTheme()
                }}
                className={`flex flex-col items-center gap-3 rounded-lg border-2 p-6 transition-all ${
                  theme === "dark"
                    ? "border-accent bg-accent/10"
                    : "border-border/40 bg-background/50 hover:border-accent/50"
                }`}
              >
                <Moon className="h-8 w-8" />
                <span className="font-medium">{t.settings.dark}</span>
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="rounded-lg border border-border/40 bg-card/50 p-6 md:p-8">
            <h2 className="mb-4 text-lg font-bold text-foreground">
              {language === "ar" ? "معلومات التطبيق" : "About"}
            </h2>
            <div className="space-y-2 text-sm text-foreground/70">
              <p>
                <span className="font-medium text-foreground">Version:</span> 1.0.0
              </p>
              <p>
                <span className="font-medium text-foreground">{language === "ar" ? "الشركة" : "Company"}:</span> Werya
              </p>
              <p>
                <span className="font-medium text-foreground">{language === "ar" ? "الموقع" : "Website"}:</span>{" "}
                www.werya.com
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-accent hover:bg-accent/90">{t.settings.save}</Button>
          </div>
        </div>
      </section>

      {/* Mobile spacing for bottom nav */}
      <div className="h-20 md:h-0" />
      <MobileNav />
    </main>
  )
}
