import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

export type BlogPost = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  coverImage?: string
  draft: boolean
  content: string
  readingTime: string
}

export type BlogPostMeta = Omit<BlogPost, 'content'>

function parseFrontmatter(fileContent: string, slug: string): BlogPost {
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    description: data.description || '',
    tags: data.tags || [],
    coverImage: data.coverImage,
    draft: data.draft ?? false,
    content,
    readingTime: readingTime(content).text,
  }
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'))

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const filePath = path.join(BLOG_DIR, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const post = parseFrontmatter(fileContent, slug)

      // Exclude content from list view
      const { content: _, ...meta } = post
      return meta
    })
    .filter((post) => !post.draft) // Filter out drafts in production
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(fileContent, slug)
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}
