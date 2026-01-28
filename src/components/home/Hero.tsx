import { bio } from '@/data'

export function Hero() {
  return (
    <section
      className="min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8"
      aria-label="Introduction"
    >
      <div className="max-w-4xl mx-auto w-full">
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          {bio.title}
        </p>
        <h1 className="mt-3 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
          {bio.name}
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-neutral-600 max-w-2xl leading-relaxed">
          {bio.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/work"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-700 rounded-md transition-colors"
          >
            View my work
          </a>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-neutral-900 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-md transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
        <a
          href="#featured-work"
          className="flex flex-col items-center text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Scroll to featured work"
        >
          <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
