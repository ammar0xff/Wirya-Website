import { Header } from "@/components/navigation/header"
import { MobileNav } from "@/components/navigation/mobile-nav"
import ContactClientPage from "./contact-client"

export const metadata = {
  title: "Contact Us | Wirya - Get in Touch",
  description:
    "Contact Wirya for technology solutions and support. Reach us via email, phone, or visit our office in Suez, Egypt. Available 24/7 except Fridays.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Wirya",
    description: "Get in touch with our technology experts",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ContactClientPage />
      {/* Mobile spacing for bottom nav */}
      <div className="h-20 md:h-0" />
      <MobileNav />
    </main>
  )
}
