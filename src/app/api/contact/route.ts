import { NextResponse } from 'next/server'

type ContactFormData = {
  name: string
  email: string
  message: string
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate message length
    if (body.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    if (body.message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be less than 5000 characters' },
        { status: 400 }
      )
    }

    // Check for Formspree endpoint
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT

    if (formspreeEndpoint) {
      // Send via Formspree
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          message: body.message,
        }),
      })

      if (!response.ok) {
        console.error('Formspree error:', await response.text())
        return NextResponse.json(
          { error: 'Failed to send message' },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true })
    }

    // Check for Resend API key (alternative email service)
    const resendApiKey = process.env.RESEND_API_KEY
    const recipientEmail = process.env.CONTACT_EMAIL

    if (resendApiKey && recipientEmail) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Contact Form <onboarding@resend.dev>',
          to: recipientEmail,
          subject: `New message from ${body.name}`,
          reply_to: body.email,
          text: `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
        }),
      })

      if (!response.ok) {
        console.error('Resend error:', await response.text())
        return NextResponse.json(
          { error: 'Failed to send message' },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true })
    }

    // No email service configured - log for development
    console.log('Contact form submission (no email service configured):')
    console.log('Name:', body.name)
    console.log('Email:', body.email)
    console.log('Message:', body.message)

    // In development, still return success
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ success: true })
    }

    // In production without email service, return error
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
