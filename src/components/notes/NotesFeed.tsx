import { type Note } from '@/lib/microblog'
import { NoteCard } from './NoteCard'

type NotesFeedProps = {
  notes: Note[]
}

export function NotesFeed({ notes }: NotesFeedProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">No notes yet. Check back soon!</p>
        <p className="mt-2 text-sm text-neutral-400">
          Notes are posted via{' '}
          <a
            href="https://micro.blog"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-neutral-600"
          >
            micro.blog
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-neutral-200">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}
