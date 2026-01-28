'use client'

import { categories, type ProjectCategory } from '@/data'

type CategoryFilterProps = {
  selected: ProjectCategory | 'all'
  onChange: (category: ProjectCategory | 'all') => void
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <nav aria-label="Project categories">
      <ul className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <li key={category.value}>
            <button
              onClick={() => onChange(category.value)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selected === category.value
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
              aria-pressed={selected === category.value}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
