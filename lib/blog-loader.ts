export interface BlogPostFrontmatter {
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  author: string
  date: string
  readTime: number
  image?: string
  series?: string
  status?: "draft" | "published" | "archived" | "scheduled"
  tags?: string[]
}

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
  status: "draft" | "published" | "archived" | "scheduled"
  tags: string[]
}

export interface BlogPostSchedule {
  postId: string
  scheduledDate: string
  status: "scheduled" | "published" | "cancelled"
  createdAt: string
  publishedAt?: string
}

export interface BlogPostDraft {
  id: string
  postId?: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  contentAr: string
  contentEn: string
  imageUrl?: string
  author: string
  category: string
  tags: string[]
  status: "unsaved" | "autosaved"
  lastModified: string
  savedAt?: string
}

// Blog posts with inline markdown content
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "digital-transformation-guide",
    titleAr: "دليل التحول الرقمي الشامل",
    titleEn: "Complete Digital Transformation Guide",
    slugAr: "دليل-التحول-الرقمي",
    slugEn: "digital-transformation-guide",
    descriptionAr: "استكشف الخطوات الأساسية لتحويل عملك رقميًا",
    descriptionEn: "Explore the essential steps to digitally transform your business",
    author: "Ahmed Hassan",
    date: "2024-10-15",
    readTime: 5,
    image: "/digital-transformation.png",
    category: "transformation",
    series: "Digital Transformation",
    status: "published",
    tags: ["digital", "transformation", "business", "technology"],
    contentAr: `# دليل التحول الرقمي الشامل

التحول الرقمي ليس خيارًا بعد الآن، بل هو ضرورة حتمية للشركات التي تريد البقاء تنافسية في عالم الأعمال الحديث.

## لماذا التحول الرقمي؟

في عصر التكنولوجيا المتسارعة، أصبح التحول الرقمي ضرورة لا غنى عنها. الشركات التي تتبنى التحول الرقمي تحقق:

- **زيادة الكفاءة**: أتمتة العمليات توفر الوقت والموارد
- **تحسين تجربة العملاء**: خدمات رقمية أسرع وأكثر سلاسة
- **ميزة تنافسية**: البقاء في صدارة المنافسة

## الخطوة الأولى: التقييم الشامل

قبل البدء في أي مشروع تحول رقمي، يجب عليك تقييم الوضع الحالي لعملك:

1. **تحليل العمليات الحالية**: فهم كيفية عمل الأنظمة الحالية
2. **تحديد نقاط الضعف**: معرفة المجالات التي تحتاج إلى تحسين
3. **قياس الأداء**: وضع مؤشرات أداء واضحة

## الخطوة الثانية: التخطيط الاستراتيجي

ضع خطة واضحة وقابلة للتنفيذ:

- حدد الأهداف قصيرة وطويلة المدى
- خصص الموارد اللازمة
- ضع جدولاً زمنياً واقعياً

## الخطوة الثالثة: التنفيذ التدريجي

ابدأ بمشاريع صغيرة وتدرج تدريجياً:

1. اختر مشروعاً تجريبياً
2. قيّم النتائج
3. وسّع النطاق تدريجياً

## الخلاصة

التحول الرقمي رحلة مستمرة تتطلب التزاماً والتكيف المستمر مع التغيرات التكنولوجية.`,
    contentEn: `# Complete Digital Transformation Guide

Digital transformation is no longer optional—it's a necessity for businesses wanting to stay competitive in the modern business world.

## Why Digital Transformation?

In an era of rapid technological advancement, digital transformation has become indispensable. Companies that embrace digital transformation achieve:

- **Increased Efficiency**: Process automation saves time and resources
- **Improved Customer Experience**: Faster and smoother digital services
- **Competitive Advantage**: Staying ahead of the competition

## Step 1: Comprehensive Assessment

Before starting any digital transformation project, assess your business's current state:

1. **Analyze Current Processes**: Understand how existing systems work
2. **Identify Weaknesses**: Know which areas need improvement
3. **Measure Performance**: Set clear performance indicators

## Step 2: Strategic Planning

Create a clear and actionable plan:

- Define short and long-term goals
- Allocate necessary resources
- Set a realistic timeline

## Step 3: Gradual Implementation

Start with small projects and scale gradually:

1. Choose a pilot project
2. Evaluate results
3. Expand scope progressively

## Conclusion

Digital transformation is an ongoing journey that requires commitment and continuous adaptation to technological changes.`,
  },
  {
    id: "cybersecurity-best-practices",
    titleAr: "أفضل ممارسات الأمن السيبراني",
    titleEn: "Cybersecurity Best Practices",
    slugAr: "افضل-ممارسات-الامان",
    slugEn: "cybersecurity-best-practices",
    descriptionAr: "احم عملك من التهديدات السيبرانية مع أفضل الممارسات",
    descriptionEn: "Protect your business from cyber threats with best practices",
    author: "Fatima Al-Mansouri",
    date: "2024-10-10",
    readTime: 6,
    image: "/cybersecurity-network-protection.png",
    category: "security",
    series: "Security Essentials",
    status: "published",
    tags: ["security", "cybersecurity", "protection", "best-practices"],
    contentAr: `# أفضل ممارسات الأمن السيبراني

الأمن السيبراني أصبح أساسيًا لأي عمل في العصر الرقمي. مع تزايد التهديدات الإلكترونية، يجب على الشركات اتخاذ خطوات استباقية لحماية بياناتها وأنظمتها.`,
    contentEn: `# Cybersecurity Best Practices

Cybersecurity has become essential for any business in the digital age. With increasing cyber threats, companies must take proactive steps to protect their data and systems.`,
  },
  {
    id: "ai-and-automation",
    titleAr: "الذكاء الاصطناعي والأتمتة",
    titleEn: "AI and Automation",
    slugAr: "الذكاء-الاصطناعي-والاتمتة",
    slugEn: "ai-and-automation",
    descriptionAr: "كيف يغير الذكاء الاصطناعي المشهد التجاري",
    descriptionEn: "How AI is changing the business landscape",
    author: "Mohammed Al-Zahra",
    date: "2024-10-05",
    readTime: 7,
    image: "/ai-automation.png",
    category: "technology",
    series: "Future Tech",
    status: "published",
    tags: ["ai", "automation", "technology", "innovation"],
    contentAr: `# الذكاء الاصطناعي والأتمتة

الذكاء الاصطناعي يحول طريقة عمل الشركات بشكل جذري، مما يفتح آفاقاً جديدة للكفاءة والابتكار.`,
    contentEn: `# AI and Automation

Artificial intelligence is fundamentally transforming how companies operate, opening new horizons for efficiency and innovation.`,
  },
]

