import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogPostPage, { generateStaticParams, generateMetadata } from './page'

// Mock the blog module
vi.mock('@/lib/blog', () => ({
  getPostBySlug: vi.fn(),
  getAllSlugs: vi.fn(),
}))

// Mock next-mdx-remote/rsc
vi.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: ({ source }: { source: string }) => (
    <div data-testid="mdx-content">{source}</div>
  ),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import { notFound } from 'next/navigation'

const mockGetPostBySlug = vi.mocked(getPostBySlug)
const mockGetAllSlugs = vi.mocked(getAllSlugs)
const mockNotFound = vi.mocked(notFound)

const mockPost = {
  slug: 'test-post',
  title: 'Test Blog Post',
  date: '2025-01-15T00:00:00.000Z',
  description: 'A test blog post description',
  tags: ['react', 'testing'],
  coverImage: '/images/cover.jpg',
  draft: false,
  content: 'This is the MDX content of the post.',
  readingTime: '5 min read',
}

describe('BlogPostPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateStaticParams', () => {
    it('returns params for all blog post slugs', async () => {
      mockGetAllSlugs.mockReturnValue(['post-1', 'post-2', 'post-3'])

      const params = await generateStaticParams()

      expect(params).toEqual([
        { slug: 'post-1' },
        { slug: 'post-2' },
        { slug: 'post-3' },
      ])
    })

    it('returns empty array when no posts exist', async () => {
      mockGetAllSlugs.mockReturnValue([])

      const params = await generateStaticParams()

      expect(params).toEqual([])
    })
  })

  describe('generateMetadata', () => {
    it('returns post title and description when post exists', async () => {
      mockGetPostBySlug.mockReturnValue(mockPost)

      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'test-post' }) })

      expect(metadata).toEqual({
        title: 'Test Blog Post',
        description: 'A test blog post description',
      })
    })

    it('returns "Post Not Found" when post does not exist', async () => {
      mockGetPostBySlug.mockReturnValue(null)

      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'non-existent' }) })

      expect(metadata).toEqual({
        title: 'Post Not Found',
      })
    })
  })

  describe('page rendering', () => {
    it('renders post title', async () => {
      mockGetPostBySlug.mockReturnValue(mockPost)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Blog Post')
    })

    it('renders post description', async () => {
      mockGetPostBySlug.mockReturnValue(mockPost)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('A test blog post description')).toBeInTheDocument()
    })

    it('renders formatted date', async () => {
      mockGetPostBySlug.mockReturnValue(mockPost)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('January 15, 2025')).toBeInTheDocument()
    })

    it('renders reading time', async () => {
      mockGetPostBySlug.mockReturnValue(mockPost)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('5 min read')).toBeInTheDocument()
    })

    it('renders MDX content', async () => {
      mockGetPostBySlug.mockReturnValue(mockPost)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByTestId('mdx-content')).toHaveTextContent('This is the MDX content of the post.')
    })

    it('renders tags', async () => {
      mockGetPostBySlug.mockReturnValue(mockPost)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('react')).toBeInTheDocument()
      expect(screen.getByText('testing')).toBeInTheDocument()
    })

    it('renders cover image when provided', async () => {
      mockGetPostBySlug.mockReturnValue(mockPost)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      const { container } = render(page)

      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', '/images/cover.jpg')
    })

    it('does not render cover image when not provided', async () => {
      const postWithoutImage = { ...mockPost, coverImage: undefined }
      mockGetPostBySlug.mockReturnValue(postWithoutImage)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      const { container } = render(page)

      expect(container.querySelector('img')).not.toBeInTheDocument()
    })

    it('does not render tags section when no tags', async () => {
      const postWithoutTags = { ...mockPost, tags: [] }
      mockGetPostBySlug.mockReturnValue(postWithoutTags)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.queryByText('react')).not.toBeInTheDocument()
    })

    it('renders back to blog link', async () => {
      mockGetPostBySlug.mockReturnValue(mockPost)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const backLink = screen.getByRole('link', { name: /back to blog/i })
      expect(backLink).toHaveAttribute('href', '/blog')
    })

    it('calls notFound when post does not exist', async () => {
      mockGetPostBySlug.mockReturnValue(null)

      await expect(
        BlogPostPage({ params: Promise.resolve({ slug: 'non-existent' }) })
      ).rejects.toThrow('NEXT_NOT_FOUND')

      expect(mockNotFound).toHaveBeenCalled()
    })

    it('renders datetime attribute on time element', async () => {
      mockGetPostBySlug.mockReturnValue(mockPost)

      const page = await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const timeElement = screen.getByText('January 15, 2025')
      expect(timeElement).toHaveAttribute('datetime', '2025-01-15T00:00:00.000Z')
    })
  })
})
