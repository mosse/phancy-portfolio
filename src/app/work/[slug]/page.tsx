import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects, getProjectBySlug } from '@/data'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.overview,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // Find next project for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <header>
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          {project.category}
        </p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-4 text-xl text-neutral-600">{project.subtitle}</p>
      </header>

      {/* Hero Image */}
      <div className="mt-12 aspect-video bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
        Project Hero Image
      </div>

      {/* Overview */}
      <section className="mt-16" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-2xl font-semibold">
          Overview
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              Role
            </h3>
            <p className="mt-1">{project.role}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              Timeline
            </h3>
            <p className="mt-1">{project.timeline}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              Team
            </h3>
            <p className="mt-1">{project.team}</p>
          </div>
        </div>
        <p className="mt-6 text-neutral-600 leading-relaxed">{project.overview}</p>
      </section>

      {/* Process */}
      <section className="mt-16 pt-16 border-t border-neutral-200" aria-labelledby="process-heading">
        <h2 id="process-heading" className="text-2xl font-semibold">
          Process
        </h2>
        <ul className="mt-6 space-y-4">
          {project.process.map((step, index) => (
            <li key={index} className="flex gap-4 p-6 bg-neutral-50 rounded-lg">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium text-neutral-600">
                {index + 1}
              </span>
              <p className="text-neutral-700 pt-1">{step}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Solution */}
      <section className="mt-16 pt-16 border-t border-neutral-200" aria-labelledby="solution-heading">
        <h2 id="solution-heading" className="text-2xl font-semibold">
          Solution
        </h2>
        <ul className="mt-6 space-y-3">
          {project.solution.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-neutral-600">
              <svg
                className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {project.images.slice(0, 4).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/3] bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400"
            >
              Screenshot {index + 1}
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="mt-16 pt-16 border-t border-neutral-200" aria-labelledby="outcomes-heading">
        <h2 id="outcomes-heading" className="text-2xl font-semibold">
          Outcomes
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {project.outcomes.map((item) => (
            <div key={item.label} className="text-center p-6 bg-neutral-50 rounded-lg">
              <p className="text-3xl font-bold">{item.metric}</p>
              <p className="mt-1 text-sm text-neutral-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="mt-16 pt-16 border-t border-neutral-200">
          <blockquote className="text-center">
            <p className="text-xl text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              &ldquo;{project.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6">
              <cite className="not-italic font-semibold text-neutral-900">
                {project.testimonial.author}
              </cite>
              <p className="text-sm text-neutral-500">{project.testimonial.title}</p>
            </footer>
          </blockquote>
        </section>
      )}

      {/* Navigation */}
      <nav
        className="mt-16 pt-16 border-t border-neutral-200 flex justify-between"
        aria-label="Project navigation"
      >
        <Link
          href="/work"
          className="text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          &larr; All projects
        </Link>
        <Link
          href={`/work/${nextProject.slug}`}
          className="text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          {nextProject.title} &rarr;
        </Link>
      </nav>
    </article>
  )
}
