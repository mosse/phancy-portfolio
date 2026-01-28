import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from './page'

describe('HomePage', () => {
  it('renders the hero heading', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/designer/i)
  })

  it('renders the hero tagline', () => {
    render(<HomePage />)
    expect(screen.getByText(/creating thoughtful digital experiences/i)).toBeInTheDocument()
  })

  it('renders a CTA link to work page', () => {
    render(<HomePage />)
    const ctaLink = screen.getByRole('link', { name: /view my work/i })
    expect(ctaLink).toHaveAttribute('href', '/work')
  })

  it('renders Featured Work section', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { name: /featured work/i })).toBeInTheDocument()
  })

  it('renders project placeholder cards', () => {
    render(<HomePage />)
    // Should have 4 placeholder project cards
    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 4')).toBeInTheDocument()
  })
})
