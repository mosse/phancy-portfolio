import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, onClick, ...props }: { children: React.ReactNode; href: string; onClick?: () => void }) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}))

describe('Footer', () => {
  it('renders copyright notice with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Footer />)
    const socialLinks = ['LinkedIn', 'Dribbble', 'GitHub']

    socialLinks.forEach((link) => {
      expect(screen.getByRole('link', { name: link })).toBeInTheDocument()
    })
  })

  it('renders back to top link', () => {
    render(<Footer />)
    expect(screen.getByText(/back to top/i)).toBeInTheDocument()
  })

  it('has accessible footer structure', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('social links have correct aria-labels', () => {
    render(<Footer />)

    const linkedInLink = screen.getByRole('link', { name: 'LinkedIn' })
    const dribbbleLink = screen.getByRole('link', { name: 'Dribbble' })
    const gitHubLink = screen.getByRole('link', { name: 'GitHub' })

    expect(linkedInLink).toHaveAttribute('aria-label', 'LinkedIn')
    expect(dribbbleLink).toHaveAttribute('aria-label', 'Dribbble')
    expect(gitHubLink).toHaveAttribute('aria-label', 'GitHub')
  })
})
