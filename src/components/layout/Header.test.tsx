import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './Header'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Header', () => {
  it('renders the logo/brand name', () => {
    render(<Header />)
    expect(screen.getByText('Phancy')).toBeInTheDocument()
  })

  it('renders all navigation links on desktop', () => {
    render(<Header />)
    const navLinks = ['Home', 'About', 'Work', 'Blog', 'Notes', 'Contact']

    navLinks.forEach((link) => {
      // Desktop nav should have visible links
      const links = screen.getAllByText(link)
      expect(links.length).toBeGreaterThan(0)
    })
  })

  it('has correct href attributes for navigation links', () => {
    render(<Header />)

    const expectedLinks = [
      { text: 'Home', href: '/' },
      { text: 'About', href: '/about' },
      { text: 'Work', href: '/work' },
      { text: 'Blog', href: '/blog' },
      { text: 'Notes', href: '/notes' },
      { text: 'Contact', href: '/contact' },
    ]

    expectedLinks.forEach(({ text, href }) => {
      const links = screen.getAllByRole('link', { name: text })
      expect(links[0]).toHaveAttribute('href', href)
    })
  })

  it('renders mobile menu button', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button', { name: /open menu/i })

    // Initially closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    // Click to open
    fireEvent.click(menuButton)
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute('aria-expanded', 'true')

    // Click to close
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }))
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes mobile menu when a link is clicked', () => {
    render(<Header />)

    // Open menu
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()

    // Click a mobile nav link (get the second one which is in mobile nav)
    const aboutLinks = screen.getAllByText('About')
    fireEvent.click(aboutLinks[1]) // Mobile nav link

    // Menu should be closed
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('has accessible navigation structure', () => {
    render(<Header />)

    // Should have header element
    expect(screen.getByRole('banner')).toBeInTheDocument()

    // Should have navigation
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('logo links to home page', () => {
    render(<Header />)
    const logo = screen.getByText('Phancy')
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })
})
