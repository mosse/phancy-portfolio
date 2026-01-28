import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from './page'
import { bio, getFeaturedProjects, testimonials } from '@/data'

describe('HomePage', () => {
  it('renders the hero section with name', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(bio.name)
  })

  it('renders the hero tagline', () => {
    render(<HomePage />)
    expect(screen.getByText(bio.tagline)).toBeInTheDocument()
  })

  it('renders CTA links', () => {
    render(<HomePage />)
    expect(screen.getByRole('link', { name: /view my work/i })).toHaveAttribute('href', '/work')
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute('href', '/contact')
  })

  it('renders Featured Work section', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { name: /featured work/i })).toBeInTheDocument()
  })

  it('renders featured projects', () => {
    render(<HomePage />)
    const featuredProjects = getFeaturedProjects()

    featuredProjects.forEach((project) => {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    })
  })

  it('renders Testimonials section', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { name: /what people say/i })).toBeInTheDocument()
  })

  it('renders first testimonial', () => {
    render(<HomePage />)
    expect(screen.getByText(new RegExp(testimonials[0].quote))).toBeInTheDocument()
  })
})
