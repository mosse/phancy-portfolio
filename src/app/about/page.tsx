import type { Metadata } from 'next'
import { Bio, Timeline, Skills } from '@/components/about'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about my background, design philosophy, and career journey.',
}

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Bio />
      <Timeline />
      <Skills />
    </div>
  )
}
