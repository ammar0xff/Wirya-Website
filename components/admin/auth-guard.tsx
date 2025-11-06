"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("adminToken")
    const isLoginPage = pathname === "/admin/login"

    if (!isAuthenticated && !isLoginPage) {
      router.push("/admin/login")
    } else if (isAuthenticated && isLoginPage) {
      router.push("/admin")
    }
  }, [router, pathname])

  return <>{children}</>
}
