import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Quick thoughts, links, and observations from around the web.',
}

export default function NotesPage() {
  // Placeholder notes - in production these come from micro.blog feed
  const placeholderNotes = [
    {
      id: '1',
      content: 'Just discovered a fascinating article about design systems at scale. The key insight: start small and grow organically.',
      date: '2 hours ago',
    },
    {
      id: '2',
      content: 'Listening to some great ambient music while working on wireframes today.',
      date: '1 day ago',
      hasMusic: true,
    },
    {
      id: '3',
      content: 'The best interfaces are the ones you don\'t notice. They get out of the way and let you focus on what matters.',
      date: '3 days ago',
    },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Notes</h1>
      <p className="mt-4 text-neutral-600">
        Short-form thoughts, links, and observations. Posted via micro.blog.
      </p>

      {/* Notes Stream */}
      <div className="mt-12 space-y-8">
        {placeholderNotes.map((note) => (
          <article
            key={note.id}
            className="pb-8 border-b border-neutral-200 last:border-0"
          >
            <p className="text-neutral-900 leading-relaxed">{note.content}</p>
            {note.hasMusic && (
              <div className="mt-4 p-4 bg-neutral-100 rounded-lg text-neutral-500 text-sm">
                Music embed placeholder (Bandcamp/Spotify/etc.)
              </div>
            )}
            <time className="mt-3 block text-sm text-neutral-500">{note.date}</time>
          </article>
        ))}
      </div>

      {/* Info about micro.blog */}
      <div className="mt-12 p-6 bg-neutral-50 rounded-lg">
        <p className="text-sm text-neutral-600">
          Notes are posted via <a href="https://micro.blog" className="underline hover:text-neutral-900">micro.blog</a> and
          syndicated here. Follow along on the fediverse for real-time updates.
        </p>
      </div>
    </div>
  )
}
