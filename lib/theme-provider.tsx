"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Language } from "./i18n"

interface ThemeContextType {
  theme: "light" | "dark"
  language: Language
  toggleTheme: () => void
  toggleLanguage: () => void
  setTheme: (theme: "light" | "dark") => void
  setLanguage: (lang: Language) => void
  isRTL: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<"light" | "dark">("dark")
  const [language, setLanguage] = useState<Language>("ar")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("werya-theme") as "light" | "dark" | null
    const savedLanguage = localStorage.getItem("werya-language") as Language | null

    setThemeState(savedTheme || "dark")
    setLanguage(savedLanguage || "ar")
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const html = document.documentElement
    if (theme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
    localStorage.setItem("werya-theme", theme)
  }, [theme, mounted])

  const handleSetTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme)
    localStorage.setItem("werya-theme", newTheme)
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"))
  }

  const toggleLanguage = () => {
    const newLanguage = language === "ar" ? "en" : "ar"
    handleSetLanguage(newLanguage)
  }

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("werya-language", lang)
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === "ar" ? "rtl" : "ltr"
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        language,
        toggleTheme,
        toggleLanguage,
        setTheme: handleSetTheme,
        setLanguage: handleSetLanguage,
        isRTL: language === "ar",
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  // During SSR or if used outside provider, return default values
  if (!context) {
    return {
      theme: "dark" as const,
      language: "ar" as Language,
      toggleTheme: () => {},
      toggleLanguage: () => {},
      setTheme: () => {},
      setLanguage: () => {},
      isRTL: true,
    }
  }

  return context
}
