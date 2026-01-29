import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './ContactForm'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('validates required fields on submit', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)

    // HTML5 validation should prevent submission
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('submits form data successfully', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is a test message.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hello, this is a test message.',
        }),
      })
    })
  })

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is a test message.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
      expect(screen.getByText(/thank you for reaching out/i)).toBeInTheDocument()
    })
  })

  it('shows error message on submission failure', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Server error' }),
    })

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is a test message.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument()
    })
  })

  it('shows loading state during submission', async () => {
    const user = userEvent.setup()
    mockFetch.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => ({ success: true }) }), 100))
    )

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is a test message.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByText(/sending/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('allows sending another message after success', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is a test message.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    })

    await user.click(screen.getByText(/send another message/i))

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('disables form fields during submission', async () => {
    const user = userEvent.setup()
    mockFetch.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => ({ success: true }) }), 100))
    )

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is a test message.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByLabelText(/name/i)).toBeDisabled()
    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    expect(screen.getByLabelText(/message/i)).toBeDisabled()
  })
})
