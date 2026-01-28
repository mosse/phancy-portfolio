import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NotesPage from './page'

describe('NotesPage', () => {
  it('renders the page heading', () => {
    render(<NotesPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/notes/i)
  })

  it('renders page description', () => {
    render(<NotesPage />)
    expect(screen.getByText(/short-form thoughts/i)).toBeInTheDocument()
  })

  it('renders placeholder notes', () => {
    render(<NotesPage />)
    expect(screen.getByText(/design systems at scale/i)).toBeInTheDocument()
    expect(screen.getByText(/ambient music/i)).toBeInTheDocument()
    expect(screen.getByText(/best interfaces/i)).toBeInTheDocument()
  })

  it('renders timestamps for notes', () => {
    render(<NotesPage />)
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    expect(screen.getByText('1 day ago')).toBeInTheDocument()
    expect(screen.getByText('3 days ago')).toBeInTheDocument()
  })

  it('renders music embed placeholder for music note', () => {
    render(<NotesPage />)
    expect(screen.getByText(/music embed placeholder/i)).toBeInTheDocument()
  })

  it('renders micro.blog info section', () => {
    render(<NotesPage />)
    expect(screen.getByRole('link', { name: /micro.blog/i })).toHaveAttribute('href', 'https://micro.blog')
  })
})
