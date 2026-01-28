import { bio } from '@/data'

export function Bio() {
  return (
    <section className="py-12" aria-labelledby="bio-heading">
      <div className="grid gap-12 lg:grid-cols-3">
        {/* Portrait */}
        <div className="lg:col-span-1">
          <div className="aspect-[3/4] bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400">
            Portrait
          </div>
        </div>

        {/* Bio content */}
        <div className="lg:col-span-2">
          <h1 id="bio-heading" className="text-4xl sm:text-5xl font-bold tracking-tight">
            {bio.name}
          </h1>
          <p className="mt-2 text-xl text-neutral-600">{bio.title} &middot; {bio.location}</p>

          <div className="mt-8 space-y-4 text-neutral-600 leading-relaxed">
            {bio.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <blockquote className="mt-8 pl-6 border-l-4 border-neutral-300">
            <p className="text-lg italic text-neutral-700">{bio.philosophy}</p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
