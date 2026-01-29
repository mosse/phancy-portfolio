import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MusicEmbed } from '../MusicEmbed'

describe('MusicEmbed', () => {
  describe('Spotify embeds', () => {
    it('renders Spotify iframe for track URL', () => {
      render(
        <MusicEmbed
          platform="spotify"
          url="https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh"
        />
      )

      const iframe = screen.getByTitle('Spotify embed')
      expect(iframe).toBeInTheDocument()
      expect(iframe).toHaveAttribute('src', expect.stringContaining('open.spotify.com/embed/track'))
    })

    it('renders Spotify iframe for album URL', () => {
      render(
        <MusicEmbed
          platform="spotify"
          url="https://open.spotify.com/album/123abc"
        />
      )

      const iframe = screen.getByTitle('Spotify embed')
      expect(iframe.getAttribute('src')).toContain('open.spotify.com/embed/album')
    })

    it('renders Spotify iframe for playlist URL', () => {
      render(
        <MusicEmbed
          platform="spotify"
          url="https://open.spotify.com/playlist/xyz789"
        />
      )

      const iframe = screen.getByTitle('Spotify embed')
      expect(iframe.getAttribute('src')).toContain('open.spotify.com/embed/playlist')
    })
  })

  describe('SoundCloud embeds', () => {
    it('renders SoundCloud iframe', () => {
      render(
        <MusicEmbed
          platform="soundcloud"
          url="https://soundcloud.com/artist/track-name"
        />
      )

      const iframe = screen.getByTitle('SoundCloud embed')
      expect(iframe).toBeInTheDocument()
      expect(iframe).toHaveAttribute('src', expect.stringContaining('w.soundcloud.com/player'))
    })

    it('encodes URL in SoundCloud embed', () => {
      render(
        <MusicEmbed
          platform="soundcloud"
          url="https://soundcloud.com/artist/track-name"
        />
      )

      const iframe = screen.getByTitle('SoundCloud embed')
      expect(iframe.getAttribute('src')).toContain(encodeURIComponent('https://soundcloud.com/artist/track-name'))
    })
  })

  describe('Apple Music embeds', () => {
    it('renders Apple Music iframe', () => {
      render(
        <MusicEmbed
          platform="apple"
          url="https://music.apple.com/us/album/song-name/123456789"
        />
      )

      const iframe = screen.getByTitle('Apple Music embed')
      expect(iframe).toBeInTheDocument()
      expect(iframe).toHaveAttribute('src', expect.stringContaining('embed.music.apple.com'))
    })
  })

  describe('Bandcamp and fallback', () => {
    it('renders link fallback for Bandcamp', () => {
      render(
        <MusicEmbed
          platform="bandcamp"
          url="https://artist.bandcamp.com/album/cool-album"
        />
      )

      const link = screen.getByRole('link', { name: /listen on bandcamp/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://artist.bandcamp.com/album/cool-album')
    })

    it('renders link fallback for unknown platform', () => {
      render(
        <MusicEmbed
          platform="unknown"
          url="https://example.com/music"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://example.com/music')
    })

    it('opens link in new tab', () => {
      render(
        <MusicEmbed
          platform="bandcamp"
          url="https://artist.bandcamp.com/track/song"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('iframe attributes', () => {
    it('sets lazy loading on Spotify iframe', () => {
      render(
        <MusicEmbed
          platform="spotify"
          url="https://open.spotify.com/track/abc123"
        />
      )

      const iframe = screen.getByTitle('Spotify embed')
      expect(iframe).toHaveAttribute('loading', 'lazy')
    })

    it('sets correct dimensions for Spotify', () => {
      render(
        <MusicEmbed
          platform="spotify"
          url="https://open.spotify.com/track/abc123"
        />
      )

      const iframe = screen.getByTitle('Spotify embed')
      expect(iframe).toHaveAttribute('width', '100%')
      expect(iframe).toHaveAttribute('height', '152')
    })
  })
})
