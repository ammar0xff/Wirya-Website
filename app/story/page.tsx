import { Header } from "@/components/navigation/header"
import { MobileNav } from "@/components/navigation/mobile-nav"
import StoryClient from "./story-client"

export const metadata = {
  title: "Our Story | Wirya - Journey to Excellence",
  description:
    "Discover Wirya's journey from inception to becoming a leading technology solutions provider. Learn about our milestones and achievements.",
  alternates: {
    canonical: "/story",
  },
  openGraph: {
    title: "Wirya's Story",
    description: "Our journey towards innovation and excellence",
    type: "website",
  },
}

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <StoryClient />
      <div className="h-20 md:h-0" />
      <MobileNav />
    </main>
  )
}
