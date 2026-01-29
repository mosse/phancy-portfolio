import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PostList } from '../PostList'
import { type BlogPostMeta } from '@/lib/blog'

const mockPosts: BlogPostMeta[] = [
  {
    slug: 'post-1',
    title: 'First Post',
    date: '2025-01-20T00:00:00.000Z',
    description: 'Description for first post.',
    tags: ['design'],
    draft: false,
    readingTime: '3 min read',
  },
  {
    slug: 'post-2',
    title: 'Second Post',
    date: '2025-01-15T00:00:00.000Z',
    description: 'Description for second post.',
    tags: ['development'],
    draft: false,
    readingTime: '5 min read',
  },
]

describe('PostList', () => {
  it('renders all posts', () => {
    render(<PostList posts={mockPosts} />)
    expect(screen.getByText('First Post')).toBeInTheDocument()
    expect(screen.getByText('Second Post')).toBeInTheDocument()
  })

  it('renders empty state when no posts', () => {
    render(<PostList posts={[]} />)
    expect(screen.getByText('No posts yet. Check back soon!')).toBeInTheDocument()
  })

  it('renders correct number of post cards', () => {
    render(<PostList posts={mockPosts} />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
  })

  it('links to correct blog posts', () => {
    render(<PostList posts={mockPosts} />)
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/blog/post-1')
    expect(links[1]).toHaveAttribute('href', '/blog/post-2')
  })
})
