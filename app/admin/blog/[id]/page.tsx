import { BLOG_POSTS } from "@/lib/blog-loader"
import ClientBlogPostEditPage from "./client-page"

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
  }))
}

export default function EditBlogPostPage() {
  return <ClientBlogPostEditPage />
}
