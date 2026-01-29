import Link from 'next/link'
import { type BlogPostMeta } from '@/lib/blog'

type PostCardProps = {
  post: BlogPostMeta
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Cover image placeholder */}
        <div className="aspect-[16/9] bg-neutral-100 rounded-lg overflow-hidden mb-4">
          <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-300 transition-colors">
            Blog Cover
          </div>
        </div>

        {/* Content */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>

        <h2 className="text-xl font-semibold group-hover:text-neutral-600 transition-colors">
          {post.title}
        </h2>

        <p className="mt-2 text-neutral-600 line-clamp-2">{post.description}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium text-neutral-500 bg-neutral-100 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  )
}
