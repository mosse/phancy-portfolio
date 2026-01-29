'use client'

type MusicEmbedProps = {
  platform: string
  url: string
}

function getSpotifyEmbedUrl(url: string): string | null {
  // Convert: https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh
  // To: https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh
  const match = url.match(/open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/)
  if (match) {
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`
  }
  return null
}

function getBandcampEmbedUrl(url: string): string | null {
  // Bandcamp requires an album/track ID which we can't easily extract from URL
  // Return the URL for a link fallback
  return url
}

function getSoundCloudEmbedUrl(url: string): string {
  // SoundCloud widget API
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23333333&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`
}

function getAppleMusicEmbedUrl(url: string): string | null {
  // Convert: https://music.apple.com/us/album/song-name/123456789?i=987654321
  // To: https://embed.music.apple.com/us/album/song-name/123456789?i=987654321
  const match = url.match(/music\.apple\.com\/([a-z]{2})\/(.+)/)
  if (match) {
    return `https://embed.music.apple.com/${match[1]}/${match[2]}`
  }
  return null
}

export function MusicEmbed({ platform, url }: MusicEmbedProps) {
  if (platform === 'spotify') {
    const embedUrl = getSpotifyEmbedUrl(url)
    if (embedUrl) {
      return (
        <div className="mt-4 rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify embed"
            className="rounded-lg"
          />
        </div>
      )
    }
  }

  if (platform === 'soundcloud') {
    const embedUrl = getSoundCloudEmbedUrl(url)
    return (
      <div className="mt-4 rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={embedUrl}
          loading="lazy"
          title="SoundCloud embed"
          className="rounded-lg"
        />
      </div>
    )
  }

  if (platform === 'apple') {
    const embedUrl = getAppleMusicEmbedUrl(url)
    if (embedUrl) {
      return (
        <div className="mt-4 rounded-lg overflow-hidden">
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder="0"
            height="175"
            style={{ width: '100%', overflow: 'hidden', borderRadius: '10px' }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={embedUrl}
            loading="lazy"
            title="Apple Music embed"
          />
        </div>
      )
    }
  }

  // Bandcamp and fallback - show a styled link
  return (
    <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center">
          <svg className="w-5 h-5 text-neutral-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 capitalize">
            {platform === 'bandcamp' ? 'Bandcamp' : 'Music'}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 truncate block"
          >
            Listen on {platform} →
          </a>
        </div>
      </div>
    </div>
  )
}
