import { type Note, detectMusicEmbed } from '@/lib/microblog'
import { MusicEmbed } from './MusicEmbed'

type NoteCardProps = {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const formattedDate = new Date(note.date_published).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  // Check for music embed in content
  const musicEmbed = detectMusicEmbed(note.content_html)

  return (
    <article className="py-6 border-b border-neutral-200 dark:border-neutral-700 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <time
          dateTime={note.date_published}
          className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap"
        >
          {formattedDate}
        </time>
        <a
          href={note.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          aria-label="View on micro.blog"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>

      <div
        className="mt-2 prose prose-neutral dark:prose-invert prose-sm max-w-none prose-a:text-neutral-900 dark:prose-a:text-neutral-100 prose-a:underline prose-a:underline-offset-4"
        dangerouslySetInnerHTML={{ __html: note.content_html }}
      />

      {/* Music embed if detected */}
      {musicEmbed && (
        <MusicEmbed platform={musicEmbed.platform} url={musicEmbed.url} />
      )}

      {/* Image attachment */}
      {note.image && (
        <div className="mt-4">
          <img
            src={note.image}
            alt=""
            className="rounded-lg max-w-full h-auto"
            loading="lazy"
          />
        </div>
      )}
    </article>
  )
}
