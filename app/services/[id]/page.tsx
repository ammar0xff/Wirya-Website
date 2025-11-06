import { services } from "@/lib/services"
import ServiceDetailPageClient from "./client"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const service = services.find((s) => s.id === id)

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: `${service.nameEn} | Wirya Services`,
    description: service.descriptionEn,
    alternates: {
      canonical: `/services/${service.id}`,
    },
    openGraph: {
      type: "website",
      title: service.nameEn,
      description: service.descriptionEn,
      images: service.image ? [{ url: service.image, width: 1200, height: 630, alt: service.nameEn }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: service.nameEn,
      description: service.descriptionEn,
      images: service.image ? [service.image] : [],
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = services.find((s) => s.id === id)

  if (!service) {
    notFound()
  }

  return <ServiceDetailPageClient service={service} params={{ id }} />
}
