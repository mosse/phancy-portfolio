'use client'

import { useState } from 'react'
import { projects, type ProjectCategory } from '@/data'
import { CategoryFilter } from './CategoryFilter'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all')

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <div>
      <div className="mb-8">
        <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-neutral-500 py-12">
          No projects found in this category.
        </p>
      )}
    </div>
  )
}
