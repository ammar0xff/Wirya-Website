// Site content managed by admin panel

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

export const aboutPageContent: AboutPageContent = null

export const contactPageContent: ContactPageContent = {
  "email": "wirya.corp@gmail.com",
  "phone": "010 677 903 50",
  "addressAr": "السويس, مصر",
  "addressEn": "Suez, Egypt",
  "businessHoursAr": "طوال الاسبوع (عدا الجمعة): 24 ساعة",
  "businessHoursEn": "All Week (except Friday): 24h",
  "socialLinks": {
    "facebook": "https://www.facebook.com/profile.php?id=61572786470172",
    "twitter": "https://wirya-v190.vercel.app/",
    "instagram": "https://www.instagram.com/wirya_llc/",
    "linkedin": "https://wirya-v190.vercel.app/"
  }
}

export const ourStoryContent: OurStoryContent = null

export const footerContent: FooterContent = {
  "companyDescAr": "شركة رائدة في مجال التحول الرقمي والتكنولوجيا، نقدم حلولاً مبتكرة لتطوير الأعمال",
  "companyDescEn": "A leading company in digital transformation and technology, providing innovative solutions for business development",
  "quickLinks": [
    {
      "id": "services",
      "labelAr": "الخدمات",
      "labelEn": "Services",
      "href": "/services"
    },
    {
      "id": "about",
      "labelAr": "من نحن",
      "labelEn": "About",
      "href": "/about"
    },
    {
      "id": "blog",
      "labelAr": "المدونة",
      "labelEn": "Blog",
      "href": "/blog"
    },
    {
      "id": "contact",
      "labelAr": "اتصل بنا",
      "labelEn": "Contact",
      "href": "/contact"
    }
  ],
  "services": [
    {
      "id": "support",
      "labelAr": "الدعم الفني",
      "labelEn": "Technical Support"
    },
    {
      "id": "transformation",
      "labelAr": "التحول الرقمي",
      "labelEn": "Digital Transformation"
    },
    {
      "id": "security",
      "labelAr": "الأمان السيبراني",
      "labelEn": "Cybersecurity"
    },
    {
      "id": "development",
      "labelAr": "تطوير البرامج",
      "labelEn": "Software Development"
    }
  ],
  "copyrightAr": "جميع الحقوق محفوظة",
  "copyrightEn": "All rights reserved"
}

export const siteSettings: SiteSettings = {
  "siteName": "Wirya",
  "logoUrl": "/logo.svg",
  "favicon": "/wirya.png",
  "metaTitleAr": "وريا - يلا نخلي مشاكلك بدايات",
  "metaTitleEn": "Wirya - Let's innovate",
  "metaDescAr": "وريا هي شركة للتحول الرقمي للمؤسسات وخدمات الصيانة والدعم الفني للأفراد",
  "metaDescEn": "Wirya is a digital transformation company; it is a company focused on digital transformation and expanding its agricultural and technical services.",
  "whatsappNumber": "+201067790350",
  "siteIcon": "/wirya.png",
  "enableEcommerce": true,
  "defaultCurrency": "EG"
}

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
