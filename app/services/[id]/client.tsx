"use client"

import { useState } from "react"
import { useTheme } from "@/lib/theme-provider"
import type { Service } from "@/lib/services"
import { Header } from "@/components/navigation/header"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FadeIn } from "@/components/animations/fade-in"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ServiceDetailPageClientProps {
  service: Service | undefined
  params: { id: string }
}

export default function ServiceDetailPageClient({ service, params }: ServiceDetailPageClientProps) {
  const { language } = useTheme()
  const t = translations[language]
  const [selectedOption, setSelectedOption] = useState(0)

  if (!service) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <p className="text-foreground/50">{language === "ar" ? "الخدمة غير موجودة" : "Service not found"}</p>
        </div>
        <Footer />
        <MobileNav />
      </main>
    )
  }

  const selectedOpt = service.options[selectedOption] || {
    id: "default",
    nameAr: "الخيار الافتراضي",
    nameEn: "Default Option",
    priceModifier: 0,
  }
  const totalPrice = service.price + (selectedOpt?.priceModifier || 0)

  const handleOrderNow = () => {
    const optionName = language === "ar" ? selectedOpt.nameAr : selectedOpt.nameEn
    const serviceName = language === "ar" ? service.nameAr : service.nameEn
    const message = encodeURIComponent(
      language === "ar"
        ? `أريد طلب الخدمة: ${serviceName}\nالخيار: ${optionName}\nالسعر الإجمالي: ${totalPrice} ${service.currency}`
        : `I want to order: ${serviceName}\nOption: ${optionName}\nTotal Price: ${totalPrice} ${service.currency}`,
    )

    let whatsappUrl = service.whatsappLink

    // Check if the link already has query parameters
    if (whatsappUrl.includes("?")) {
      // Already has query params, append with &
      whatsappUrl = `${whatsappUrl}&text=${message}`
    } else {
      // No query params yet, append with ?
      whatsappUrl = `${whatsappUrl}?text=${message}`
    }

    window.open(whatsappUrl, "_blank")
  }

  const features = [
    language === "ar" ? "احترافي" : "Professional",
    language === "ar" ? "آمن" : "Secure",
    language === "ar" ? "سريع" : "Fast",
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border/40 px-4 py-4">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/services"
            className="flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            {language === "ar" ? "العودة للخدمات" : "Back to Services"}
          </Link>
        </div>
      </div>

      <section className="px-4 py-12">
        <FadeIn>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Product Image */}
              <div className="flex flex-col gap-4">
                <div className="relative h-96 w-full overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-primary/10 to-accent/10">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={language === "ar" ? service.nameAr : service.nameEn}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-foreground">
                    {language === "ar" ? service.nameAr : service.nameEn}
                  </h1>
                  <p className="text-foreground/70 leading-relaxed">
                    {language === "ar" ? service.descriptionAr : service.descriptionEn}
                  </p>
                </div>

                {/* Price Display */}
                <div className="rounded-lg border border-accent/20 bg-accent/5 p-6">
                  <div className="mb-2 text-sm text-foreground/60">
                    {language === "ar" ? "السعر الإجمالي" : "Total Price"}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-accent">{totalPrice}</span>
                    <span className="text-lg text-foreground/50">{service.currency}</span>
                  </div>
                </div>

                {/* Options Selector */}
                {service.options.length > 0 && (
                  <div>
                    <h3 className="mb-4 font-semibold text-foreground">
                      {language === "ar" ? "اختر الباقة" : "Select Package"}
                    </h3>
                    <div className="space-y-2">
                      {service.options.map((option, idx) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-300 ${
                            selectedOption === idx
                              ? "border-accent bg-accent/10"
                              : "border-border/40 bg-card/50 hover:border-accent/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-foreground">
                                {language === "ar" ? option.nameAr : option.nameEn}
                              </div>
                              <div className="text-sm text-foreground/60">
                                {option.priceModifier > 0
                                  ? `+${option.priceModifier} ${service.currency}`
                                  : language === "ar"
                                    ? "السعر الأساسي"
                                    : "Base price"}
                              </div>
                            </div>
                            <div className="h-5 w-5 rounded-full border-2 border-accent">
                              {selectedOption === idx && <div className="h-full w-full rounded-full bg-accent" />}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order Button */}
                <Button
                  size="lg"
                  onClick={handleOrderNow}
                  className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
                >
                  <MessageCircle className="h-5 w-5" />
                  {language === "ar" ? "اطلب الآن عبر WhatsApp" : "Order Now via WhatsApp"}
                </Button>

                <p className="text-xs text-foreground/50 text-center">
                  {language === "ar"
                    ? "سيتم توجيهك إلى WhatsApp لإتمام الطلب"
                    : "You will be redirected to WhatsApp to complete your order"}
                </p>
              </div>
            </div>

            {(service.longDescriptionAr || service.longDescriptionEn) && (
              <div className="mt-16 border-t border-border/40 pt-16">
                <MarkdownRenderer
                  content={language === "ar" ? service.longDescriptionAr || "" : service.longDescriptionEn || ""}
                />
              </div>
            )}

            {!service.longDescriptionAr &&
              !service.longDescriptionEn &&
              (service.detailedDescAr || service.detailedDescEn) && (
                <div className="mt-16 border-t border-border/40 pt-16">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {language === "ar" ? "تفاصيل الخدمة" : "Service Details"}
                  </h2>
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    {language === "ar" ? service.detailedDescAr : service.detailedDescEn}
                  </p>
                </div>
              )}
          </div>
        </FadeIn>
      </section>

      <Footer />
      <ScrollToTop />

      {/* Mobile spacing for bottom nav */}
      <div className="h-20 md:h-0" />
      <MobileNav />
    </main>
  )
}
