"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, Code } from "lucide-react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
}

export function MarkdownEditor({ value, onChange, language = "en" }: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false)

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.querySelector(`textarea`) as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selected = text.substring(start, end)

    const newText = text.substring(0, start) + before + selected + after + text.substring(end)
    onChange(newText)

    setTimeout(() => {
      textarea.selectionStart = start + before.length
      textarea.selectionEnd = start + before.length + selected.length
      textarea.focus()
    }, 0)
  }

  const toolbar = [
    { icon: Bold, label: "Bold", before: "**", after: "**" },
    { icon: Italic, label: "Italic", before: "*", after: "*" },
    { icon: List, label: "List", before: "- ", after: "" },
    { icon: Code, label: "Code", before: "`", after: "`" },
  ]

  return (
    <div className="space-y-3">
      <div className="flex gap-2 border-b border-border/40 pb-3">
        {toolbar.map((tool) => {
          const Icon = tool.icon
          return (
            <Button
              key={tool.label}
              variant="outline"
              size="sm"
              onClick={() => insertMarkdown(tool.before, tool.after)}
              title={tool.label}
            >
              <Icon className="h-4 w-4" />
            </Button>
          )
        })}
      </div>

      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="space-y-3">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your post in Markdown..."
            className="w-full h-96 px-3 py-2 bg-input border border-border rounded-md text-foreground font-mono text-sm resize-vertical"
          />
          <p className="text-xs text-foreground/50">
            Markdown formatting is supported. Use **bold**, *italic*, - for lists, and `code` for inline code.
          </p>
        </TabsContent>

        <TabsContent value="preview" className="p-4 border border-border/40 rounded-md min-h-96 prose prose-invert">
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(value) }} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function convertMarkdownToHtml(markdown: string): string {
  const html = markdown
    .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/^- (.*?)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/\n/g, "<br/>")

  return html
}
