import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NotesFeed } from '../NotesFeed'
import { type Note } from '@/lib/microblog'

const mockNotes: Note[] = [
  {
    id: '1',
    content_html: '<p>First note content</p>',
    date_published: '2025-01-20T12:00:00Z',
    url: 'https://micro.blog/test/1',
  },
  {
    id: '2',
    content_html: '<p>Second note content</p>',
    date_published: '2025-01-19T12:00:00Z',
    url: 'https://micro.blog/test/2',
  },
]

describe('NotesFeed', () => {
  it('renders all notes', () => {
    render(<NotesFeed notes={mockNotes} />)
    expect(screen.getByText('First note content')).toBeInTheDocument()
    expect(screen.getByText('Second note content')).toBeInTheDocument()
  })

  it('renders empty state when no notes', () => {
    render(<NotesFeed notes={[]} />)
    expect(screen.getByText('No notes yet. Check back soon!')).toBeInTheDocument()
  })

  it('shows micro.blog link in empty state', () => {
    render(<NotesFeed notes={[]} />)
    const link = screen.getByRole('link', { name: /micro.blog/i })
    expect(link).toHaveAttribute('href', 'https://micro.blog')
  })

  it('renders correct number of note cards', () => {
    render(<NotesFeed notes={mockNotes} />)
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(2)
  })
})
