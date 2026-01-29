import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PostCard } from '../PostCard'
import { type BlogPostMeta } from '@/lib/blog'

const mockPost: BlogPostMeta = {
  slug: 'test-post',
  title: 'Test Blog Post',
  date: '2025-01-15T00:00:00.000Z',
  description: 'This is a test blog post description.',
  tags: ['design', 'testing'],
  coverImage: '/images/test.jpg',
  draft: false,
  readingTime: '5 min read',
}

describe('PostCard', () => {
  it('renders post title', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })

  it('renders post description', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('This is a test blog post description.')).toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('January 15, 2025')).toBeInTheDocument()
  })

  it('renders reading time', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('design')).toBeInTheDocument()
    expect(screen.getByText('testing')).toBeInTheDocument()
  })

  it('links to the correct blog post', () => {
    render(<PostCard post={mockPost} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/test-post')
  })

  it('handles posts without tags', () => {
    const postWithoutTags = { ...mockPost, tags: [] }
    render(<PostCard post={postWithoutTags} />)
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })
})
