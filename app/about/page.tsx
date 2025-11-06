import { AboutContent } from "./about-content"

export const metadata = {
  title: "About Us | Wirya - Digital Transformation & Technology Solutions",
  description:
    "Learn about Wirya, a leading company in digital transformation and technology solutions. Discover our mission, vision, values, and achievements.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Wirya",
    description: "Leading company in digital transformation and technology solutions",
    type: "website",
  },
}

export default function AboutPage() {
  return <AboutContent />
}
