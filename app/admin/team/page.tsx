"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { type TeamMember, teamData as defaultData } from "@/lib/site-content"

export default function TeamManager() {
  const { language } = useTheme()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    roleAr: "",
    roleEn: "",
    bio: "",
    email: "",
    department: "",
    imageUrl: "",
  })

  useEffect(() => {
    setMounted(true)
    setMembers(defaultData.members)
  }, [])

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  const handleAddMember = () => {
    if (editingId) {
      setMembers(members.map((m) => (m.id === editingId ? { ...m, ...formData } : m)))
      setEditingId(null)
    } else {
      const newMember: TeamMember = {
        id: `member-${Date.now()}`,
        ...formData,
        socialLinks: {},
        order: members.length + 1,
      }
      setMembers([...members, newMember])
    }
    setFormData({
      nameAr: "",
      nameEn: "",
      roleAr: "",
      roleEn: "",
      bio: "",
      email: "",
      department: "",
      imageUrl: "",
    })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    if (confirm(language === "ar" ? "هل تريد حذف هذا العضو؟" : "Delete this member?")) {
      setMembers(members.filter((m) => m.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{language === "ar" ? "إدارة الفريق" : "Manage Team"}</h1>
          <p className="mt-2 text-foreground/60">
            {language === "ar" ? `${members.length} عضو فريق` : `${members.length} team members`}
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2 bg-accent">
          <Plus className="h-4 w-4" />
          {language === "ar" ? "إضافة عضو" : "Add Member"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 p-6 border border-border/40">
          <div className="space-y-4">
            <input
              type="text"
              placeholder={language === "ar" ? "الاسم (عربي)" : "Name (Arabic)"}
              value={formData.nameAr}
              onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <input
              type="text"
              placeholder={language === "ar" ? "الاسم (إنجليزي)" : "Name (English)"}
              value={formData.nameEn}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <input
              type="text"
              placeholder={language === "ar" ? "القسم" : "Department"}
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-border/40 rounded bg-background text-foreground"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddMember}>{language === "ar" ? "حفظ" : "Save"}</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                {language === "ar" ? "إلغاء" : "Cancel"}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {members.map((member) => (
          <Card key={member.id} className="p-4 border border-border/40">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{language === "ar" ? member.nameAr : member.nameEn}</h3>
                <p className="text-sm text-foreground/60 mt-1">{language === "ar" ? member.roleAr : member.roleEn}</p>
                <p className="text-xs text-foreground/50 mt-1">{member.email}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(member.id)
                    setShowForm(true)
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(member.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
