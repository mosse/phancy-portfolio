import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { bio } from '@/data'

export const metadata: Metadata = {
  title: {
    default: `${bio.name} | ${bio.title}`,
    template: `%s | ${bio.name}`,
  },
  description: bio.tagline,
  keywords: ['portfolio', 'design', 'product design', 'UX', 'UI'],
  authors: [{ name: bio.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: bio.name,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Umami Analytics - Privacy-focused, cookie-free */}
        {umamiUrl && umamiWebsiteId && (
          <Script
            src={umamiUrl}
            data-website-id={umamiWebsiteId}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  )
}
