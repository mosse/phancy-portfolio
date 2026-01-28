import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about my background, design philosophy, and career journey.',
}

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">About Me</h1>

      {/* Bio Section */}
      <section className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
          Portrait Photo
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Hello, I&apos;m a designer</h2>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            With over a decade of experience in product design, I specialize in creating
            intuitive digital experiences that solve real problems for real people.
          </p>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            My approach combines user research, systems thinking, and a deep appreciation
            for craft to deliver designs that are both beautiful and functional.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mt-20 pt-20 border-t border-neutral-200">
        <h2 className="text-2xl font-semibold">Design Philosophy</h2>
        <p className="mt-4 text-neutral-600 leading-relaxed max-w-3xl">
          I believe great design is invisible. It should feel so natural that users
          don&apos;t think about it &mdash; they just accomplish what they came to do.
        </p>
      </section>

      {/* Timeline Placeholder */}
      <section className="mt-20 pt-20 border-t border-neutral-200">
        <h2 className="text-2xl font-semibold">Career Timeline</h2>
        <div className="mt-8 space-y-6">
          {['2020 - Present', '2017 - 2020', '2014 - 2017'].map((period) => (
            <div key={period} className="flex gap-6">
              <span className="text-sm text-neutral-500 w-32 shrink-0">{period}</span>
              <div className="h-16 flex-1 bg-neutral-100 rounded-md flex items-center justify-center text-neutral-400">
                Role placeholder
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
