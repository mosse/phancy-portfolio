import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactPage from './page'

describe('ContactPage', () => {
  it('renders the page heading', () => {
    render(<ContactPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/get in touch/i)
  })

  it('renders page description', () => {
    render(<ContactPage />)
    expect(screen.getByText(/have a project in mind/i)).toBeInTheDocument()
  })

  it('renders contact form with all fields', () => {
    render(<ContactPage />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('form fields have correct types', () => {
    render(<ContactPage />)

    expect(screen.getByLabelText(/name/i)).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText(/message/i).tagName).toBe('TEXTAREA')
  })

  it('form fields are required', () => {
    render(<ContactPage />)

    expect(screen.getByLabelText(/name/i)).toBeRequired()
    expect(screen.getByLabelText(/email/i)).toBeRequired()
    expect(screen.getByLabelText(/message/i)).toBeRequired()
  })

  it('renders submit button', () => {
    render(<ContactPage />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<ContactPage />)
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /dribbble/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })

  it('renders email link', () => {
    render(<ContactPage />)
    expect(screen.getByRole('link', { name: /hello@example.com/i })).toHaveAttribute('href', 'mailto:hello@example.com')
  })
})
