"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-provider"
import { FadeIn } from "@/components/animations/fade-in"
import { ScaleOnScroll } from "@/components/animations/scale-on-scroll"
import { services as importedServices, serviceCategories as importedCategories } from "@/lib/services"
import { translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function ServicesClient() {
  const { language } = useTheme()
  const t = translations[language]
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const services = importedServices || []
  const serviceCategories = importedCategories || []

  const filteredServices = useMemo(() => {
    if (!services || services.length === 0) return []

    return services.filter((service) => {
      const matchesSearch =
        language === "ar"
          ? service.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase())
          : service.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || service.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, language, services])

  return (
    <>
      {/* Page Header */}
      <section className="border-b border-border/40 px-4 py-12 md:py-16">
        <FadeIn>
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">{t.services.title}</h1>
            <p className="text-foreground/70">
              {language === "ar"
                ? "استكشف خدماتنا المتنوعة واختر ما يناسب احتياجاتك"
                : "Explore our diverse services and choose what suits your needs"}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Search and Filter */}
      <section className="border-b border-border/40 px-4 py-6">
        <FadeIn delay={100}>
          <div className="mx-auto max-w-6xl space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50" />
              <Input
                placeholder={language === "ar" ? "ابحث عن خدمة..." : "Search services..."}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                {language === "ar" ? "الكل" : "All"}
              </Button>
              {serviceCategories &&
                serviceCategories.length > 0 &&
                serviceCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {language === "ar" ? cat.nameAr : cat.nameEn}
                  </Button>
                ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Services Grid - E-commerce Style */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {filteredServices.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service, idx) => (
                <ScaleOnScroll key={service.id} delay={idx * 50}>
                  <Link href={`/services/${service.id}`}>
                    <div className="group overflow-hidden rounded-xl border border-border/40 bg-card/50 transition-all duration-300 hover:border-accent/50 hover:bg-card/80 hover:shadow-xl hover:shadow-accent/10 cursor-pointer h-full flex flex-col">
                      {/* Product Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={language === "ar" ? service.nameAr : service.nameEn}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col flex-grow p-6">
                        <h3 className="mb-2 font-semibold text-foreground line-clamp-2">
                          {language === "ar" ? service.nameAr : service.nameEn}
                        </h3>
                        <p className="mb-4 text-sm text-foreground/60 line-clamp-2">
                          {language === "ar" ? service.descriptionAr : service.descriptionEn}
                        </p>

                        {/* Price */}
                        <div className="mb-4 mt-auto">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-accent">{service.price}</span>
                            <span className="text-sm text-foreground/50">{service.currency}</span>
                          </div>
                          <p className="text-xs text-foreground/40">
                            {language === "ar" ? "السعر الأساسي" : "Starting price"}
                          </p>
                        </div>

                        {/* Options Badge */}
                        {service.options && service.options.length > 0 && (
                          <div className="mb-4 inline-block">
                            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                              {language === "ar"
                                ? `${service.options.length} خيارات متاحة`
                                : `${service.options.length} options available`}
                            </span>
                          </div>
                        )}

                        {/* CTA Button */}
                        <Button className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300">
                          <ShoppingCart className="h-4 w-4" />
                          {language === "ar" ? "اعرض التفاصيل" : "View Details"}
                        </Button>
                      </div>
                    </div>
                  </Link>
                </ScaleOnScroll>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="flex justify-center py-12">
                <p className="text-foreground/50">
                  {language === "ar" ? "لم يتم العثور على خدمات" : "No services found"}
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  )
}
