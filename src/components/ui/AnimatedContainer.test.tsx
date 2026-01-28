import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnimatedContainer, StaggerContainer, StaggerItem } from './AnimatedContainer'

describe('AnimatedContainer', () => {
  it('renders children', () => {
    render(
      <AnimatedContainer>
        <p>Test content</p>
      </AnimatedContainer>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies className', () => {
    render(
      <AnimatedContainer className="test-class">
        <p>Test content</p>
      </AnimatedContainer>
    )
    expect(screen.getByText('Test content').parentElement).toHaveClass('test-class')
  })

  it('renders as different elements', () => {
    render(
      <AnimatedContainer as="section" data-testid="animated-section">
        <p>Section content</p>
      </AnimatedContainer>
    )
    const section = screen.getByText('Section content').parentElement
    expect(section?.tagName).toBe('SECTION')
  })
})

describe('StaggerContainer', () => {
  it('renders children', () => {
    render(
      <StaggerContainer>
        <p>Item 1</p>
        <p>Item 2</p>
      </StaggerContainer>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders as different elements', () => {
    render(
      <StaggerContainer as="ul">
        <li>Item 1</li>
      </StaggerContainer>
    )
    const ul = screen.getByRole('list')
    expect(ul.tagName).toBe('UL')
  })
})

describe('StaggerItem', () => {
  it('renders children', () => {
    render(
      <StaggerContainer>
        <StaggerItem>
          <p>Stagger item content</p>
        </StaggerItem>
      </StaggerContainer>
    )
    expect(screen.getByText('Stagger item content')).toBeInTheDocument()
  })

  it('applies className', () => {
    render(
      <StaggerContainer>
        <StaggerItem className="item-class">
          <p>Content</p>
        </StaggerItem>
      </StaggerContainer>
    )
    expect(screen.getByText('Content').parentElement).toHaveClass('item-class')
  })
})
