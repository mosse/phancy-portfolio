import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timeline } from './Timeline'
import { timeline } from '@/data'

describe('Timeline', () => {
  it('renders the section heading', () => {
    render(<Timeline />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/experience/i)
  })

  it('renders all timeline entries', () => {
    render(<Timeline />)
    timeline.forEach((entry) => {
      expect(screen.getByRole('heading', { name: entry.role })).toBeInTheDocument()
    })
  })

  it('displays company names', () => {
    render(<Timeline />)
    timeline.forEach((entry) => {
      expect(screen.getByText(new RegExp(entry.company))).toBeInTheDocument()
    })
  })

  it('displays date ranges', () => {
    render(<Timeline />)
    // Check that dates are rendered (multiple entries may contain 2022)
    const dateElements = screen.getAllByText(/2022/)
    expect(dateElements.length).toBeGreaterThan(0)
  })

  it('shows "Present" for current role', () => {
    render(<Timeline />)
    expect(screen.getByText(/Present/)).toBeInTheDocument()
  })

  it('displays role descriptions', () => {
    render(<Timeline />)
    timeline.forEach((entry) => {
      expect(screen.getByText(entry.description)).toBeInTheDocument()
    })
  })

  it('displays highlights', () => {
    render(<Timeline />)
    // Check for at least one highlight from first entry
    expect(screen.getByText(timeline[0].highlights[0])).toBeInTheDocument()
  })

  it('has accessible section with aria-labelledby', () => {
    render(<Timeline />)
    const section = screen.getByRole('region', { name: /experience/i })
    expect(section).toBeInTheDocument()
  })
})
