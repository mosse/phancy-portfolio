import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CaseStudyPage, { generateStaticParams, generateMetadata } from './page'

// Mock the data module
vi.mock('@/data', () => ({
  projects: [
    {
      slug: 'project-1',
      title: 'First Project',
      subtitle: 'First project subtitle',
      category: 'mobile',
      coverImage: '/images/project1.jpg',
      role: 'Lead Designer',
      timeline: '3 months',
      team: '4 designers, 6 engineers',
      overview: 'Overview of the first project.',
      process: ['Research phase', 'Design phase', 'Testing phase'],
      solution: ['Solution item 1', 'Solution item 2'],
      outcomes: [
        { metric: '+50%', label: 'User engagement' },
        { metric: '-30%', label: 'Support tickets' },
      ],
      images: ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg'],
      featured: true,
      testimonial: {
        quote: 'Great work on this project!',
        author: 'Jane Smith',
        title: 'VP of Product, TechCorp',
      },
    },
    {
      slug: 'project-2',
      title: 'Second Project',
      subtitle: 'Second project subtitle',
      category: 'web',
      coverImage: '/images/project2.jpg',
      role: 'UX Designer',
      timeline: '6 months',
      team: '2 designers, 4 engineers',
      overview: 'Overview of the second project.',
      process: ['Discovery', 'Iteration'],
      solution: ['Key feature'],
      outcomes: [{ metric: '4.8', label: 'App store rating' }],
      images: ['/img1.jpg', '/img2.jpg'],
      featured: false,
    },
  ],
  getProjectBySlug: vi.fn(),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

import { getProjectBySlug, projects } from '@/data'
import { notFound } from 'next/navigation'

const mockGetProjectBySlug = vi.mocked(getProjectBySlug)
const mockNotFound = vi.mocked(notFound)

describe('CaseStudyPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateStaticParams', () => {
    it('returns params for all projects', async () => {
      const params = await generateStaticParams()

      expect(params).toEqual([
        { slug: 'project-1' },
        { slug: 'project-2' },
      ])
    })
  })

  describe('generateMetadata', () => {
    it('returns project title and overview when project exists', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'project-1' }) })

      expect(metadata).toEqual({
        title: 'First Project',
        description: 'Overview of the first project.',
      })
    })

    it('returns "Project Not Found" when project does not exist', async () => {
      mockGetProjectBySlug.mockReturnValue(undefined)

      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'non-existent' }) })

      expect(metadata).toEqual({
        title: 'Project Not Found',
      })
    })
  })

  describe('page rendering', () => {
    it('renders project title', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('First Project')
    })

    it('renders project category', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      expect(screen.getByText('mobile')).toBeInTheDocument()
    })

    it('renders project subtitle', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      expect(screen.getByText('First project subtitle')).toBeInTheDocument()
    })

    it('renders overview section with role, timeline, and team', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      expect(screen.getByText('Lead Designer')).toBeInTheDocument()
      expect(screen.getByText('3 months')).toBeInTheDocument()
      expect(screen.getByText('4 designers, 6 engineers')).toBeInTheDocument()
      expect(screen.getByText('Overview of the first project.')).toBeInTheDocument()
    })

    it('renders process steps with numbers', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      expect(screen.getByText('Research phase')).toBeInTheDocument()
      expect(screen.getByText('Design phase')).toBeInTheDocument()
      expect(screen.getByText('Testing phase')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('renders solution items', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      expect(screen.getByText('Solution item 1')).toBeInTheDocument()
      expect(screen.getByText('Solution item 2')).toBeInTheDocument()
    })

    it('renders outcomes with metrics and labels', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      expect(screen.getByText('+50%')).toBeInTheDocument()
      expect(screen.getByText('User engagement')).toBeInTheDocument()
      expect(screen.getByText('-30%')).toBeInTheDocument()
      expect(screen.getByText('Support tickets')).toBeInTheDocument()
    })

    it('renders testimonial when present', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      expect(screen.getByText(/Great work on this project!/)).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('VP of Product, TechCorp')).toBeInTheDocument()
    })

    it('does not render testimonial when not present', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[1])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-2' }) })
      render(page)

      expect(screen.queryByText(/Great work/)).not.toBeInTheDocument()
    })

    it('renders navigation links', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      const allProjectsLink = screen.getByRole('link', { name: /all projects/i })
      expect(allProjectsLink).toHaveAttribute('href', '/work')

      // Next project should be project-2
      const nextProjectLink = screen.getByRole('link', { name: /second project/i })
      expect(nextProjectLink).toHaveAttribute('href', '/work/project-2')
    })

    it('wraps around to first project when on last project', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[1])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-2' }) })
      render(page)

      // Next project should wrap to project-1
      const nextProjectLink = screen.getByRole('link', { name: /first project/i })
      expect(nextProjectLink).toHaveAttribute('href', '/work/project-1')
    })

    it('calls notFound when project does not exist', async () => {
      mockGetProjectBySlug.mockReturnValue(undefined)

      await expect(
        CaseStudyPage({ params: Promise.resolve({ slug: 'non-existent' }) })
      ).rejects.toThrow('NEXT_NOT_FOUND')

      expect(mockNotFound).toHaveBeenCalled()
    })

    it('renders section headings for accessibility', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      expect(screen.getByRole('heading', { name: /overview/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /process/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /solution/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /outcomes/i })).toBeInTheDocument()
    })

    it('renders screenshot placeholders', async () => {
      mockGetProjectBySlug.mockReturnValue(projects[0])

      const page = await CaseStudyPage({ params: Promise.resolve({ slug: 'project-1' }) })
      render(page)

      expect(screen.getByText('Screenshot 1')).toBeInTheDocument()
      expect(screen.getByText('Screenshot 2')).toBeInTheDocument()
      expect(screen.getByText('Screenshot 3')).toBeInTheDocument()
      expect(screen.getByText('Screenshot 4')).toBeInTheDocument()
    })
  })
})
