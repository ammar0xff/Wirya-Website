"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ServiceBooking } from "@/lib/site-content"

interface BookingFormProps {
  serviceId: string
  serviceName: string
}

export function BookingForm({ serviceId, serviceName }: BookingFormProps) {
  const { language } = useTheme()
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    date: "",
    notes: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const booking: ServiceBooking = {
      id: `booking-${Date.now()}`,
      clientNameAr: formData.clientName,
      clientNameEn: formData.clientName,
      email: formData.email,
      phone: formData.phone,
      serviceId,
      date: formData.date,
      status: "pending",
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    }
    console.log("Booking created:", booking)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ clientName: "", email: "", phone: "", date: "", notes: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <Card className="p-6 border border-border/40">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {language === "ar" ? "احجز هذه الخدمة" : "Book This Service"}
      </h3>
      {submitted ? (
        <div className="text-center py-8">
          <p className="text-green-600 dark:text-green-400 font-medium">
            {language === "ar" ? "تم استقبال حجزك بنجاح!" : "Your booking has been received!"}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder={language === "ar" ? "اسمك" : "Your Name"}
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            type="tel"
            placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <textarea
            placeholder={language === "ar" ? "ملاحظات" : "Notes"}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
            {language === "ar" ? "إرسال الحجز" : "Submit Booking"}
          </Button>
        </form>
      )}
    </Card>
  )
}
