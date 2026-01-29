import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import { mdxComponents } from '@/components/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <header>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-xl text-neutral-600">{post.description}</p>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mt-10 aspect-[2/1] bg-neutral-100 rounded-lg overflow-hidden">
          <img
            src={post.coverImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* MDX Content */}
      <div className="mt-10 prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-4">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-10 pt-10 border-t border-neutral-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-neutral-100 text-neutral-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-10 pt-10 border-t border-neutral-200">
        <a href="/blog" className="text-neutral-600 hover:text-neutral-900 transition-colors">
          &larr; Back to blog
        </a>
      </nav>
    </article>
  )
}
