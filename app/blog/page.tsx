import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MobileNav } from "@/components/navigation/mobile-nav"
import BlogClientPage from "./blog-client"

export const metadata = {
  title: "Blog | Wirya - Technology Insights & Articles",
  description:
    "Read the latest articles about digital transformation, cybersecurity, AI, and technology trends from Wirya's expert team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Wirya Blog",
    description: "Latest technology insights and articles",
    type: "website",
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BlogClientPage />
      <Footer />
      <ScrollToTop />
      <div className="h-20 md:h-0" />
      <MobileNav />
    </main>
  )
}
