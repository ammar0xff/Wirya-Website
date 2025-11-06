"use client"

import { useTheme } from "@/lib/theme-provider"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, Clock, X, AlertCircle } from "lucide-react"
import type { ServiceBooking } from "@/lib/site-content"

export default function ServiceBookings() {
  const { language } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [bookings, setBookings] = useState<ServiceBooking[]>([])
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all")
  const [saveStatus, setSaveStatus] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const saved = localStorage.getItem("service_bookings_data")
    if (saved) {
      setBookings(JSON.parse(saved))
    }
  }, [mounted])

  const handleStatusChange = (id: string, newStatus: ServiceBooking["status"]) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    setBookings(updated)
    localStorage.setItem("service_bookings_data", JSON.stringify(updated))
    setSaveStatus("Status updated")
    setTimeout(() => setSaveStatus(""), 2000)
  }

  const handleDelete = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id))
    localStorage.setItem("service_bookings_data", JSON.stringify(bookings.filter((b) => b.id !== id)))
  }

  const filteredBookings = statusFilter === "all" ? bookings : bookings.filter((b) => b.status === statusFilter)

  const getStatusColor = (status: ServiceBooking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-600 dark:text-green-400"
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      case "completed":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      case "cancelled":
        return "bg-red-500/10 text-red-600 dark:text-red-400"
    }
  }

  const getStatusIcon = (status: ServiceBooking["status"]) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "cancelled":
        return <X className="h-4 w-4" />
    }
  }

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  return (
    <div className="pb-8 px-4 sm:px-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === "ar" ? "حجوزات الخدمات" : "Service Bookings"}
        </h1>
        <p className="text-sm sm:text-base text-foreground/60">
          {language === "ar" ? "إدارة حجوزات الخدمات من العملاء" : "Manage customer service bookings"}
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((status) => (
          <Button
            key={status}
            size="sm"
            variant={statusFilter === status ? "default" : "outline"}
            onClick={() => setStatusFilter(status)}
          >
            {status === "all" && (language === "ar" ? "الكل" : "All")}
            {status === "pending" && (language === "ar" ? "قيد الانتظار" : "Pending")}
            {status === "confirmed" && (language === "ar" ? "مؤكد" : "Confirmed")}
            {status === "completed" && (language === "ar" ? "مكتمل" : "Completed")}
            {status === "cancelled" && (language === "ar" ? "ملغى" : "Cancelled")}
          </Button>
        ))}
      </div>

      {saveStatus && (
        <Card className="mb-6 border border-border/40 bg-accent/10 p-3">
          <p className="text-sm text-foreground">{saveStatus}</p>
        </Card>
      )}

      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="border border-border/40 bg-card/50 p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-foreground">
                      {language === "ar" ? booking.clientNameAr : booking.clientNameEn}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status === "pending" && (language === "ar" ? "قيد الانتظار" : "Pending")}
                      {booking.status === "confirmed" && (language === "ar" ? "مؤكد" : "Confirmed")}
                      {booking.status === "completed" && (language === "ar" ? "مكتمل" : "Completed")}
                      {booking.status === "cancelled" && (language === "ar" ? "ملغى" : "Cancelled")}
                    </span>
                  </div>
                  <div className="text-sm text-foreground/60 space-y-1">
                    <p>{booking.email}</p>
                    <p>{booking.phone}</p>
                    <p>{new Date(booking.date).toLocaleDateString(language === "ar" ? "ar" : "en")}</p>
                    {booking.notes && <p className="italic">{booking.notes}</p>}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap justify-end">
                  {booking.status !== "confirmed" && (
                    <Button size="sm" variant="outline" onClick={() => handleStatusChange(booking.id, "confirmed")}>
                      {language === "ar" ? "تأكيد" : "Confirm"}
                    </Button>
                  )}
                  {booking.status === "confirmed" && (
                    <Button size="sm" variant="outline" onClick={() => handleStatusChange(booking.id, "completed")}>
                      {language === "ar" ? "إكمال" : "Complete"}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-600 bg-transparent"
                    onClick={() => handleDelete(booking.id)}
                  >
                    {language === "ar" ? "حذف" : "Delete"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border border-border/40 bg-card/50 p-12 text-center">
          <AlertCircle className="h-12 w-12 text-foreground/20 mx-auto mb-3" />
          <p className="text-foreground/60">{language === "ar" ? "لا توجد حجوزات" : "No bookings found"}</p>
        </Card>
      )}
    </div>
  )
}
