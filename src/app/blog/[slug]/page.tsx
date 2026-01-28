import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: slug.replace(/-/g, ' '),
    description: `Read ${slug.replace(/-/g, ' ')}`,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <header>
        <time className="text-sm text-neutral-500">January 15, 2025</time>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>
        <p className="mt-4 text-xl text-neutral-600">
          A compelling introduction that hooks the reader and sets expectations.
        </p>
      </header>

      {/* Cover Image */}
      <div className="mt-10 aspect-[2/1] bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
        Cover Image
      </div>

      {/* Content Placeholder */}
      <div className="mt-10 prose prose-neutral max-w-none">
        <p className="text-neutral-600 leading-relaxed">
          This is where the blog post content will be rendered from MDX. The actual content
          will come from files in <code>src/content/blog/</code> managed by Decap CMS.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-4">
          For now, this serves as a placeholder to establish the route structure and layout.
          Future phases will integrate MDX parsing and the CMS.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Section Heading</h2>
        <p className="text-neutral-600 leading-relaxed mt-4">
          More content would go here, including code blocks, images, and other rich content
          supported by MDX.
        </p>
      </div>

      {/* Tags */}
      <div className="mt-10 pt-10 border-t border-neutral-200">
        <div className="flex flex-wrap gap-2">
          {['design', 'process', 'case-study'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-neutral-100 text-neutral-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-10 pt-10 border-t border-neutral-200">
        <a href="/blog" className="text-neutral-600 hover:text-neutral-900 transition-colors">
          &larr; Back to blog
        </a>
      </nav>
    </article>
  )
}
