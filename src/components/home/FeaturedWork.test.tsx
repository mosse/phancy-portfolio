import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturedWork } from './FeaturedWork'
import { getFeaturedProjects } from '@/data'

describe('FeaturedWork', () => {
  it('renders the section heading', () => {
    render(<FeaturedWork />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/featured work/i)
  })

  it('renders all featured projects', () => {
    render(<FeaturedWork />)
    const featuredProjects = getFeaturedProjects()

    featuredProjects.forEach((project) => {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    })
  })

  it('renders project cards with correct links', () => {
    render(<FeaturedWork />)
    const featuredProjects = getFeaturedProjects()

    featuredProjects.forEach((project) => {
      const link = screen.getByRole('link', { name: new RegExp(project.title) })
      expect(link).toHaveAttribute('href', `/work/${project.slug}`)
    })
  })

  it('displays project categories', () => {
    render(<FeaturedWork />)
    const featuredProjects = getFeaturedProjects()

    featuredProjects.forEach((project) => {
      expect(screen.getByText(project.category)).toBeInTheDocument()
    })
  })

  it('displays project subtitles', () => {
    render(<FeaturedWork />)
    const featuredProjects = getFeaturedProjects()

    featuredProjects.forEach((project) => {
      expect(screen.getByText(project.subtitle)).toBeInTheDocument()
    })
  })

  it('has view all projects link', () => {
    render(<FeaturedWork />)
    const links = screen.getAllByRole('link', { name: /view all projects/i })
    expect(links.length).toBeGreaterThan(0)
    expect(links[0]).toHaveAttribute('href', '/work')
  })

  it('has accessible section with aria-labelledby', () => {
    render(<FeaturedWork />)
    const section = screen.getByRole('region', { name: /featured work/i })
    expect(section).toBeInTheDocument()
  })
})
