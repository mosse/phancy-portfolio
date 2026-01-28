import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectCard } from './ProjectCard'
import { projects } from '@/data'

const mockProject = projects[0]

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByRole('heading', { name: mockProject.title })).toBeInTheDocument()
  })

  it('renders project subtitle', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText(mockProject.subtitle)).toBeInTheDocument()
  })

  it('renders project category', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText(mockProject.category)).toBeInTheDocument()
  })

  it('renders project role', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText(mockProject.role)).toBeInTheDocument()
  })

  it('renders project timeline', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText(mockProject.timeline)).toBeInTheDocument()
  })

  it('links to project page', () => {
    render(<ProjectCard project={mockProject} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/work/${mockProject.slug}`)
  })
})
