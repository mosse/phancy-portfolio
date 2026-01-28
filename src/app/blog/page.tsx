import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, essays, and thoughts on design, process, and craft.',
}

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Blog</h1>
      <p className="mt-4 text-neutral-600">
        Long-form writing about design, process, and building products.
      </p>

      {/* Post List */}
      <div className="mt-12 space-y-12">
        {[1, 2, 3].map((i) => (
          <article key={i} className="group">
            <a href={`/blog/post-${i}`} className="block">
              <div className="aspect-[2/1] bg-neutral-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-neutral-400 group-hover:bg-neutral-200 transition-colors">
                  Cover Image
                </div>
              </div>
              <time className="mt-4 block text-sm text-neutral-500">
                January {i * 5}, 2025
              </time>
              <h2 className="mt-2 text-2xl font-semibold group-hover:text-neutral-600 transition-colors">
                Blog Post Title {i}
              </h2>
              <p className="mt-2 text-neutral-600">
                A brief description of what this blog post is about and why readers might find it interesting.
              </p>
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}
