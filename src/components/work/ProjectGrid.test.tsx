import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectGrid } from './ProjectGrid'
import { projects, categories } from '@/data'

describe('ProjectGrid', () => {
  it('renders all projects by default', () => {
    render(<ProjectGrid />)

    projects.forEach((project) => {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    })
  })

  it('renders category filter', () => {
    render(<ProjectGrid />)

    categories.forEach((category) => {
      expect(screen.getByRole('button', { name: category.label })).toBeInTheDocument()
    })
  })

  it('filters projects when category is selected', async () => {
    const user = userEvent.setup()
    render(<ProjectGrid />)

    await user.click(screen.getByRole('button', { name: 'Mobile' }))

    const mobileProjects = projects.filter((p) => p.category === 'mobile')
    const otherProjects = projects.filter((p) => p.category !== 'mobile')

    // Mobile projects should be visible
    mobileProjects.forEach((project) => {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    })

    // Other projects should not be visible
    otherProjects.forEach((project) => {
      expect(screen.queryByRole('heading', { name: project.title })).not.toBeInTheDocument()
    })
  })

  it('shows all projects when "All Work" is selected', async () => {
    const user = userEvent.setup()
    render(<ProjectGrid />)

    // First select a specific category
    await user.click(screen.getByRole('button', { name: 'Mobile' }))

    // Then select "All Work"
    await user.click(screen.getByRole('button', { name: 'All Work' }))

    // All projects should be visible again
    projects.forEach((project) => {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    })
  })
})
