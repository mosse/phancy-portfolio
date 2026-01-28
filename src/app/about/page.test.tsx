import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutPage from './page'

describe('AboutPage', () => {
  it('renders the page heading', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/about me/i)
  })

  it('renders bio section', () => {
    render(<AboutPage />)
    expect(screen.getByText(/decade of experience/i)).toBeInTheDocument()
  })

  it('renders design philosophy section', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { name: /design philosophy/i })).toBeInTheDocument()
    expect(screen.getByText(/great design is invisible/i)).toBeInTheDocument()
  })

  it('renders career timeline section', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { name: /career timeline/i })).toBeInTheDocument()
    expect(screen.getByText('2020 - Present')).toBeInTheDocument()
  })

  it('has portrait photo placeholder', () => {
    render(<AboutPage />)
    expect(screen.getByText('Portrait Photo')).toBeInTheDocument()
  })
})
