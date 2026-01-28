import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WorkPage from './page'
import { projects, categories } from '@/data'

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

    categories.forEach((category) => {
      expect(screen.getByRole('button', { name: category.label })).toBeInTheDocument()
    })
  })

  it('renders all projects', () => {
    render(<WorkPage />)

    projects.forEach((project) => {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    })
  })

  it('project cards link to case study pages', () => {
    render(<WorkPage />)
    const projectLinks = screen.getAllByRole('link')

    // Each project should have a link to its case study
    projects.forEach((project) => {
      const link = projectLinks.find((l) => l.getAttribute('href') === `/work/${project.slug}`)
      expect(link).toBeDefined()
    })
  })
})
