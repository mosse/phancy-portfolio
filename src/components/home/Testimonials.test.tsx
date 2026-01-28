import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Testimonials } from './Testimonials'
import { testimonials } from '@/data'

describe('Testimonials', () => {
  it('renders the section heading', () => {
    render(<Testimonials />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/what people say/i)
  })

  it('displays the first testimonial by default', () => {
    render(<Testimonials />)
    expect(screen.getByText(new RegExp(testimonials[0].quote))).toBeInTheDocument()
    expect(screen.getByText(testimonials[0].author)).toBeInTheDocument()
  })

  it('displays author title and company', () => {
    render(<Testimonials />)
    expect(
      screen.getByText(`${testimonials[0].title}, ${testimonials[0].company}`)
    ).toBeInTheDocument()
  })

  it('has navigation buttons', () => {
    render(<Testimonials />)
    expect(screen.getByRole('button', { name: /previous testimonial/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next testimonial/i })).toBeInTheDocument()
  })

  it('navigates to next testimonial when clicking next', async () => {
    const user = userEvent.setup()
    render(<Testimonials />)

    await user.click(screen.getByRole('button', { name: /next testimonial/i }))

    expect(screen.getByText(new RegExp(testimonials[1].quote))).toBeInTheDocument()
  })

  it('navigates to previous testimonial when clicking previous', async () => {
    const user = userEvent.setup()
    render(<Testimonials />)

    // Click previous from first should go to last
    await user.click(screen.getByRole('button', { name: /previous testimonial/i }))

    expect(
      screen.getByText(new RegExp(testimonials[testimonials.length - 1].quote))
    ).toBeInTheDocument()
  })

  it('wraps around to first when clicking next on last', async () => {
    const user = userEvent.setup()
    render(<Testimonials />)

    // Click next until we're at the last one, then one more
    for (let i = 0; i < testimonials.length; i++) {
      await user.click(screen.getByRole('button', { name: /next testimonial/i }))
    }

    expect(screen.getByText(new RegExp(testimonials[0].quote))).toBeInTheDocument()
  })

  it('renders dot indicators for each testimonial', () => {
    render(<Testimonials />)
    const dots = screen.getAllByRole('tab')
    expect(dots).toHaveLength(testimonials.length)
  })

  it('can navigate via dot indicators', async () => {
    const user = userEvent.setup()
    render(<Testimonials />)

    const dots = screen.getAllByRole('tab')
    await user.click(dots[2])

    expect(screen.getByText(new RegExp(testimonials[2].quote))).toBeInTheDocument()
  })

  it('marks current dot as selected', () => {
    render(<Testimonials />)
    const dots = screen.getAllByRole('tab')
    expect(dots[0]).toHaveAttribute('aria-selected', 'true')
    expect(dots[1]).toHaveAttribute('aria-selected', 'false')
  })
})
