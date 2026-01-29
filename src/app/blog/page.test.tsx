import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogPage from './page'

describe('BlogPage', () => {
  it('renders the page heading', () => {
    render(<BlogPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/blog/i)
  })

  it('renders page description', () => {
    render(<BlogPage />)
    expect(screen.getByText(/long-form writing/i)).toBeInTheDocument()
  })

  it('renders blog posts from MDX content', () => {
    render(<BlogPage />)

    // Should render the actual MDX blog posts
    expect(screen.getByText('Design Systems at Scale')).toBeInTheDocument()
    expect(screen.getByText('Running Effective User Research Remotely')).toBeInTheDocument()
  })

  it('blog post links have correct hrefs', () => {
    render(<BlogPage />)
    const postLinks = screen.getAllByRole('link')

    // Posts are sorted by date (newest first)
    expect(postLinks[0]).toHaveAttribute('href', '/blog/design-systems-at-scale')
    expect(postLinks[1]).toHaveAttribute('href', '/blog/user-research-remote')
  })

  it('renders formatted dates for blog posts', () => {
    render(<BlogPage />)
    expect(screen.getByText('March 15, 2025')).toBeInTheDocument()
    expect(screen.getByText('February 20, 2025')).toBeInTheDocument()
  })

  it('renders reading time for posts', () => {
    render(<BlogPage />)
    // Reading time is calculated from content length
    const readingTimes = screen.getAllByText(/min read/i)
    expect(readingTimes.length).toBeGreaterThan(0)
  })

  it('renders tags for posts', () => {
    render(<BlogPage />)
    expect(screen.getByText('design systems')).toBeInTheDocument()
    expect(screen.getByText('user research')).toBeInTheDocument()
  })
})
