import { timeline, type TimelineEntry } from '@/data'

function TimelineItem({ entry, isLast }: { entry: TimelineEntry; isLast: boolean }) {
  const dateRange = entry.endDate ? `${entry.startDate} – ${entry.endDate}` : `${entry.startDate} – Present`

  return (
    <div className="relative pl-8 pb-12">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-neutral-200" aria-hidden="true" />
      )}

      {/* Dot */}
      <div
        className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 ${
          entry.endDate === null
            ? 'bg-neutral-900 border-neutral-900'
            : 'bg-white border-neutral-300'
        }`}
        aria-hidden="true"
      />

      <article>
        <header>
          <p className="text-sm font-medium text-neutral-500">{dateRange}</p>
          <h3 className="mt-1 text-xl font-semibold">{entry.role}</h3>
          <p className="text-neutral-600">
            {entry.company} &middot; {entry.location}
          </p>
        </header>

        <p className="mt-3 text-neutral-600">{entry.description}</p>

        <ul className="mt-3 space-y-1">
          {entry.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-neutral-500">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 flex-shrink-0" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}

export function Timeline() {
  return (
    <section className="py-16 border-t border-neutral-200" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="text-3xl font-bold tracking-tight mb-12">
        Experience
      </h2>

      <div>
        {timeline.map((entry, index) => (
          <TimelineItem key={entry.id} entry={entry} isLast={index === timeline.length - 1} />
        ))}
      </div>
    </section>
  )
}
