import type { Metadata } from 'next'
import { ProjectGrid } from '@/components/work'
import { PageTransition } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Explore my portfolio of product design case studies and projects.',
}

export default function WorkPage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Work</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl">
          A collection of projects spanning mobile apps, web platforms, and brand systems.
        </p>

        <div className="mt-12">
          <ProjectGrid />
        </div>
      </div>
    </PageTransition>
  )
}
