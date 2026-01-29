import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST } from './route'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Contact API Route', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  function createRequest(body: Record<string, unknown>) {
    return new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  it('returns 400 when name is missing', async () => {
    const request = createRequest({
      email: 'test@example.com',
      message: 'Hello world',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('required')
  })

  it('returns 400 when email is missing', async () => {
    const request = createRequest({
      name: 'John Doe',
      message: 'Hello world',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('required')
  })

  it('returns 400 when message is missing', async () => {
    const request = createRequest({
      name: 'John Doe',
      email: 'test@example.com',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('required')
  })

  it('returns 400 for invalid email format', async () => {
    const request = createRequest({
      name: 'John Doe',
      email: 'invalid-email',
      message: 'Hello world, this is a test message.',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('Invalid email')
  })

  it('returns 400 when message is too short', async () => {
    const request = createRequest({
      name: 'John Doe',
      email: 'test@example.com',
      message: 'Hi',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('at least 10 characters')
  })

  it('returns 400 when message is too long', async () => {
    const request = createRequest({
      name: 'John Doe',
      email: 'test@example.com',
      message: 'a'.repeat(5001),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('less than 5000')
  })

  it('sends via Formspree when endpoint is configured', async () => {
    process.env.FORMSPREE_ENDPOINT = 'https://formspree.io/f/test123'
    mockFetch.mockResolvedValueOnce({ ok: true })

    const request = createRequest({
      name: 'John Doe',
      email: 'test@example.com',
      message: 'Hello world, this is a test.',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(mockFetch).toHaveBeenCalledWith('https://formspree.io/f/test123', expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
      }),
    }))
  })

  it('returns 500 when Formspree fails', async () => {
    process.env.FORMSPREE_ENDPOINT = 'https://formspree.io/f/test123'
    mockFetch.mockResolvedValueOnce({ ok: false, text: () => Promise.resolve('Error') })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const request = createRequest({
      name: 'John Doe',
      email: 'test@example.com',
      message: 'Hello world, this is a test.',
    })

    const response = await POST(request)

    expect(response.status).toBe(500)
    consoleSpy.mockRestore()
  })

  it('sends via Resend when API key is configured', async () => {
    process.env.RESEND_API_KEY = 'test-api-key'
    process.env.CONTACT_EMAIL = 'recipient@example.com'
    mockFetch.mockResolvedValueOnce({ ok: true })

    const request = createRequest({
      name: 'John Doe',
      email: 'test@example.com',
      message: 'Hello world, this is a test.',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(mockFetch).toHaveBeenCalledWith('https://api.resend.com/emails', expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        Authorization: 'Bearer test-api-key',
      }),
    }))
  })

  it('returns success in development without email service', async () => {
    process.env.NODE_ENV = 'development'
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const request = createRequest({
      name: 'John Doe',
      email: 'test@example.com',
      message: 'Hello world, this is a test.',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('handles JSON parse errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json',
    })

    const response = await POST(request)

    expect(response.status).toBe(500)
    consoleSpy.mockRestore()
  })
})
