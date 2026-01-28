import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for collaborations, opportunities, or just to say hello.',
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Get in Touch</h1>
      <p className="mt-4 text-neutral-600 max-w-2xl">
        Have a project in mind? Want to collaborate? Or just want to say hello?
        I&apos;d love to hear from you.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-700 rounded-md transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold">Other ways to connect</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  hello@example.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Dribbble
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-neutral-50 rounded-lg">
            <h3 className="font-semibold">Response time</h3>
            <p className="mt-2 text-sm text-neutral-600">
              I typically respond within 1-2 business days. For urgent inquiries,
              please mention it in your message.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
