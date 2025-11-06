import type { MetadataRoute } from "next"
import { BLOG_POSTS } from "@/lib/blog-loader"
import { services } from "@/lib/services"
import { caseStudiesData } from "@/lib/site-content"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wirya.com"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/story`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  // Blog posts (only published)
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.filter((post) => post.status === "published").map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Services
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  // Case studies
  const caseStudyPages: MetadataRoute.Sitemap = caseStudiesData.studies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.id}`,
    lastModified: new Date(study.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages, ...servicePages, ...caseStudyPages]
}
