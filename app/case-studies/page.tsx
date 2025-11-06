import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/footer"
import CaseStudiesClient from "./case-studies-client"

export const metadata = {
  title: "Case Studies | Wirya - Success Stories",
  description:
    "Explore Wirya's successful projects and client case studies showcasing our expertise in digital transformation and technology solutions.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Wirya Case Studies",
    description: "Success stories and client projects",
    type: "website",
  },
}

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CaseStudiesClient />
      <Footer />
    </main>
  )
}
