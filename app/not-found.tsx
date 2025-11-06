"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "@/lib/theme-provider"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  const { language } = useTheme()

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <AlertTriangle className="h-20 w-20 text-accent mx-auto mb-6 opacity-80" />

          <h1 className="text-6xl font-bold text-foreground mb-4">{language === "ar" ? "404" : "404"}</h1>

          <p className="text-2xl font-semibold text-foreground mb-2">
            {language === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
          </p>

          <p className="text-foreground/60 mb-8 max-w-md mx-auto">
            {language === "ar"
              ? "عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد تكون الصفحة قد نُقلت أو حُذفت."
              : "Sorry, we couldn't find the page you're looking for. The page may have been moved or deleted."}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/">
              <Button size="lg">{language === "ar" ? "العودة للرئيسية" : "Go to Home"}</Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline">
                {language === "ar" ? "اقرأ المدونة" : "Read Blog"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
