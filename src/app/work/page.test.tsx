import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WorkPage from './page'

describe('WorkPage', () => {
  it('renders the page heading', () => {
    render(<WorkPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/work/i)
  })

  it('renders page description', () => {
    render(<WorkPage />)
    expect(screen.getByText(/collection of projects/i)).toBeInTheDocument()
  })

  it('renders category filter buttons', () => {
    render(<WorkPage />)
    const categories = ['All', 'Mobile', 'Web', 'Branding', 'Product']

    categories.forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument()
    })
  })

  it('renders project cards with links', () => {
    render(<WorkPage />)
    const projectLinks = screen.getAllByRole('link')

    // Should have 6 project links
    const projectCardLinks = projectLinks.filter((link) =>
      link.getAttribute('href')?.startsWith('/work/project-')
    )
    expect(projectCardLinks).toHaveLength(6)
  })

  it('project cards have titles', () => {
    render(<WorkPage />)
    expect(screen.getByText('Project Title 1')).toBeInTheDocument()
    expect(screen.getByText('Project Title 6')).toBeInTheDocument()
  })
})
