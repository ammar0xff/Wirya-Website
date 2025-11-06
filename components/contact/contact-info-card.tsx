"use client"

import type { ReactNode } from "react"

interface ContactInfoCardProps {
  icon: ReactNode
  title: string
  content: string | ReactNode
  href?: string
}

export function ContactInfoCard({ icon, title, content, href }: ContactInfoCardProps) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        {href ? (
          <a href={href} className="text-accent hover:underline text-base">
            {content}
          </a>
        ) : (
          <p className="text-foreground/70">{content}</p>
        )}
      </div>
    </div>
  )
}
