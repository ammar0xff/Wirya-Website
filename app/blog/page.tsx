"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-provider"
import { getAllBlogPosts, getAllCategories, getAllSeries } from "@/lib/blog-loader"
import { Header } from "@/components/navigation/header"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FadeIn } from "@/components/animations/fade-in"
import { ScaleOnScroll } from "@/components/animations/scale-on-scroll"
import { translations } from "@/lib/i18n"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Clock, User, Tag, X, BookOpen } from "lucide-react"
import Image from "next/image"

export default function BlogPage() {
  const { language } = useTheme()
  const t = translations[language]
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSeries, setSelectedSeries] = useState("all")

  const blogPosts = getAllBlogPosts()
  const categories = getAllCategories()
  const series = getAllSeries()

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        language === "ar"
          ? post.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase())
          : post.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
      const matchesSeries = selectedSeries === "all" || post.series === selectedSeries

      return matchesSearch && matchesCategory && matchesSeries
    })
  }, [searchQuery, selectedCategory, selectedSeries, language, blogPosts])

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) + (selectedSeries !== "all" ? 1 : 0) + (searchQuery ? 1 : 0)

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedSeries("all")
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="border-b border-border/40 px-4 py-12 md:py-16">
        <FadeIn>
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                {language === "ar" ? "مدونتنا" : "Our Blog"}
              </h1>
            </div>
            <p className="text-foreground/70">
              {language === "ar"
                ? "اكتشف آخر المقالات والنصائح عن التكنولوجيا والتحول الرقمي"
                : "Discover the latest articles and tips about technology and digital transformation"}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Search and Filter */}
      <section className="border-b border-border/40 px-4 py-6">
        <FadeIn delay={100}>
          <div className="mx-auto max-w-6xl space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50" />
              <Input
                placeholder={language === "ar" ? "ابحث في المقالات..." : "Search articles..."}
                className="pl-10 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground/70">
                <Tag className="h-4 w-4" />
                {language === "ar" ? "التصنيفات" : "Categories"}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className="transition-all duration-200"
                >
                  {language === "ar" ? "الكل" : "All"}
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="transition-all duration-200"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Series Filter */}
            {series.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground/70">
                  <BookOpen className="h-4 w-4" />
                  {language === "ar" ? "السلاسل" : "Series"}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedSeries === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSeries("all")}
                    className="transition-all duration-200"
                  >
                    {language === "ar" ? "الكل" : "All"}
                  </Button>
                  {series.map((ser) => (
                    <Button
                      key={ser}
                      variant={selectedSeries === ser ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSeries(ser)}
                      className="transition-all duration-200"
                    >
                      {ser}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center justify-between rounded-lg border border-accent/20 bg-accent/5 px-4 py-2">
                <span className="text-sm text-foreground/70">
                  {language === "ar"
                    ? `${filteredPosts.length} مقالة من ${blogPosts.length}`
                    : `${filteredPosts.length} of ${blogPosts.length} articles`}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-2 text-accent hover:text-accent"
                >
                  <X className="h-4 w-4" />
                  {language === "ar" ? "مسح الفلاتر" : "Clear Filters"}
                </Button>
              </div>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, idx) => (
                <ScaleOnScroll key={post.id} delay={idx * 50}>
                  <Link href={`/blog/${post.id}`}>
                    <div className="group overflow-hidden rounded-xl border border-border/40 bg-card/50 transition-all duration-300 hover:border-accent/50 hover:bg-card/80 hover:shadow-xl hover:shadow-accent/10 cursor-pointer h-full flex flex-col">
                      {/* Post Image */}
                      {post.image && (
                        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={language === "ar" ? post.titleAr : post.titleEn}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}

                      {/* Post Info */}
                      <div className="flex flex-col flex-grow p-6">
                        {/* Category & Series Badges */}
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                            <Tag className="h-3 w-3" />
                            {post.category}
                          </span>
                          {post.series && (
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {post.series}
                            </span>
                          )}
                        </div>

                        <h3 className="mb-2 font-semibold text-foreground line-clamp-2">
                          {language === "ar" ? post.titleAr : post.titleEn}
                        </h3>
                        <p className="mb-4 flex-1 text-sm text-foreground/60 line-clamp-2">
                          {language === "ar" ? post.descriptionAr : post.descriptionEn}
                        </p>

                        {/* Meta Info */}
                        <div className="mt-auto space-y-2 pt-4 border-t border-border/20">
                          <div className="flex items-center justify-between text-xs text-foreground/50">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.date).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime} {language === "ar" ? "د" : "min"}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-foreground/50">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScaleOnScroll>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search className="h-16 w-16 text-foreground/20 mb-4" />
                <p className="text-lg font-medium text-foreground/70 mb-2">
                  {language === "ar" ? "لم يتم العثور على مقالات" : "No articles found"}
                </p>
                <p className="text-sm text-foreground/50 mb-4">
                  {language === "ar" ? "جرب تغيير معايير البحث أو الفلاتر" : "Try changing your search or filters"}
                </p>
                <Button variant="outline" onClick={clearFilters} className="gap-2 bg-transparent">
                  <X className="h-4 w-4" />
                  {language === "ar" ? "مسح الفلاتر" : "Clear Filters"}
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Footer and Scroll to Top */}
      <Footer />
      <ScrollToTop />

      {/* Mobile spacing for bottom nav */}
      <div className="h-20 md:h-0" />
      <MobileNav />
    </main>
  )
}
