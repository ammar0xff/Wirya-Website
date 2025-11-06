"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/lib/theme-provider"
import { MessageCircle, CheckCircle2 } from "lucide-react"

interface Comment {
  id: string
  author: string
  content: string
  date: string
  verified: boolean
}

interface BlogCommentsProps {
  postId: string
  comments: Comment[]
  onAddComment?: (comment: Omit<Comment, "id" | "date">) => void
}

export function BlogComments({ postId, comments, onAddComment }: BlogCommentsProps) {
  const { language } = useTheme()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && content) {
      onAddComment?.({
        author: name,
        content,
        verified: false,
      })
      setName("")
      setContent("")
      setShowForm(false)
    }
  }

  return (
    <div className="mt-12 border-t border-border/40 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-accent" />
        <h3 className="text-xl font-semibold text-foreground">
          {language === "ar" ? "التعليقات" : "Comments"} ({comments.length})
        </h3>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-4 border border-border/40">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{comment.author}</span>
                  {comment.verified && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                </div>
                <p className="text-xs text-foreground/50 mt-1">{new Date(comment.date).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-foreground/80">{comment.content}</p>
          </Card>
        ))}
      </div>

      <Button onClick={() => setShowForm(!showForm)} variant="outline" className="mt-6 w-full">
        {language === "ar" ? "أضف تعليقاً" : "Add Comment"}
      </Button>

      {showForm && (
        <Card className="mt-4 p-6 border border-border/40">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">{language === "ar" ? "الاسم" : "Name"}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full px-3 py-2 rounded border border-border/40 bg-background text-foreground text-sm"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">{language === "ar" ? "التعليق" : "Comment"}</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-2 w-full px-3 py-2 rounded border border-border/40 bg-background text-foreground text-sm min-h-[120px]"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">{language === "ar" ? "نشر" : "Post"}</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                {language === "ar" ? "إلغاء" : "Cancel"}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  )
}
