"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

interface CategoryFormProps {
  onSubmit: (data: { nameAr: string; nameEn: string }) => void
  isLoading?: boolean
  placeholderAr?: string
  placeholderEn?: string
  submitLabel?: string
}

export function CategoryForm({
  onSubmit,
  isLoading = false,
  placeholderAr = "الاسم بالعربية",
  placeholderEn = "English name",
  submitLabel = "Add",
}: CategoryFormProps) {
  const [data, setData] = useState({ nameAr: "", nameEn: "" })
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!data.nameAr.trim() || !data.nameEn.trim()) {
      setError("Please fill all fields")
      return
    }

    onSubmit(data)
    setData({ nameAr: "", nameEn: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nameAr">Arabic Name</Label>
          <Input
            id="nameAr"
            value={data.nameAr}
            onChange={(e) => setData({ ...data, nameAr: e.target.value })}
            placeholder={placeholderAr}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nameEn">English Name</Label>
          <Input
            id="nameEn"
            value={data.nameEn}
            onChange={(e) => setData({ ...data, nameEn: e.target.value })}
            placeholder={placeholderEn}
            disabled={isLoading}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={isLoading}>
        <Plus className="h-4 w-4 mr-2" />
        {submitLabel}
      </Button>
    </form>
  )
}
