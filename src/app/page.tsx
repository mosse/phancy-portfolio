export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-20">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
          Designer &amp;
          <br />
          Problem Solver
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-neutral-600 max-w-2xl">
          Creating thoughtful digital experiences that connect people with products they love.
        </p>
        <div className="mt-10">
          <a
            href="/work"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-700 rounded-md transition-colors"
          >
            View my work
            <span className="ml-2" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20 border-t border-neutral-200">
        <h2 className="text-3xl font-bold tracking-tight">Featured Work</h2>
        <p className="mt-4 text-neutral-600">
          A selection of projects showcasing my design process and outcomes.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {/* Placeholder cards */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400"
            >
              Project {i}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
