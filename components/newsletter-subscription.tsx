"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Mail, CheckCircle2, AlertCircle, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NewsletterSubscriptionProps {
  title?: string
  description?: string
  placeholder?: string
  className?: string
}

export function NewsletterSubscription({
  title,
  description,
  placeholder,
  className = "",
}: NewsletterSubscriptionProps) {
  const { language } = useTheme()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const defaultTitle = language === "ar" ? "اشترك في نشرتنا البريدية" : "Subscribe to Our Newsletter"
  const defaultDesc =
    language === "ar"
      ? "احصل على أحدث الأخبار والعروض الحصرية مباشرة إلى بريدك الإلكتروني"
      : "Get the latest news and exclusive offers delivered to your inbox"
  const defaultPlaceholder = language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email address"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage(language === "ar" ? "الرجاء إدخال بريد إلكتروني صحيح" : "Please enter a valid email")
      setTimeout(() => setStatus("idle"), 3000)
      return
    }

    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, language }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || (language === "ar" ? "شكراً لاشتراكك!" : "Thank you for subscribing!"))
        setEmail("")
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setMessage(data.message || (language === "ar" ? "حدث خطأ ما" : "Something went wrong"))
        setTimeout(() => setStatus("idle"), 3000)
      }
    } catch (error) {
      setStatus("error")
      setMessage(language === "ar" ? "فشل الاتصال بالخادم" : "Connection failed")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-3">
        {(title || defaultTitle) && (
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">{title || defaultTitle}</h3>
        )}
        {(description || defaultDesc) && <p className="text-sm text-foreground/60">{description || defaultDesc}</p>}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder || defaultPlaceholder}
          disabled={status === "loading"}
          className="bg-input border-border flex-1"
          dir={language === "ar" ? "rtl" : "ltr"}
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className="bg-accent hover:bg-accent/90 text-white gap-2 whitespace-nowrap px-6"
        >
          {status === "loading" ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              {language === "ar" ? "جاري..." : "Loading..."}
            </>
          ) : (
            <>
              <Mail className="h-4 w-4" />
              {language === "ar" ? "اشترك" : "Subscribe"}
            </>
          )}
        </Button>
      </form>

      {message && (
        <div
          className={`mt-3 p-3 rounded-lg text-sm flex items-start gap-2 ${
            status === "success"
              ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
          }`}
        >
          {status === "success" ? (
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
