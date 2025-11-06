import BlogPostPageClient from "./client"
import { getBlogPostById, BLOG_POSTS } from "@/lib/blog-loader"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = getBlogPostById(id)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.titleEn} | Wirya Blog`,
    description: post.descriptionEn,
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    openGraph: {
      type: "article",
      title: post.titleEn,
      description: post.descriptionEn,
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.titleEn }] : [],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.titleEn,
      description: post.descriptionEn,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getBlogPostById(id)

  if (!post) {
    notFound()
  }

  return <BlogPostPageClient post={post} />
}
