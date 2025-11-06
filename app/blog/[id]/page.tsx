import BlogPostPageClient from "./client"
import { getBlogPostById, BLOG_POSTS } from "@/lib/blog-loader"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getBlogPostById(id)

  if (!post) {
    notFound()
  }

  return <BlogPostPageClient post={post} />
}
