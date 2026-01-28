import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutPage from './page'
import { bio, timeline, skills } from '@/data'

describe('AboutPage', () => {
  it('renders the name as page heading', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(bio.name)
  })

  it('renders bio section', () => {
    render(<AboutPage />)
    expect(screen.getByText(bio.about[0])).toBeInTheDocument()
  })

  it('renders design philosophy', () => {
    render(<AboutPage />)
    expect(screen.getByText(bio.philosophy)).toBeInTheDocument()
  })

  it('renders experience section', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: timeline[0].role })).toBeInTheDocument()
  })

  it('renders skills section', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { name: /skills & tools/i })).toBeInTheDocument()
    expect(screen.getByText(skills[0].items[0])).toBeInTheDocument()
  })

  it('has portrait placeholder', () => {
    render(<AboutPage />)
    expect(screen.getByText('Portrait')).toBeInTheDocument()
  })
})
