import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NoteCard } from '../NoteCard'
import { type Note } from '@/lib/microblog'

const mockNote: Note = {
  id: '123',
  content_html: '<p>This is a test note with some <a href="https://example.com">link</a>.</p>',
  date_published: '2025-01-15T10:30:00Z',
  url: 'https://micro.blog/test/123',
}

describe('NoteCard', () => {
  it('renders note content', () => {
    render(<NoteCard note={mockNote} />)
    expect(screen.getByText(/This is a test note/)).toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(<NoteCard note={mockNote} />)
    expect(screen.getByText(/Jan 15, 2025/)).toBeInTheDocument()
  })

  it('links to micro.blog post', () => {
    render(<NoteCard note={mockNote} />)
    const link = screen.getByRole('link', { name: /View on micro.blog/i })
    expect(link).toHaveAttribute('href', 'https://micro.blog/test/123')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders image when provided', () => {
    const noteWithImage: Note = {
      ...mockNote,
      image: 'https://example.com/photo.jpg',
    }
    const { container } = render(<NoteCard note={noteWithImage} />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
  })

  it('does not render image when not provided', () => {
    const { container } = render(<NoteCard note={mockNote} />)
    expect(container.querySelector('img')).not.toBeInTheDocument()
  })
})