export const DRAFT_POSTS: BlogPostDraft[] = []
export const POST_SCHEDULES: BlogPostSchedule[] = []

// Helper functions for blog post management
export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostById(id: string): BlogPost | null {
  return BLOG_POSTS.find((post) => post.id === id) || null
}

export function getPublishedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.status === "published")
}

export function getBlogPostsByStatus(status: "draft" | "published" | "archived" | "scheduled"): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.status === status)
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.tags.includes(tag))
}

export function getAllTags(): string[] {
  return Array.from(new Set(BLOG_POSTS.flatMap((post) => post.tags)))
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

export function getRelatedPosts(postId: string, limit = 3): BlogPost[] {
  const post = getBlogPostById(postId)
  if (!post) return []

  const related = BLOG_POSTS.filter(
    (p) =>
      p.id !== postId &&
      (p.category === post.category || p.series === post.series || p.tags.some((tag) => post.tags.includes(tag))),
  )

  return related.slice(0, limit)
}

export function getRelatedPostsByTags(postId: string, limit = 3): BlogPost[] {
  const post = getBlogPostById(postId)
  if (!post || post.tags.length === 0) return []

  const related = BLOG_POSTS.filter(
    (p) => p.id !== postId && p.status === "published" && p.tags.some((tag) => post.tags.includes(tag)),
  ).sort((a, b) => {
    const aMatches = a.tags.filter((tag) => post.tags.includes(tag)).length
    const bMatches = b.tags.filter((tag) => post.tags.includes(tag)).length
    return bMatches - aMatches
  })

  return related.slice(0, limit)
}

export function getBlogPostsByAuthor(author: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.author === author && p.status === "published")
}

export function getPopularPosts(limit = 5): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.status === "published").slice(0, limit)
}

export function searchBlogPosts(query: string): BlogPost[] {
  const q = query.toLowerCase()
  return BLOG_POSTS.filter(
    (post) =>
      post.status === "published" &&
      (post.titleEn.toLowerCase().includes(q) ||
        post.titleAr.toLowerCase().includes(q) ||
        post.descriptionEn.toLowerCase().includes(q) ||
        post.descriptionAr.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))),
  )
}

export function getDraftPosts(): BlogPostDraft[] {
  return DRAFT_POSTS
}

export function saveDraft(draft: BlogPostDraft): BlogPostDraft {
  const existingIndex = DRAFT_POSTS.findIndex((d) => d.id === draft.id)
  const savedDraft = {
    ...draft,
    status: "autosaved" as const,
    savedAt: new Date().toISOString(),
  }
  if (existingIndex >= 0) {
    DRAFT_POSTS[existingIndex] = savedDraft
  } else {
    DRAFT_POSTS.push(savedDraft)
  }
  return savedDraft
}

export function deleteDraft(draftId: string): void {
  const index = DRAFT_POSTS.findIndex((d) => d.id === draftId)
  if (index >= 0) {
    DRAFT_POSTS.splice(index, 1)
  }
}

export function schedulePost(postId: string, scheduledDate: string): BlogPostSchedule {
  const schedule: BlogPostSchedule = {
    postId,
    scheduledDate,
    status: "scheduled",
    createdAt: new Date().toISOString(),
  }
  POST_SCHEDULES.push(schedule)
  return schedule
}

export function getScheduledPosts(): BlogPostSchedule[] {
  return POST_SCHEDULES.filter((s) => s.status === "scheduled")
}

export function getPostStats() {
  return {
    total: BLOG_POSTS.length,
    published: BLOG_POSTS.filter((p) => p.status === "published").length,
    draft: BLOG_POSTS.filter((p) => p.status === "draft").length,
    archived: BLOG_POSTS.filter((p) => p.status === "archived").length,
    scheduled: POST_SCHEDULES.filter((s) => s.status === "scheduled").length,
    draftCount: DRAFT_POSTS.length,
  }
}
