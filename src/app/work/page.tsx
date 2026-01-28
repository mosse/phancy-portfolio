import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Explore my portfolio of product design case studies and projects.',
}

export default function WorkPage() {
  const categories = ['All', 'Mobile', 'Web', 'Branding', 'Product']

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Work</h1>
      <p className="mt-4 text-neutral-600 max-w-2xl">
        A collection of projects spanning mobile apps, web platforms, and brand systems.
      </p>

      {/* Category Filter */}
      <div className="mt-12 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 text-sm font-medium rounded-full border border-neutral-200 hover:border-neutral-400 transition-colors first:bg-neutral-900 first:text-white first:border-neutral-900"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <a
            key={i}
            href={`/work/project-${i}`}
            className="group block"
          >
            <div className="aspect-[4/3] bg-neutral-100 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-neutral-400 group-hover:bg-neutral-200 transition-colors">
                Project {i}
              </div>
            </div>
            <h3 className="mt-4 font-semibold group-hover:text-neutral-600 transition-colors">
              Project Title {i}
            </h3>
            <p className="mt-1 text-sm text-neutral-600">Category &bull; Year</p>
          </a>
        ))}
      </div>
    </div>
  )
}
