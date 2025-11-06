"use client"

import { useState } from "react"
import type { FAQ } from "@/lib/site-content"
import { useTheme } from "@/lib/theme-provider"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

interface FAQSectionProps {
  faqs: FAQ[]
  category?: string
}

export function FAQSection({ faqs, category }: FAQSectionProps) {
  const { language } = useTheme()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredFaqs = category
    ? faqs.filter((faq) => faq.category === category && faq.status === "active")
    : faqs.filter((faq) => faq.status === "active")

  return (
    <div className="space-y-4">
      {filteredFaqs.map((faq) => (
        <Card key={faq.id} className="border border-border/40 overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-colors"
          >
            <h3 className="font-semibold text-foreground text-left">
              {language === "ar" ? faq.questionAr : faq.questionEn}
            </h3>
            <ChevronDown
              className={`h-5 w-5 text-foreground/60 transition-transform ${expandedId === faq.id ? "rotate-180" : ""}`}
            />
          </button>

          {expandedId === faq.id && (
            <div className="px-4 py-3 bg-card/50 border-t border-border/40">
              <p className="text-sm text-foreground/80">{language === "ar" ? faq.answerAr : faq.answerEn}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
