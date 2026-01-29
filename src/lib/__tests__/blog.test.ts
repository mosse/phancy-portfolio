import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  getAllPosts,
  getPostBySlug,
  getAllSlugs,
  getPostsByTag,
  getAllTags,
  type BlogPost,
  type BlogPostMeta,
} from '../blog'

// Mock fs module
vi.mock('fs')

const mockFs = vi.mocked(fs)

// Sample MDX content for testing
const createMockPost = (overrides: Partial<{
  title: string
  date: string
  description: string
  tags: string[]
  coverImage: string
  draft: boolean
  content: string
}> = {}) => {
  const {
    title = 'Test Post',
    date = '2025-01-15',
    description = 'Test description',
    tags = ['test', 'vitest'],
    coverImage,
    draft = false,
    content = 'This is the post content.',
  } = overrides

  return `---
title: "${title}"
date: ${date}
description: "${description}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
${coverImage ? `coverImage: "${coverImage}"` : ''}
draft: ${draft}
---

${content}`
}

describe('blog utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('getAllPosts', () => {
    it('returns empty array when blog directory does not exist', () => {
      mockFs.existsSync.mockReturnValue(false)

      const posts = getAllPosts()

      expect(posts).toEqual([])
      expect(mockFs.existsSync).toHaveBeenCalled()
    })

    it('returns posts sorted by date (newest first)', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([
        'old-post.mdx',
        'new-post.mdx',
      ] as unknown as fs.Dirent[])
      mockFs.readFileSync.mockImplementation((filePath) => {
        if (String(filePath).includes('old-post')) {
          return createMockPost({ title: 'Old Post', date: '2024-01-01' })
        }
        return createMockPost({ title: 'New Post', date: '2025-01-15' })
      })

      const posts = getAllPosts()

      expect(posts).toHaveLength(2)
      expect(posts[0].title).toBe('New Post')
      expect(posts[1].title).toBe('Old Post')
    })

    it('filters out draft posts', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([
        'published.mdx',
        'draft.mdx',
      ] as unknown as fs.Dirent[])
      mockFs.readFileSync.mockImplementation((filePath) => {
        if (String(filePath).includes('draft')) {
          return createMockPost({ title: 'Draft Post', draft: true })
        }
        return createMockPost({ title: 'Published Post', draft: false })
      })

      const posts = getAllPosts()

      expect(posts).toHaveLength(1)
      expect(posts[0].title).toBe('Published Post')
    })

    it('excludes content from returned posts', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['post.mdx'] as unknown as fs.Dirent[])
      mockFs.readFileSync.mockReturnValue(createMockPost({ content: 'Secret content' }))

      const posts = getAllPosts()

      expect(posts).toHaveLength(1)
      expect((posts[0] as BlogPost).content).toBeUndefined()
    })

    it('only processes .mdx files', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([
        'post.mdx',
        'readme.md',
        'notes.txt',
        'another.mdx',
      ] as unknown as fs.Dirent[])
      mockFs.readFileSync.mockReturnValue(createMockPost())

      const posts = getAllPosts()

      expect(posts).toHaveLength(2)
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(2)
    })

    it('handles posts with missing frontmatter fields gracefully', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['minimal.mdx'] as unknown as fs.Dirent[])
      mockFs.readFileSync.mockReturnValue(`---
---

Just content, no frontmatter.`)

      const posts = getAllPosts()

      expect(posts).toHaveLength(1)
      expect(posts[0].title).toBe('Untitled')
      expect(posts[0].description).toBe('')
      expect(posts[0].tags).toEqual([])
      expect(posts[0].draft).toBe(false)
    })

    it('calculates reading time for each post', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['post.mdx'] as unknown as fs.Dirent[])
      mockFs.readFileSync.mockReturnValue(createMockPost({
        content: 'Word '.repeat(500), // ~500 words
      }))

      const posts = getAllPosts()

      expect(posts[0].readingTime).toMatch(/\d+ min read/)
    })
  })

  describe('getPostBySlug', () => {
    it('returns null when post does not exist', () => {
      mockFs.existsSync.mockReturnValue(false)

      const post = getPostBySlug('non-existent')

      expect(post).toBeNull()
    })

    it('returns full post with content when post exists', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(createMockPost({
        title: 'My Post',
        content: 'Full content here',
      }))

      const post = getPostBySlug('my-post')

      expect(post).not.toBeNull()
      expect(post!.title).toBe('My Post')
      expect(post!.content).toContain('Full content here')
      expect(post!.slug).toBe('my-post')
    })

    it('correctly parses all frontmatter fields', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(createMockPost({
        title: 'Complete Post',
        date: '2025-03-20',
        description: 'A complete description',
        tags: ['react', 'testing'],
        coverImage: '/images/cover.jpg',
        draft: false,
      }))

      const post = getPostBySlug('complete-post')

      expect(post!.title).toBe('Complete Post')
      expect(post!.description).toBe('A complete description')
      expect(post!.tags).toEqual(['react', 'testing'])
      expect(post!.coverImage).toBe('/images/cover.jpg')
      expect(post!.draft).toBe(false)
      expect(post!.date).toMatch(/2025-03-20/)
    })
  })

  describe('getAllSlugs', () => {
    it('returns empty array when blog directory does not exist', () => {
      mockFs.existsSync.mockReturnValue(false)

      const slugs = getAllSlugs()

      expect(slugs).toEqual([])
    })

    it('returns slugs for all mdx files', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([
        'first-post.mdx',
        'second-post.mdx',
        'readme.md',
      ] as unknown as fs.Dirent[])

      const slugs = getAllSlugs()

      expect(slugs).toEqual(['first-post', 'second-post'])
    })

    it('strips .mdx extension from slugs', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['my-awesome-post.mdx'] as unknown as fs.Dirent[])

      const slugs = getAllSlugs()

      expect(slugs[0]).toBe('my-awesome-post')
      expect(slugs[0]).not.toContain('.mdx')
    })
  })

  describe('getPostsByTag', () => {
    it('returns only posts with the specified tag', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([
        'react-post.mdx',
        'vue-post.mdx',
        'react-tips.mdx',
      ] as unknown as fs.Dirent[])
      mockFs.readFileSync.mockImplementation((filePath) => {
        if (String(filePath).includes('react')) {
          return createMockPost({ title: 'React Post', tags: ['react', 'javascript'] })
        }
        return createMockPost({ title: 'Vue Post', tags: ['vue', 'javascript'] })
      })

      const reactPosts = getPostsByTag('react')

      expect(reactPosts).toHaveLength(2)
      reactPosts.forEach(post => {
        expect(post.tags).toContain('react')
      })
    })

    it('returns empty array when no posts have the tag', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['post.mdx'] as unknown as fs.Dirent[])
      mockFs.readFileSync.mockReturnValue(createMockPost({ tags: ['react'] }))

      const posts = getPostsByTag('angular')

      expect(posts).toEqual([])
    })
  })

  describe('getAllTags', () => {
    it('returns all unique tags sorted alphabetically', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([
        'post1.mdx',
        'post2.mdx',
      ] as unknown as fs.Dirent[])
      mockFs.readFileSync.mockImplementation((filePath) => {
        if (String(filePath).includes('post1')) {
          return createMockPost({ tags: ['zebra', 'apple'] })
        }
        return createMockPost({ tags: ['banana', 'apple'] })
      })

      const tags = getAllTags()

      expect(tags).toEqual(['apple', 'banana', 'zebra'])
    })

    it('returns empty array when no posts exist', () => {
      mockFs.existsSync.mockReturnValue(false)

      const tags = getAllTags()

      expect(tags).toEqual([])
    })

    it('deduplicates tags across posts', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([
        'post1.mdx',
        'post2.mdx',
        'post3.mdx',
      ] as unknown as fs.Dirent[])
      mockFs.readFileSync.mockReturnValue(createMockPost({ tags: ['common-tag'] }))

      const tags = getAllTags()

      expect(tags).toEqual(['common-tag'])
      expect(tags).toHaveLength(1)
    })
  })
})
