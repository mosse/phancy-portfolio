import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import NotesPage from './page'

// Mock the microblog module
vi.mock('@/lib/microblog', () => ({
  getNotes: vi.fn().mockResolvedValue([]),
}))

// Import the mocked function to control it in tests
import { getNotes } from '@/lib/microblog'
const mockGetNotes = vi.mocked(getNotes)

describe('NotesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the page heading', async () => {
    mockGetNotes.mockResolvedValue([])
    const page = await NotesPage()
    render(page)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/notes/i)
  })

  it('renders page description', async () => {
    mockGetNotes.mockResolvedValue([])
    const page = await NotesPage()
    render(page)
    expect(screen.getByText(/short-form thoughts/i)).toBeInTheDocument()
  })

  it('renders notes when available', async () => {
    mockGetNotes.mockResolvedValue([
      {
        id: '1',
        content_html: '<p>Test note content here</p>',
        date_published: '2025-01-15T12:00:00Z',
        url: 'https://micro.blog/test/1',
      },
    ])
    const page = await NotesPage()
    render(page)
    expect(screen.getByText('Test note content here')).toBeInTheDocument()
  })

  it('renders empty state when no notes', async () => {
    mockGetNotes.mockResolvedValue([])
    const page = await NotesPage()
    render(page)
    expect(screen.getByText('No notes yet. Check back soon!')).toBeInTheDocument()
  })

  it('renders micro.blog info section', async () => {
    mockGetNotes.mockResolvedValue([])
    const page = await NotesPage()
    render(page)
    const links = screen.getAllByRole('link', { name: /micro.blog/i })
    expect(links[0]).toHaveAttribute('href', 'https://micro.blog')
  })
})
