import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MobileNav } from "@/components/navigation/mobile-nav"
import ServicesClient from "./services-client"

export const metadata = {
  title: "Our Services | Wirya - Technology Solutions & Support",
  description:
    "Explore Wirya's comprehensive range of technology services including system installation, data recovery, computer repair, and web development solutions.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Wirya Services",
    description: "Comprehensive technology solutions and support services",
    type: "website",
  },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ServicesClient />
      <Footer />
      <ScrollToTop />
      <div className="h-20 md:h-0" />
      <MobileNav />
    </main>
  )
}
