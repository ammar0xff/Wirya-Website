// Updated BlogPost interface to match admin requirements with slugAr and slugEn
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
export const BLOG_POSTS: BlogPost[] = [
  {
    "id": "digital-transformation-guide",
    "titleAr": "دليل التحول الرقمي الشامل",
    "titleEn": "Complete Digital Transformation Guide",
    "slugAr": "دليل-التحول-الرقمي",
    "slugEn": "digital-transformation-guide",
    "descriptionAr": "استكشف الخطوات الأساسية لتحويل عملك رقميًا",
    "descriptionEn": "Explore the essential steps to digitally transform your business",
    "author": "Ahmed Hassan",
    "date": "2024-10-15",
    "readTime": 5,
    "image": "/digital-transformation.png",
    "category": "transformation",
    "series": "Digital Transformation",
    "status": "published",
    "tags": [
      "digital",
      "transformation",
      "business",
      "technology"
    ],
    "contentAr": "# دليل التحول الرقمي الشامل\n\nالتحول الرقمي ليس خيارًا بعد الآن، بل هو ضرورة حتمية للشركات التي تريد البقاء تنافسية في عالم الأعمال الحديث.\n\n## لماذا التحول الرقمي؟\n\nفي عصر التكنولوجيا المتسارعة، أصبح التحول الرقمي ضرورة لا غنى عنها. الشركات التي تتبنى التحول الرقمي تحقق:\n\n- **زيادة الكفاءة**: أتمتة العمليات توفر الوقت والموارد\n- **تحسين تجربة العملاء**: خدمات رقمية أسرع وأكثر سلاسة\n- **ميزة تنافسية**: البقاء في صدارة المنافسة\n\n## الخطوة الأولى: التقييم الشامل\n\nقبل البدء في أي مشروع تحول رقمي، يجب عليك تقييم الوضع الحالي لعملك:\n\n1. **تحليل العمليات الحالية**: فهم كيفية عمل الأنظمة الحالية\n2. **تحديد نقاط الضعف**: معرفة المجالات التي تحتاج إلى تحسين\n3. **قياس الأداء**: وضع مؤشرات أداء واضحة\n\n## الخطوة الثانية: التخطيط الاستراتيجي\n\nضع خطة واضحة وقابلة للتنفيذ:\n\n- حدد الأهداف قصيرة وطويلة المدى\n- خصص الموارد اللازمة\n- ضع جدولاً زمنياً واقعياً\n\n## الخطوة الثالثة: التنفيذ التدريجي\n\nابدأ بمشاريع صغيرة وتدرج تدريجياً:\n\n1. اختر مشروعاً تجريبياً\n2. قيّم النتائج\n3. وسّع النطاق تدريجياً\n\n## الخلاصة\n\nالتحول الرقمي رحلة مستمرة تتطلب التزاماً والتكيف المستمر مع التغيرات التكنولوجية.",
    "contentEn": "# Complete Digital Transformation Guide\n\nDigital transformation is no longer optional—it's a necessity for businesses wanting to stay competitive in the modern business world.\n\n## Why Digital Transformation?\n\nIn an era of rapid technological advancement, digital transformation has become indispensable. Companies that embrace digital transformation achieve:\n\n- **Increased Efficiency**: Process automation saves time and resources\n- **Improved Customer Experience**: Faster and smoother digital services\n- **Competitive Advantage**: Staying ahead of the competition\n\n## Step 1: Comprehensive Assessment\n\nBefore starting any digital transformation project, assess your business's current state:\n\n1. **Analyze Current Processes**: Understand how existing systems work\n2. **Identify Weaknesses**: Know which areas need improvement\n3. **Measure Performance**: Set clear performance indicators\n\n## Step 2: Strategic Planning\n\nCreate a clear and actionable plan:\n\n- Define short and long-term goals\n- Allocate necessary resources\n- Set a realistic timeline\n\n## Step 3: Gradual Implementation\n\nStart with small projects and scale gradually:\n\n1. Choose a pilot project\n2. Evaluate results\n3. Expand scope progressively\n\n## Conclusion\n\nDigital transformation is an ongoing journey that requires commitment and continuous adaptation to technological changes."
  },
  {
    "id": "cybersecurity-best-practices",
    "titleAr": "أفضل ممارسات الأمن السيبراني",
    "titleEn": "Cybersecurity Best Practices",
    "slugAr": "افضل-ممارسات-الامان",
    "slugEn": "cybersecurity-best-practices",
    "descriptionAr": "احم عملك من التهديدات السيبرانية مع أفضل الممارسات",
    "descriptionEn": "Protect your business from cyber threats with best practices",
    "author": "Fatima Al-Mansouri",
    "date": "2024-10-10",
    "readTime": 6,
    "image": "/cybersecurity-network-protection.png",
    "category": "security",
    "series": "Security Essentials",
    "status": "published",
    "tags": [
      "security",
      "cybersecurity",
      "protection",
      "best-practices"
    ],
    "contentAr": "# أفضل ممارسات الأمن السيبراني\n\nالأمن السيبراني أصبح أساسيًا لأي عمل في العصر الرقمي. مع تزايد التهديدات الإلكترونية، يجب على الشركات اتخاذ خطوات استباقية لحماية بياناتها وأنظمتها.",
    "contentEn": "# Cybersecurity Best Practices\n\nCybersecurity has become essential for any business in the digital age. With increasing cyber threats, companies must take proactive steps to protect their data and systems."
  },
  {
    "id": "ai-and-automation",
    "titleAr": "الذكاء الاصطناعي والأتمتة",
    "titleEn": "AI and Automation",
    "slugAr": "الذكاء-الاصطناعي-والاتمتة",
    "slugEn": "ai-and-automation",
    "descriptionAr": "كيف يغير الذكاء الاصطناعي المشهد التجاري",
    "descriptionEn": "How AI is changing the business landscape",
    "author": "Mohammed Al-Zahra",
    "date": "2024-10-05",
    "readTime": 7,
    "image": "/ai-automation.png",
    "category": "technology",
    "series": "Future Tech",
    "status": "published",
    "tags": [
      "ai",
      "automation",
      "technology",
      "innovation"
    ],
    "contentAr": "# الذكاء الاصطناعي والأتمتة\n\nالذكاء الاصطناعي يحول طريقة عمل الشركات بشكل جذري، مما يفتح آفاقاً جديدة للكفاءة والابتكار.",
    "contentEn": "# AI and Automation\n\nArtificial intelligence is fundamentally transforming how companies operate, opening new horizons for efficiency and innovation."
  }
]

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
