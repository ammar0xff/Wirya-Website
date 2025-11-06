"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Check, X } from "lucide-react"

interface CategoryItemProps {
  id: string
  nameAr: string
  nameEn: string
  onUpdate: (nameAr: string, nameEn: string) => void
  onDelete: () => void
  isDeleting?: boolean
}

export function CategoryItem({ id, nameAr, nameEn, onUpdate, onDelete, isDeleting = false }: CategoryItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ nameAr, nameEn })

  const handleSave = () => {
    if (!editData.nameAr.trim() || !editData.nameEn.trim()) return
    onUpdate(editData.nameAr, editData.nameEn)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ nameAr, nameEn })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="p-4 border border-border rounded-lg space-y-4 bg-accent/5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Arabic Name</Label>
            <Input value={editData.nameAr} onChange={(e) => setEditData({ ...editData, nameAr: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>English Name</Label>
            <Input value={editData.nameEn} onChange={(e) => setEditData({ ...editData, nameEn: e.target.value })} />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Check className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors group">
      <div className="flex-1 space-y-1">
        <div className="font-medium text-foreground">{nameAr}</div>
        <div className="text-sm text-foreground/60">{nameEn}</div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete} disabled={isDeleting}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
