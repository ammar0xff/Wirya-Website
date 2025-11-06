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
import { ArrowRight, BookOpen, Zap, Shield, Cpu, Settings2 } from "lucide-react"
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

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/10 blur-3xl animate-pulse" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <FadeIn duration={800}>
            <h1 className="mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl py-2.5">
              {t.hero.title}
            </h1>
          </FadeIn>
          <FadeIn duration={800} delay={200}>
            <p className="mb-8 text-lg text-foreground/70 sm:text-xl">{t.hero.subtitle}</p>
          </FadeIn>

          <FadeIn duration={800} delay={400}>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/services">
                <Button
                  size="lg"
                  className="w-full gap-2 bg-accent hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 sm:w-auto"
                >
                  {t.hero.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Preview */}
      <section className="border-t border-border/40 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{t.services.title}</h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <ScaleOnScroll key={idx} delay={idx * 100}>
                  <Link href={service.link}>
                    <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/10 cursor-pointer h-full">
                      <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="mb-2 font-semibold text-foreground">
                        {language === "ar" ? service.nameAr : service.nameEn}
                      </h3>
                      <p className="text-sm text-foreground/60">
                        {language === "ar" ? service.descAr : service.descEn}
                      </p>
                    </div>
                  </Link>
                </ScaleOnScroll>
              )
            })}
          </div>

          <FadeIn delay={400}>
            <div className="mt-12 text-center">
              <Link href="/services">
                <Button variant="outline" className="gap-2 bg-transparent">
                  {language === "ar" ? "عرض جميع الخدمات" : "View All Services"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-border/40 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-accent" />
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                  {language === "ar" ? "من المدونة" : "From Our Blog"}
                </h2>
              </div>
              <p className="text-foreground/60">
                {language === "ar" ? "أحدث المقالات والأفكار التقنية" : "Latest articles and technical insights"}
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post, idx) => (
              <ScaleOnScroll key={post.id} delay={idx * 100}>
                <Link href={`/blog/${post.id}`}>
                  <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/10 cursor-pointer h-full flex flex-col">
                    <div className="mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-accent/60" />
                      <span className="text-xs text-accent font-semibold">{post.category}</span>
                    </div>
                    <h3 className="mb-3 font-semibold text-foreground line-clamp-2">
                      {language === "ar" ? post.titleAr : post.titleEn}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-foreground/60 line-clamp-3">
                      {language === "ar" ? post.descriptionAr : post.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/20">
                      <span className="text-xs text-foreground/50">
                        {new Date(post.date).toLocaleDateString(language === "ar" ? "ar" : "en")}
                      </span>
                      <ArrowRight className="h-4 w-4 text-accent/60 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </ScaleOnScroll>
            ))}
          </div>

          <FadeIn delay={300}>
            <div className="mt-12 text-center">
              <Link href="/blog">
                <Button variant="outline" className="gap-2 bg-transparent">
                  {language === "ar" ? "اقرأ جميع المقالات" : "Read All Articles"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 px-4 py-16">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">{t.common.readyForTransformation}</h2>
            <p className="mb-6 text-foreground/60">
              {language === "ar"
                ? "اتصل بنا اليوم وابدأ رحلة التحول الرقمي مع فريقنا المتخصص"
                : "Contact us today and start your digital transformation journey with our expert team"}
            </p>
            <Link href="/services">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              >
                {t.hero.cta}
              </Button>
            </Link>
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
