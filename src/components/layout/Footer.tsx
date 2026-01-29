'use client'

import Link from 'next/link'

const socialLinks = [
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'Dribbble' },
  { href: '#', label: 'GitHub' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            &copy; {currentYear} Phancy Portfolio. All rights reserved.
          </p>

          {/* Social Links */}
          <ul className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  aria-label={link.label}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Back to top */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            aria-label="Scroll back to top"
          >
            Back to top
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
