"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-provider"
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { useState } from "react"

interface SocialShareProps {
  title: string
  url: string
  description: string
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const { language } = useTheme()
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 py-4 border-t border-b border-border/40">
      <Share2 className="h-4 w-4 text-foreground/60" />
      <span className="text-sm font-medium text-foreground">{language === "ar" ? "شارك:" : "Share:"}</span>
      <div className="flex gap-2 ml-auto">
        <Button size="sm" variant="outline" onClick={() => window.open(shareLinks.twitter, "_blank")} title="Twitter">
          <Twitter className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => window.open(shareLinks.facebook, "_blank")} title="Facebook">
          <Facebook className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => window.open(shareLinks.linkedin, "_blank")} title="LinkedIn">
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleCopy} title="Copy Link">
          {copied ? "✓" : "Copy"}
        </Button>
      </div>
    </div>
  )
}
