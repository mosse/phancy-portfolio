import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'
import { bio } from '@/data'

describe('Hero', () => {
  it('renders the name as heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(bio.name)
  })

  it('renders the title', () => {
    render(<Hero />)
    expect(screen.getByText(bio.title)).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Hero />)
    expect(screen.getByText(bio.tagline)).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /view my work/i })).toHaveAttribute('href', '/work')
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute('href', '/contact')
  })

  it('renders scroll indicator', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /scroll to featured work/i })).toBeInTheDocument()
  })

  it('has correct aria-label for section', () => {
    render(<Hero />)
    expect(screen.getByRole('region', { name: /introduction/i })).toBeInTheDocument()
  })
})
