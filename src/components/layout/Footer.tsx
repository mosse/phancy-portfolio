'use client'

import Link from 'next/link'

const socialLinks = [
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'Dribbble' },
  { href: '#', label: 'GitHub' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-neutral-600">
            &copy; {currentYear} Phancy Portfolio. All rights reserved.
          </p>

          {/* Social Links */}
          <ul className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
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
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            Back to top &uarr;
          </Link>
        </div>
      </div>
    </footer>
  )
}
