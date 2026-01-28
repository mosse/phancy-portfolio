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

  it('renders blog post previews', () => {
    render(<BlogPage />)

    // Should have 3 placeholder blog posts
    expect(screen.getByText('Blog Post Title 1')).toBeInTheDocument()
    expect(screen.getByText('Blog Post Title 2')).toBeInTheDocument()
    expect(screen.getByText('Blog Post Title 3')).toBeInTheDocument()
  })

  it('blog post links have correct hrefs', () => {
    render(<BlogPage />)
    const postLinks = screen.getAllByRole('link')

    expect(postLinks[0]).toHaveAttribute('href', '/blog/post-1')
    expect(postLinks[1]).toHaveAttribute('href', '/blog/post-2')
    expect(postLinks[2]).toHaveAttribute('href', '/blog/post-3')
  })

  it('renders dates for blog posts', () => {
    render(<BlogPage />)
    expect(screen.getByText('January 5, 2025')).toBeInTheDocument()
    expect(screen.getByText('January 10, 2025')).toBeInTheDocument()
  })
})
