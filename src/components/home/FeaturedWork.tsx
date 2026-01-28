import Link from 'next/link'
import { getFeaturedProjects, type Project } from '@/data'

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block"
    >
      <article className="relative overflow-hidden rounded-lg bg-neutral-100">
        {/* Cover image placeholder */}
        <div className="aspect-[4/3] bg-neutral-200 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-300 transition-colors">
          <span className="text-sm">Project Image</span>
        </div>

        {/* Hover overlay with summary */}
        <div className="absolute inset-0 bg-neutral-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <p className="text-white text-sm leading-relaxed line-clamp-3">
            {project.overview}
          </p>
        </div>
      </article>

      <div className="mt-4">
        <p className="text-sm text-neutral-500 uppercase tracking-wider">
          {project.category}
        </p>
        <h3 className="mt-1 text-xl font-semibold group-hover:text-neutral-600 transition-colors">
          {project.title}
        </h3>
        <p className="mt-1 text-neutral-600">{project.subtitle}</p>
        <p className="mt-2 text-sm text-neutral-500">{project.role}</p>
      </div>
    </Link>
  )
}

export function FeaturedWork() {
  const featuredProjects = getFeaturedProjects()

  return (
    <section
      id="featured-work"
      className="py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="featured-work-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2
              id="featured-work-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Featured Work
            </h2>
            <p className="mt-2 text-neutral-600">
              A selection of projects I&apos;m most proud of
            </p>
          </div>
          <Link
            href="/work"
            className="hidden sm:inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            View all projects
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/work"
            className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            View all projects
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
