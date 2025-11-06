import { services } from "@/lib/services"
import ServiceDetailPageClient from "./client"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }))
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = services.find((s) => s.id === id)

  if (!service) {
    notFound()
  }

  return <ServiceDetailPageClient service={service} params={{ id }} />
}
