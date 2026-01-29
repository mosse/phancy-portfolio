export type Note = {
  id: string
  content_html: string
  date_published: string
  url: string
  image?: string
}

type MicroblogFeedItem = {
  id: string
  content_html: string
  date_published: string
  url: string
  image?: string
  attachments?: Array<{
    url: string
    mime_type: string
  }>
}

type MicroblogFeed = {
  version: string
  title: string
  home_page_url: string
  feed_url: string
  items: MicroblogFeedItem[]
}

export async function getNotes(): Promise<Note[]> {
  const feedUrl = process.env.MICROBLOG_FEED_URL

  if (!feedUrl) {
    // Return empty array if no feed URL configured
    return []
  }

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error('Failed to fetch micro.blog feed:', response.statusText)
      return []
    }

    const feed: MicroblogFeed = await response.json()

    return feed.items.map((item) => ({
      id: item.id,
      content_html: item.content_html,
      date_published: item.date_published,
      url: item.url,
      image: item.image || item.attachments?.[0]?.url,
    }))
  } catch (error) {
    console.error('Error fetching micro.blog feed:', error)
    return []
  }
}

// Detect music embed URLs and return embed info
export function detectMusicEmbed(html: string): { platform: string; url: string } | null {
  const patterns = [
    { platform: 'bandcamp', regex: /href="(https?:\/\/[^"]*\.bandcamp\.com\/[^"]*)"/ },
    { platform: 'soundcloud', regex: /href="(https?:\/\/soundcloud\.com\/[^"]*)"/ },
    { platform: 'spotify', regex: /href="(https?:\/\/open\.spotify\.com\/[^"]*)"/ },
    { platform: 'apple', regex: /href="(https?:\/\/music\.apple\.com\/[^"]*)"/ },
  ]

  for (const { platform, regex } of patterns) {
    const match = html.match(regex)
    if (match) {
      return { platform, url: match[1] }
    }
  }

  return null
}
