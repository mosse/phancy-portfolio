import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Bio } from './Bio'
import { bio } from '@/data'

describe('Bio', () => {
  it('renders the name as heading', () => {
    render(<Bio />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(bio.name)
  })

  it('renders the title and location', () => {
    render(<Bio />)
    expect(screen.getByText(new RegExp(bio.title))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(bio.location))).toBeInTheDocument()
  })

  it('renders all bio paragraphs', () => {
    render(<Bio />)
    bio.about.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    })
  })

  it('renders the design philosophy', () => {
    render(<Bio />)
    expect(screen.getByText(bio.philosophy)).toBeInTheDocument()
  })

  it('renders philosophy in a blockquote', () => {
    render(<Bio />)
    expect(screen.getByRole('blockquote')).toBeInTheDocument()
  })

  it('has accessible section with aria-labelledby', () => {
    render(<Bio />)
    const section = screen.getByRole('region', { name: bio.name })
    expect(section).toBeInTheDocument()
  })
})
