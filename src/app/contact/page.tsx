import type { Metadata } from 'next'
import { PageTransition } from '@/components/layout'
import { ContactForm } from '@/components/contact'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for collaborations, opportunities, or just to say hello.',
}

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Get in Touch</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Have a project in mind? Want to collaborate? Or just want to say hello?
          I&apos;d love to hear from you.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <ContactForm />

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold">Other ways to connect</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="mailto:hello@example.com"
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                  >
                    hello@example.com
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                  >
                    Dribbble
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <h3 className="font-semibold">Response time</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                I typically respond within 1-2 business days. For urgent inquiries,
                please mention it in your message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
