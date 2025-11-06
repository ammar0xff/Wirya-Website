"use client"

import { useTheme } from "@/lib/theme-provider"
import { Header } from "@/components/navigation/header"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FadeIn } from "@/components/animations/fade-in"
import { ScaleOnScroll } from "@/components/animations/scale-on-scroll"
import { translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Zap, Shield, Cpu, Settings2, Sparkles } from "lucide-react"
import Link from "next/link"
import { BLOG_POSTS } from "@/lib/blog-loader"
import { ThreeDBackground } from "@/components/3d-background"

export default function Home() {
  const { language } = useTheme()
  const t = translations[language]

  const services = [
    {
      icon: Zap,
      nameAr: "الدعم الفني",
      nameEn: "Technical Support",
      descAr: "دعم فني متخصص وسريع لجميع احتياجاتك التقنية",
      descEn: "Specialized and rapid technical support for all your needs",
      link: "/services",
    },
    {
      icon: Cpu,
      nameAr: "التحول الرقمي",
      nameEn: "Digital Transformation",
      descAr: "حلول متكاملة لتحويل مؤسستك إلى العصر الرقمي",
      descEn: "Integrated solutions for digital transformation",
      link: "/services",
    },
    {
      icon: Shield,
      nameAr: "الأمان السيبراني",
      nameEn: "Cybersecurity",
      descAr: "حماية شاملة ضد التهديدات والهجمات الإلكترونية",
      descEn: "Complete protection against cyber threats",
      link: "/services",
    },
    {
      icon: Settings2,
      nameAr: "استشارات تقنية",
      nameEn: "Tech Consulting",
      descAr: "استشارات احترافية من خبراء التكنولوجيا",
      descEn: "Professional consultancy from technology experts",
      link: "/services",
    },
  ]

  const featuredPosts = BLOG_POSTS.slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <ThreeDBackground />

      <Header />

      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 py-20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-primary/20 blur-3xl animate-pulse" />
          <div
            className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <FadeIn duration={800}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-accent font-medium">{language === "ar" ? "لنبتكر معاً" : "Let's Innovate"}</span>
            </div>
          </FadeIn>

          <FadeIn duration={800} delay={100}>
            <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {t.hero.title}
              </span>
            </h1>
          </FadeIn>

          <FadeIn duration={800} delay={200}>
            <p className="mb-8 text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">{t.hero.subtitle}</p>
          </FadeIn>

          <FadeIn duration={800} delay={300}>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/services">
                <Button
                  size="lg"
                  className="group w-full gap-2 bg-gradient-to-r from-accent to-primary hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 sm:w-auto text-base px-8 py-6"
                >
                  {t.hero.cta}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 border-accent/30 hover:bg-accent/5 transition-all duration-300 sm:w-auto text-base px-8 py-6 bg-transparent"
                >
                  {language === "ar" ? "تعرف علينا" : "Learn More"}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-border/40 px-4 py-24 bg-gradient-to-b from-background to-card/30">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-foreground sm:text-5xl mb-4">{t.services.title}</h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                {language === "ar"
                  ? "نقدم مجموعة شاملة من الخدمات التقنية المتطورة"
                  : "We offer a comprehensive range of advanced technical services"}
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <ScaleOnScroll key={idx} delay={idx * 100}>
                  <Link href={service.link}>
                    <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-8 transition-all duration-500 hover:border-accent/50 hover:bg-card hover:shadow-2xl hover:shadow-accent/10 cursor-pointer h-full hover:-translate-y-2">
                      <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150" />

                      <div className="relative">
                        <div className="mb-6 inline-block rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 p-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                          <Icon className="h-8 w-8 text-accent" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-foreground">
                          {language === "ar" ? service.nameAr : service.nameEn}
                        </h3>
                        <p className="text-sm text-foreground/60 leading-relaxed">
                          {language === "ar" ? service.descAr : service.descEn}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScaleOnScroll>
              )
            })}
          </div>

          <FadeIn delay={400}>
            <div className="mt-16 text-center">
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-accent/30 hover:bg-accent/5 px-8 bg-transparent"
                >
                  {language === "ar" ? "عرض جميع الخدمات" : "View All Services"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-border/40 px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="h-8 w-8 text-accent" />
                <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
                  {language === "ar" ? "من المدونة" : "From Our Blog"}
                </h2>
              </div>
              <p className="text-lg text-foreground/60">
                {language === "ar" ? "أحدث المقالات والأفكار التقنية" : "Latest articles and technical insights"}
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post, idx) => (
              <ScaleOnScroll key={post.id} delay={idx * 100}>
                <Link href={`/blog/${post.id}`}>
                  <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-6 transition-all duration-500 hover:border-accent/50 hover:bg-card hover:shadow-2xl hover:shadow-accent/10 cursor-pointer h-full flex flex-col hover:-translate-y-2">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="rounded-full bg-accent/10 p-2">
                        <BookOpen className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-xs text-accent font-semibold uppercase tracking-wide">{post.category}</span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-foreground line-clamp-2">
                      {language === "ar" ? post.titleAr : post.titleEn}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-foreground/60 line-clamp-3 leading-relaxed">
                      {language === "ar" ? post.descriptionAr : post.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/20">
                      <span className="text-xs text-foreground/50">
                        {new Date(post.date).toLocaleDateString(language === "ar" ? "ar" : "en")}
                      </span>
                      <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </ScaleOnScroll>
            ))}
          </div>

          <FadeIn delay={300}>
            <div className="mt-16 text-center">
              <Link href="/blog">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-accent/30 hover:bg-accent/5 px-8 bg-transparent"
                >
                  {language === "ar" ? "اقرأ جميع المقالات" : "Read All Articles"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-border/40 px-4 py-24 bg-gradient-to-b from-card/30 to-background">
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-3xl blur-3xl" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-border/40 rounded-3xl p-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">{t.common.readyForTransformation}</h2>
              <p className="mb-8 text-lg text-foreground/60 max-w-2xl mx-auto">
                {language === "ar"
                  ? "اتصل بنا اليوم وابدأ رحلة التحول الرقمي مع فريقنا المتخصص"
                  : "Contact us today and start your digital transformation journey with our expert team"}
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-accent to-primary hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 px-8 py-6 text-base"
                >
                  {language === "ar" ? "ابدأ الآن" : "Get Started"}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
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
