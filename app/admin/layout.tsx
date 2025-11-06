"use client"

import type React from "react"
import { Header } from "@/components/navigation/header"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AuthGuard } from "@/components/admin/auth-guard"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1">
            <div className="border-b border-border/40">
              <Header />
            </div>
            <main className="p-6">{children}</main>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
