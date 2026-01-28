import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Project: ${slug}`,
    description: `Case study for ${slug}`,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <header>
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          Case Study
        </p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>
        <p className="mt-4 text-xl text-neutral-600">
          A brief one-liner about this project and what it achieved.
        </p>
      </header>

      {/* Hero Image */}
      <div className="mt-12 aspect-video bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
        Project Hero Image
      </div>

      {/* Overview */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Role</h3>
            <p className="mt-1">Lead Designer</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Timeline</h3>
            <p className="mt-1">3 months</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Team</h3>
            <p className="mt-1">4 people</p>
          </div>
        </div>
        <p className="mt-6 text-neutral-600 leading-relaxed">
          This section will contain the challenge, context, and goals for the project.
          It sets the stage for understanding why this work was needed and what success looks like.
        </p>
      </section>

      {/* Process */}
      <section className="mt-16 pt-16 border-t border-neutral-200">
        <h2 className="text-2xl font-semibold">Process</h2>
        <div className="mt-6 space-y-4">
          {['Research & Discovery', 'Ideation & Wireframes', 'Design & Iteration'].map((step) => (
            <div key={step} className="p-6 bg-neutral-50 rounded-lg">
              <h3 className="font-medium">{step}</h3>
              <p className="mt-2 text-neutral-600">
                Description of this phase and key activities.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution */}
      <section className="mt-16 pt-16 border-t border-neutral-200">
        <h2 className="text-2xl font-semibold">Solution</h2>
        <p className="mt-4 text-neutral-600 leading-relaxed">
          The final design solution and key features.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[4/3] bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
              Screenshot {i}
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="mt-16 pt-16 border-t border-neutral-200">
        <h2 className="text-2xl font-semibold">Outcomes</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            { metric: '40%', label: 'Increase in engagement' },
            { metric: '2.5x', label: 'Faster task completion' },
            { metric: '4.8', label: 'App store rating' },
          ].map((item) => (
            <div key={item.label} className="text-center p-6 bg-neutral-50 rounded-lg">
              <p className="text-3xl font-bold">{item.metric}</p>
              <p className="mt-1 text-sm text-neutral-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <nav className="mt-16 pt-16 border-t border-neutral-200 flex justify-between">
        <a href="/work" className="text-neutral-600 hover:text-neutral-900 transition-colors">
          &larr; All projects
        </a>
        <a href="/work/next-project" className="text-neutral-600 hover:text-neutral-900 transition-colors">
          Next project &rarr;
        </a>
      </nav>
    </article>
  )
}
