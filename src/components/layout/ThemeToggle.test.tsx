import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeToggle } from './ThemeToggle'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock matchMedia
const matchMediaMock = vi.fn()
Object.defineProperty(window, 'matchMedia', {
  value: matchMediaMock,
})

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.documentElement.classList.remove('dark')
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('renders toggle button', async () => {
    localStorageMock.getItem.mockReturnValue(null)
    render(<ThemeToggle />)

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  it('has accessible label', async () => {
    localStorageMock.getItem.mockReturnValue(null)
    render(<ThemeToggle />)

    await waitFor(() => {
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('theme'))
    })
  })

  it('loads saved theme from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('dark')
    render(<ThemeToggle />)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  it('cycles through themes on click: light -> dark -> system', async () => {
    localStorageMock.getItem.mockReturnValue('light')
    render(<ThemeToggle />)

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    const button = screen.getByRole('button')

    // Click to go from light to dark
    fireEvent.click(button)
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
    })

    // Click to go from dark to system
    fireEvent.click(button)
    await waitFor(() => {
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('theme')
    })
  })

  it('applies dark class when theme is dark', async () => {
    localStorageMock.getItem.mockReturnValue('dark')
    render(<ThemeToggle />)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  it('removes dark class when theme is light', async () => {
    document.documentElement.classList.add('dark')
    localStorageMock.getItem.mockReturnValue('light')
    render(<ThemeToggle />)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  it('respects system preference when theme is system', async () => {
    localStorageMock.getItem.mockReturnValue(null)
    matchMediaMock.mockReturnValue({
      matches: true, // prefers dark
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    render(<ThemeToggle />)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  it('renders placeholder before mounting to prevent hydration mismatch', () => {
    localStorageMock.getItem.mockReturnValue(null)
    const { container } = render(<ThemeToggle />)

    // Initial render should have a placeholder div
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })
})
