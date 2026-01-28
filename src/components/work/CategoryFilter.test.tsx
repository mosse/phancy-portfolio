import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryFilter } from './CategoryFilter'
import { categories } from '@/data'

describe('CategoryFilter', () => {
  it('renders all category buttons', () => {
    render(<CategoryFilter selected="all" onChange={() => {}} />)

    categories.forEach((category) => {
      expect(screen.getByRole('button', { name: category.label })).toBeInTheDocument()
    })
  })

  it('marks selected category as pressed', () => {
    render(<CategoryFilter selected="mobile" onChange={() => {}} />)

    expect(screen.getByRole('button', { name: 'Mobile' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'All Work' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onChange when category is clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<CategoryFilter selected="all" onChange={handleChange} />)

    await user.click(screen.getByRole('button', { name: 'Mobile' }))

    expect(handleChange).toHaveBeenCalledWith('mobile')
  })

  it('has navigation landmark', () => {
    render(<CategoryFilter selected="all" onChange={() => {}} />)
    expect(screen.getByRole('navigation', { name: /project categories/i })).toBeInTheDocument()
  })
})
