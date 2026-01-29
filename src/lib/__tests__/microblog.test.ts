import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getNotes, detectMusicEmbed, type Note } from '../microblog'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('microblog utilities', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('getNotes', () => {
    it('returns empty array when MICROBLOG_FEED_URL is not set', async () => {
      delete process.env.MICROBLOG_FEED_URL

      const notes = await getNotes()

      expect(notes).toEqual([])
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('fetches and parses notes from micro.blog feed', async () => {
      process.env.MICROBLOG_FEED_URL = 'https://micro.blog/feed.json?username=test'

      const mockFeed = {
        version: 'https://jsonfeed.org/version/1',
        title: 'Test Blog',
        home_page_url: 'https://micro.blog/test',
        feed_url: 'https://micro.blog/feed.json?username=test',
        items: [
          {
            id: '123',
            content_html: '<p>Hello world</p>',
            date_published: '2025-01-15T10:00:00Z',
            url: 'https://micro.blog/test/123',
          },
          {
            id: '456',
            content_html: '<p>Another note</p>',
            date_published: '2025-01-14T10:00:00Z',
            url: 'https://micro.blog/test/456',
            image: 'https://example.com/photo.jpg',
          },
        ],
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockFeed),
      })

      const notes = await getNotes()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://micro.blog/feed.json?username=test',
        { next: { revalidate: 3600 } }
      )
      expect(notes).toHaveLength(2)
      expect(notes[0]).toEqual({
        id: '123',
        content_html: '<p>Hello world</p>',
        date_published: '2025-01-15T10:00:00Z',
        url: 'https://micro.blog/test/123',
        image: undefined,
      })
      expect(notes[1].image).toBe('https://example.com/photo.jpg')
    })

    it('extracts image from attachments if no direct image', async () => {
      process.env.MICROBLOG_FEED_URL = 'https://micro.blog/feed.json'

      const mockFeed = {
        items: [
          {
            id: '789',
            content_html: '<p>Post with attachment</p>',
            date_published: '2025-01-15T10:00:00Z',
            url: 'https://micro.blog/test/789',
            attachments: [
              { url: 'https://example.com/attached.jpg', mime_type: 'image/jpeg' },
            ],
          },
        ],
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockFeed),
      })

      const notes = await getNotes()

      expect(notes[0].image).toBe('https://example.com/attached.jpg')
    })

    it('returns empty array when fetch fails', async () => {
      process.env.MICROBLOG_FEED_URL = 'https://micro.blog/feed.json'

      mockFetch.mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      })

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const notes = await getNotes()

      expect(notes).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to fetch micro.blog feed:',
        'Not Found'
      )

      consoleSpy.mockRestore()
    })

    it('returns empty array when fetch throws error', async () => {
      process.env.MICROBLOG_FEED_URL = 'https://micro.blog/feed.json'

      mockFetch.mockRejectedValue(new Error('Network error'))

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const notes = await getNotes()

      expect(notes).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching micro.blog feed:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('handles empty feed items', async () => {
      process.env.MICROBLOG_FEED_URL = 'https://micro.blog/feed.json'

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
      })

      const notes = await getNotes()

      expect(notes).toEqual([])
    })
  })

  describe('detectMusicEmbed', () => {
    it('detects Bandcamp URLs', () => {
      const html = '<p>Check out this album <a href="https://artist.bandcamp.com/album/cool-album">here</a></p>'

      const result = detectMusicEmbed(html)

      expect(result).toEqual({
        platform: 'bandcamp',
        url: 'https://artist.bandcamp.com/album/cool-album',
      })
    })

    it('detects SoundCloud URLs', () => {
      const html = '<p>New track: <a href="https://soundcloud.com/artist/track-name">listen</a></p>'

      const result = detectMusicEmbed(html)

      expect(result).toEqual({
        platform: 'soundcloud',
        url: 'https://soundcloud.com/artist/track-name',
      })
    })

    it('detects Spotify URLs', () => {
      const html = '<p>Playing <a href="https://open.spotify.com/track/abc123">this song</a></p>'

      const result = detectMusicEmbed(html)

      expect(result).toEqual({
        platform: 'spotify',
        url: 'https://open.spotify.com/track/abc123',
      })
    })

    it('detects Apple Music URLs', () => {
      const html = '<p>Love <a href="https://music.apple.com/us/album/song/12345">this</a></p>'

      const result = detectMusicEmbed(html)

      expect(result).toEqual({
        platform: 'apple',
        url: 'https://music.apple.com/us/album/song/12345',
      })
    })

    it('returns null when no music URL is found', () => {
      const html = '<p>Just a regular note with <a href="https://example.com">a link</a></p>'

      const result = detectMusicEmbed(html)

      expect(result).toBeNull()
    })

    it('returns null for empty content', () => {
      const result = detectMusicEmbed('')

      expect(result).toBeNull()
    })

    it('returns first match when multiple music URLs present', () => {
      const html = `
        <p>Check out <a href="https://artist.bandcamp.com/track/song">Bandcamp</a>
        and <a href="https://open.spotify.com/track/123">Spotify</a></p>
      `

      const result = detectMusicEmbed(html)

      expect(result?.platform).toBe('bandcamp')
    })

    it('handles URLs with query parameters', () => {
      const html = '<a href="https://open.spotify.com/track/abc?si=xyz123">track</a>'

      const result = detectMusicEmbed(html)

      expect(result).toEqual({
        platform: 'spotify',
        url: 'https://open.spotify.com/track/abc?si=xyz123',
      })
    })
  })
})
