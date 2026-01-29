import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageTransition } from './PageTransition'

describe('PageTransition', () => {
  it('renders children', () => {
    render(
      <PageTransition>
        <div>Page content</div>
      </PageTransition>
    )
    expect(screen.getByText('Page content')).toBeInTheDocument()
  })

  it('wraps content in motion.div', () => {
    const { container } = render(
      <PageTransition>
        <p>Animated content</p>
      </PageTransition>
    )
    // Framer Motion adds style attribute for animations
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.tagName).toBe('DIV')
  })

  it('applies initial animation state', () => {
    const { container } = render(
      <PageTransition>
        <span>Test</span>
      </PageTransition>
    )
    const wrapper = container.firstChild as HTMLElement
    // Framer Motion adds style attribute for animations
    expect(wrapper).toHaveAttribute('style')
  })
})
