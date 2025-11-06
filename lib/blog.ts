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
}

export interface BlogCategory {
  id: string
  nameAr: string
  nameEn: string
}

// Default blog categories - can be managed via admin panel
export const blogCategories: BlogCategory[] = [
  { id: "transformation", nameAr: "التحول الرقمي", nameEn: "Digital Transformation" },
  { id: "security", nameAr: "الأمن السيبراني", nameEn: "Cybersecurity" },
  { id: "technology", nameAr: "التكنولوجيا", nameEn: "Technology" },
]

export { blogCategories as BLOG_CATEGORIES }
