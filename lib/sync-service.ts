import type { BlogPost } from "./blog-loader"
import type { BlogCategory } from "./blog"
import type { Service, ServiceCategory } from "./services"
import type { AboutPageContent, ContactPageContent, OurStoryContent, FooterContent, SiteSettings } from "./site-content"

export interface SyncResult {
  success: boolean
  message: string
  sha?: string
}

export class SyncService {
  private static async callSyncAPI(filePath: string, content: string, commitMessage: string): Promise<SyncResult> {
    try {
      console.log("[v0] Calling sync API for:", filePath)

      const response = await fetch("/api/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filePath,
          content,
          commitMessage,
        }),
      })

      console.log("[v0] Sync API response status:", response.status)

      const contentType = response.headers.get("content-type")
      let responseData: any

      try {
        if (contentType?.includes("application/json")) {
          responseData = await response.json()
        } else {
          const text = await response.text()
          responseData = { message: text }
        }
      } catch (error) {
        responseData = { message: `HTTP ${response.status}: ${response.statusText}` }
      }

      if (!response.ok) {
        const errorMessage = responseData.message || `HTTP ${response.status}: ${response.statusText}`
        console.error("[v0] Sync API error:", errorMessage)
        return {
          success: false,
          message: errorMessage,
        }
      }

      console.log("[v0] Sync result:", responseData)
      return responseData
    } catch (error) {
      console.error("[v0] Sync error:", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  static async syncBlogPosts(posts: BlogPost[]): Promise<SyncResult> {
    const postsJson = JSON.stringify(posts, null, 2)

    const fileContent = `// Updated BlogPost interface to match admin requirements with slugAr and slugEn
export interface BlogPost {
  id: string
  titleAr: string
  titleEn: string
  slugAr: string
  slugEn: string
  descriptionAr: string
  descriptionEn: string
  contentAr: string
  contentEn: string
  image: string
  author: string
  date: string
  category: string
  readTime: number
  series?: string
}

// Blog posts data - managed via admin panel
export const BLOG_POSTS: BlogPost[] = ${postsJson}

// Helper functions for blog post management
export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostById(id: string): BlogPost | null {
  return BLOG_POSTS.find((post) => post.id === id) || null
}

export function getAllCategories(): string[] {
  return Array.from(new Set(BLOG_POSTS.map((post) => post.category)))
}

export function getAllSeries(): string[] {
  const series = new Set<string>()
  BLOG_POSTS.forEach((post) => {
    if (post.series) {
      series.add(post.series)
    }
  })
  return Array.from(series)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.category === category)
}

export function getBlogPostsBySeries(series: string): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.series === series)
}
`

    return this.callSyncAPI(
      "lib/blog-loader.ts",
      fileContent,
      `[Admin] Updated blog posts: ${new Date().toISOString()}`,
    )
  }

  static async syncBlogCategories(categories: BlogCategory[]): Promise<SyncResult> {
    const fileContent = `// Simplified to only export blog categories and types, removed duplicate blog posts
export interface BlogCategory {
  id: string
  nameAr: string
  nameEn: string
}

// Default blog categories - can be managed via admin panel
export const blogCategories: BlogCategory[] = ${JSON.stringify(categories, null, 2)}

export { blogCategories as BLOG_CATEGORIES }
`

    return this.callSyncAPI("lib/blog.ts", fileContent, `[Admin] Updated blog categories: ${new Date().toISOString()}`)
  }

  static async syncServices(services: Service[], categories?: ServiceCategory[]): Promise<SyncResult> {
    // The server-side /api/sync endpoint handles merging and GitHub authentication
    const fileContent = `export interface ServiceAttribute {
  id: string
  nameAr: string
  nameEn: string
  valueAr: string
  valueEn: string
}

export interface ServiceOption {
  id: string
  nameAr: string
  nameEn: string
  priceModifier: number
}

export interface Service {
  id: string
  category: string
  nameAr: string
  nameEn: string
  descriptionAr: string
  descriptionEn: string
  price: number
  currency: string
  stock: number
  inStock: boolean
  image: string
  previewImages: string[]
  attributes: ServiceAttribute[]
  options: ServiceOption[]
  whatsappLink: string
  detailedDescAr: string
  detailedDescEn: string
  detailedContentPath?: string
  longDescriptionAr?: string
  longDescriptionEn?: string
}

export interface ServiceCategory {
  id: string
  nameAr: string
  nameEn: string
}

export const serviceCategories: ServiceCategory[] = ${JSON.stringify(categories || [], null, 2)}

export const services: Service[] = ${JSON.stringify(services, null, 2)}

export const SERVICES = services
export const SERVICE_CATEGORIES = serviceCategories
`

    return this.callSyncAPI("lib/services.ts", fileContent, `[Admin] Updated services: ${new Date().toISOString()}`)
  }

  static async syncServiceCategories(categories: ServiceCategory[]): Promise<SyncResult> {
    // Server endpoint will merge with existing services automatically
    const fileContent = `export interface ServiceAttribute {
  id: string
  nameAr: string
  nameEn: string
  valueAr: string
  valueEn: string
}

export interface ServiceOption {
  id: string
  nameAr: string
  nameEn: string
  priceModifier: number
}

export interface Service {
  id: string
  category: string
  nameAr: string
  nameEn: string
  descriptionAr: string
  descriptionEn: string
  price: number
  currency: string
  stock: number
  inStock: boolean
  image: string
  previewImages: string[]
  attributes: ServiceAttribute[]
  options: ServiceOption[]
  whatsappLink: string
  detailedDescAr: string
  detailedDescEn: string
  detailedContentPath?: string
  longDescriptionAr?: string
  longDescriptionEn?: string
}

export interface ServiceCategory {
  id: string
  nameAr: string
  nameEn: string
}

export const serviceCategories: ServiceCategory[] = ${JSON.stringify(categories, null, 2)}

export const services: Service[] = []

export const SERVICES = services
export const SERVICE_CATEGORIES = serviceCategories
`

    return this.callSyncAPI(
      "lib/services.ts",
      fileContent,
      `[Admin] Updated service categories: ${new Date().toISOString()}`,
    )
  }

  static async syncSiteContent(
    about: AboutPageContent | null,
    contact: ContactPageContent | null,
    story: OurStoryContent | null,
    footer: FooterContent | null,
    settings: SiteSettings | null,
  ): Promise<SyncResult> {
    const fileContent = `// Site content managed by admin panel

export interface AboutPageContent {
  missionAr: string
  missionEn: string
  visionAr: string
  visionEn: string
  values: Array<{
    id: string
    titleAr: string
    titleEn: string
    descAr: string
    descEn: string
  }>
  achievements: Array<{
    id: string
    numberAr: string
    numberEn: string
    titleAr: string
    titleEn: string
  }>
}

export interface ContactPageContent {
  email: string
  phone: string
  addressAr: string
  addressEn: string
  businessHoursAr: string
  businessHoursEn: string
  socialLinks: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
  }
}

export interface OurStoryContent {
  titleAr: string
  titleEn: string
  contentAr: string
  contentEn: string
  milestones: Array<{
    id: string
    year: string
    titleAr: string
    titleEn: string
    descAr: string
    descEn: string
  }>
}

export interface FooterContent {
  companyDescAr: string
  companyDescEn: string
  quickLinks: Array<{
    id: string
    labelAr: string
    labelEn: string
    href: string
  }>
  services: Array<{
    id: string
    labelAr: string
    labelEn: string
  }>
  copyrightAr: string
  copyrightEn: string
}

export interface SiteSettings {
  siteName: string
  logoUrl: string
  favicon: string
  metaTitleAr: string
  metaTitleEn: string
  metaDescAr: string
  metaDescEn: string
  whatsappNumber: string
}

export interface NewsletterSettings {
  subscriptions: Array<{
    id: string
    email: string
    subscribedAt: string
    language: "ar" | "en"
    status: "active" | "unsubscribed"
  }>
  emailConfig: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPass: string
    senderEmail: string
    senderName: string
  }
}

export interface Testimonial {
  id: string
  nameAr: string
  nameEn: string
  roleAr: string
  roleEn: string
  companyAr: string
  companyEn: string
  contentAr: string
  contentEn: string
  rating: number
  imageUrl?: string
  serviceRelated?: string
  featured: boolean
  createdAt: string
  status: "active" | "inactive"
}

export interface TestimonialsData {
  testimonials: Testimonial[]
}

export interface MediaFile {
  id: string
  name: string
  url: string
  type: "image" | "document" | "video" | "audio"
  mimeType: string
  size: number
  width?: number
  height?: number
  altText: string
  tags: string[]
  uploadedAt: string
  usageCount: number
}

export interface MediaLibraryData {
  files: MediaFile[]
  totalSize: number
}

export interface ServiceFeature {
  id: string
  nameAr: string
  nameEn: string
  included: boolean
}

export interface ServiceReview {
  id: string
  ratingAr: string
  ratingEn: string
  contentAr: string
  contentEn: string
  clientName: string
  rating: number
  date: string
  verified: boolean
}

export interface ServiceBooking {
  id: string
  clientNameAr: string
  clientNameEn: string
  email: string
  phone: string
  serviceId: string
  date: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes: string
  createdAt: string
}

export interface ServiceComparison {
  id: string
  nameAr: string
  nameEn: string
  description: string
  features: ServiceFeature[]
}

export interface ServiceEnhancements {
  comparisons: ServiceComparison[]
  bookings: ServiceBooking[]
  reviews: ServiceReview[]
}

export interface FAQ {
  id: string
  questionAr: string
  questionEn: string
  answerAr: string
  answerEn: string
  category: string
  order: number
  status: "active" | "inactive"
}

export interface CaseStudy {
  id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  contentAr: string
  contentEn: string
  imageUrl: string
  category: string
  client: string
  results: Array<{ label: string; value: string }>
  tags: string[]
  featured: boolean
  createdAt: string
}

export interface TeamMember {
  id: string
  nameAr: string
  nameEn: string
  roleAr: string
  roleEn: string
  bio: string
  imageUrl: string
  email: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  department: string
  order: number
}

export interface SEOSettings {
  pageSlug: string
  metaTitleAr: string
  metaTitleEn: string
  metaDescAr: string
  metaDescEn: string
  metaKeywords: string[]
  ogImage: string
  ogType: string
  canonicalUrl: string
  robots: "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow"
  lastModified: string
}

export interface FAQData {
  faqs: FAQ[]
}

export interface CaseStudiesData {
  studies: CaseStudy[]
}

export interface TeamData {
  members: TeamMember[]
}

export interface SEOData {
  pages: SEOSettings[]
}

export const aboutPageContent: AboutPageContent = ${JSON.stringify(about, null, 2)}

export const contactPageContent: ContactPageContent = ${JSON.stringify(contact, null, 2)}

export const ourStoryContent: OurStoryContent = ${JSON.stringify(story, null, 2)}

export const footerContent: FooterContent = ${JSON.stringify(footer, null, 2)}

export const siteSettings: SiteSettings = ${JSON.stringify(settings, null, 2)}

export const newsletterSettings: NewsletterSettings = {
  subscriptions: [],
  emailConfig: {
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPass: "",
    senderEmail: "noreply@wirya.com",
    senderName: "Wirya",
  },
}

export const testimonialsData: TestimonialsData = {
  testimonials: [],
}

export const mediaLibraryData: MediaLibraryData = {
  files: [],
  totalSize: 0,
}

export const serviceEnhancements: ServiceEnhancements = {
  comparisons: [],
  bookings: [],
  reviews: [],
}

export const faqData: FAQData = {
  faqs: [
    {
      id: "faq-1",
      questionAr: "ما هي الخدمات التي تقدمها الشركة؟",
      questionEn: "What services does your company offer?",
      answerAr: "نقدم مجموعة شاملة من خدمات التحول الرقمي والدعم الفني والاستشارات التقنية.",
      answerEn: "We offer comprehensive digital transformation services, technical support, and technology consulting.",
      category: "services",
      order: 1,
      status: "active",
    },
    {
      id: "faq-2",
      questionAr: "كيف يمكنني التواصل مع فريق الدعم؟",
      questionEn: "How can I contact the support team?",
      answerAr: "يمكنك التواصل عبر البريد الإلكتروني أو الهاتف أو WhatsApp. تفاصيل التواصل موجودة في صفحة اتصل بنا.",
      answerEn: "You can reach us via email, phone, or WhatsApp. Contact details are available on the contact page.",
      category: "support",
      order: 2,
      status: "active",
    },
  ],
}

export const caseStudiesData: CaseStudiesData = {
  studies: [],
}

export const teamData: TeamData = {
  members: [],
}

export const seoData: SEOData = {
  pages: [],
}

export {
  aboutPageContent as ABOUT_CONTENT,
  contactPageContent as CONTACT_CONTENT,
  ourStoryContent as STORY_CONTENT,
  footerContent as FOOTER_CONTENT,
  siteSettings as SITE_SETTINGS,
  newsletterSettings as NEWSLETTER_SETTINGS,
  testimonialsData as TESTIMONIALS_DATA,
  mediaLibraryData as MEDIA_LIBRARY_DATA,
  serviceEnhancements as SERVICE_ENHANCEMENTS,
  faqData as FAQ_DATA,
  caseStudiesData as CASE_STUDIES_DATA,
  teamData as TEAM_DATA,
  seoData as SEO_DATA,
}
`

    return this.callSyncAPI(
      "lib/site-content.ts",
      fileContent,
      `[Admin] Updated site content: ${new Date().toISOString()}`,
    )
  }

  static async syncAll(
    posts: BlogPost[],
    blogCategories: BlogCategory[],
    services: Service[],
    serviceCategories: ServiceCategory[],
    about: AboutPageContent | null,
    contact: ContactPageContent | null,
    story: OurStoryContent | null,
    footer: FooterContent | null,
    settings: SiteSettings | null,
  ): Promise<{
    blog: SyncResult
    blogCategories: SyncResult
    services: SyncResult
    siteContent: SyncResult
  }> {
    const [blogResult, blogCategoriesResult, servicesResult, siteContentResult] = await Promise.all([
      this.syncBlogPosts(posts),
      this.syncBlogCategories(blogCategories),
      this.syncServices(services, serviceCategories),
      this.syncSiteContent(about, contact, story, footer, settings),
    ])

    return {
      blog: blogResult,
      blogCategories: blogCategoriesResult,
      services: servicesResult,
      siteContent: siteContentResult,
    }
  }
}
