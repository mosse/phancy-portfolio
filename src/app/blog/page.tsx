import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { PostList } from '@/components/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, essays, and thoughts on design, process, and craft.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Blog</h1>
      <p className="mt-4 text-neutral-600">
        Long-form writing about design, process, and building products.
      </p>

      <div className="mt-12">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-neutral-500">No posts yet. Check back soon!</p>
        )}
      </div>
    </div>
  )
}
