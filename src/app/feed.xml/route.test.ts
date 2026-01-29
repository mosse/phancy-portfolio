import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { GET } from './route'

// Mock the blog module
vi.mock('@/lib/blog', () => ({
  getAllPosts: vi.fn(),
}))

// Mock the data module
vi.mock('@/data', () => ({
  bio: {
    name: 'Test Designer',
    tagline: 'Test tagline for RSS feed',
  },
}))

import { getAllPosts } from '@/lib/blog'
const mockGetAllPosts = vi.mocked(getAllPosts)

describe('RSS Feed Route', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('returns valid RSS XML response', async () => {
    mockGetAllPosts.mockReturnValue([
      {
        slug: 'test-post',
        title: 'Test Post Title',
        date: '2025-01-15T00:00:00.000Z',
        description: 'Test post description',
        tags: ['test', 'rss'],
        draft: false,
        readingTime: '3 min read',
      },
    ])

    const response = await GET()
    const body = await response.text()

    expect(response.headers.get('Content-Type')).toBe('application/xml')
    expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(body).toContain('<rss version="2.0"')
  })

  it('includes correct channel metadata', async () => {
    mockGetAllPosts.mockReturnValue([])

    const response = await GET()
    const body = await response.text()

    expect(body).toContain('<title>Test Designer - Blog</title>')
    expect(body).toContain('<description>Test tagline for RSS feed</description>')
    expect(body).toContain('<language>en-us</language>')
  })

  it('uses default site URL when env var not set', async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    mockGetAllPosts.mockReturnValue([])

    const response = await GET()
    const body = await response.text()

    expect(body).toContain('<link>https://jessicaphan.com/blog</link>')
    expect(body).toContain('href="https://jessicaphan.com/feed.xml"')
  })

  it('uses custom site URL from environment', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://custom-domain.com'
    mockGetAllPosts.mockReturnValue([])

    const response = await GET()
    const body = await response.text()

    expect(body).toContain('<link>https://custom-domain.com/blog</link>')
    expect(body).toContain('href="https://custom-domain.com/feed.xml"')
  })

  it('includes all posts as RSS items', async () => {
    mockGetAllPosts.mockReturnValue([
      {
        slug: 'first-post',
        title: 'First Post',
        date: '2025-01-20T00:00:00.000Z',
        description: 'First description',
        tags: ['tag1'],
        draft: false,
        readingTime: '2 min read',
      },
      {
        slug: 'second-post',
        title: 'Second Post',
        date: '2025-01-15T00:00:00.000Z',
        description: 'Second description',
        tags: ['tag2', 'tag3'],
        draft: false,
        readingTime: '5 min read',
      },
    ])

    const response = await GET()
    const body = await response.text()

    // Check first post
    expect(body).toContain('<title><![CDATA[First Post]]></title>')
    expect(body).toContain('<description><![CDATA[First description]]></description>')
    expect(body).toContain('<category>tag1</category>')

    // Check second post
    expect(body).toContain('<title><![CDATA[Second Post]]></title>')
    expect(body).toContain('<category>tag2</category>')
    expect(body).toContain('<category>tag3</category>')
  })

  it('generates correct post URLs', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
    mockGetAllPosts.mockReturnValue([
      {
        slug: 'my-awesome-post',
        title: 'My Post',
        date: '2025-01-15T00:00:00.000Z',
        description: 'Description',
        tags: [],
        draft: false,
        readingTime: '1 min read',
      },
    ])

    const response = await GET()
    const body = await response.text()

    expect(body).toContain('<link>https://example.com/blog/my-awesome-post</link>')
    expect(body).toContain('<guid isPermaLink="true">https://example.com/blog/my-awesome-post</guid>')
  })

  it('includes pubDate in correct format', async () => {
    mockGetAllPosts.mockReturnValue([
      {
        slug: 'dated-post',
        title: 'Dated Post',
        date: '2025-01-15T12:00:00.000Z',
        description: 'Description',
        tags: [],
        draft: false,
        readingTime: '1 min read',
      },
    ])

    const response = await GET()
    const body = await response.text()

    // UTC string format: "Wed, 15 Jan 2025 12:00:00 GMT"
    expect(body).toMatch(/<pubDate>.*Jan 2025.*<\/pubDate>/)
  })

  it('sets correct cache headers', async () => {
    mockGetAllPosts.mockReturnValue([])

    const response = await GET()

    expect(response.headers.get('Cache-Control')).toBe('s-maxage=3600, stale-while-revalidate')
  })

  it('includes atom self-link for feed discovery', async () => {
    mockGetAllPosts.mockReturnValue([])

    const response = await GET()
    const body = await response.text()

    expect(body).toContain('xmlns:atom="http://www.w3.org/2005/Atom"')
    expect(body).toContain('rel="self" type="application/rss+xml"')
  })

  it('handles posts with special characters in title', async () => {
    mockGetAllPosts.mockReturnValue([
      {
        slug: 'special-chars',
        title: 'Using <Components> & "Hooks" in React',
        date: '2025-01-15T00:00:00.000Z',
        description: 'Description with <html> & "quotes"',
        tags: [],
        draft: false,
        readingTime: '1 min read',
      },
    ])

    const response = await GET()
    const body = await response.text()

    // CDATA sections should preserve special characters
    expect(body).toContain('<![CDATA[Using <Components> & "Hooks" in React]]>')
  })

  it('handles empty posts array', async () => {
    mockGetAllPosts.mockReturnValue([])

    const response = await GET()
    const body = await response.text()

    expect(response.status).toBe(200)
    expect(body).toContain('<channel>')
    expect(body).not.toContain('<item>')
  })
})
