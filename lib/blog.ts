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
