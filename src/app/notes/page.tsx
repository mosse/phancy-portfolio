import type { Metadata } from 'next'
import { getNotes } from '@/lib/microblog'
import { NotesFeed } from '@/components/notes'
import { PageTransition } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Quick thoughts, links, and observations from around the web.',
}

// Revalidate every hour
export const revalidate = 3600

export default async function NotesPage() {
  const notes = await getNotes()

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Notes</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Short-form thoughts, links, and observations. Posted via micro.blog.
        </p>

        <div className="mt-12">
          <NotesFeed notes={notes} />
        </div>

        {/* Info about micro.blog */}
        <div className="mt-12 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Notes are posted via{' '}
            <a
              href="https://micro.blog"
              className="underline hover:text-neutral-900 dark:hover:text-neutral-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              micro.blog
            </a>{' '}
            and syndicated here. Follow along on the fediverse for real-time updates.
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
