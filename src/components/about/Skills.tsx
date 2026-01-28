import { skills } from '@/data'

export function Skills() {
  return (
    <section className="py-16 border-t border-neutral-200" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-3xl font-bold tracking-tight mb-12">
        Skills & Tools
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skillGroup) => (
          <div key={skillGroup.category}>
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
              {skillGroup.category}
            </h3>
            <ul className="mt-4 space-y-2">
              {skillGroup.items.map((item) => (
                <li key={item} className="text-neutral-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
