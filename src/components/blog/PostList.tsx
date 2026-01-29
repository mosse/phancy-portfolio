import { type BlogPostMeta } from '@/lib/blog'
import { PostCard } from './PostCard'

type PostListProps = {
  posts: BlogPostMeta[]
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">No posts yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
