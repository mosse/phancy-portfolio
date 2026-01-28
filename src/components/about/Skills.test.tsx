import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skills } from './Skills'
import { skills } from '@/data'

describe('Skills', () => {
  it('renders the section heading', () => {
    render(<Skills />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/skills & tools/i)
  })

  it('renders all skill categories', () => {
    render(<Skills />)
    skills.forEach((skillGroup) => {
      expect(screen.getByRole('heading', { name: skillGroup.category })).toBeInTheDocument()
    })
  })

  it('renders all skills', () => {
    render(<Skills />)
    skills.forEach((skillGroup) => {
      skillGroup.items.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument()
      })
    })
  })

  it('has accessible section with aria-labelledby', () => {
    render(<Skills />)
    const section = screen.getByRole('region', { name: /skills & tools/i })
    expect(section).toBeInTheDocument()
  })

  it('renders skills as list items', () => {
    render(<Skills />)
    const listItems = screen.getAllByRole('listitem')
    const totalSkills = skills.reduce((acc, group) => acc + group.items.length, 0)
    expect(listItems.length).toBe(totalSkills)
  })
})
