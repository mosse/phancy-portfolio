# Phancy Portfolio

A modern, performant portfolio site for showcasing product design work.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

# Content Management Guide

This guide explains how to add and edit content on your portfolio. **No coding experience required!**

## Table of Contents

- [Writing Blog Posts](#writing-blog-posts)
- [Posting Notes (Short-form)](#posting-notes-short-form)
- [Editing Your Bio](#editing-your-bio)
- [Managing Projects](#managing-projects)
- [Setting Up Services](#setting-up-services)
- [Troubleshooting](#troubleshooting)

---

## Writing Blog Posts

### Option A: Visual Editor (Recommended)

1. Go to `yoursite.com/admin`
2. Log in with GitHub
3. Click **Blog Posts** → **New Blog Post**
4. Fill in:
   - **Title**: Your post title
   - **Date**: Publication date
   - **Description**: 1-2 sentence summary
   - **Tags**: Keywords (comma-separated)
   - **Cover Image**: Upload an image
   - **Draft**: Toggle ON to hide while editing
   - **Body**: Write using the visual editor
5. Click **Publish**

### Option B: Create Files Directly

Create `src/content/blog/my-post.mdx`:

```markdown
---
title: "Your Post Title"
date: 2025-01-15
description: "A brief description"
tags: ["design", "process"]
coverImage: "/images/blog/cover.jpg"
draft: false
---

Your content here. Use **bold**, *italics*, and [links](https://example.com).

## Subheadings work too

- Bullet points
- Are supported
```

### Adding Images

1. Put images in `public/images/blog/`
2. Reference as `/images/blog/filename.jpg`

---

## Posting Notes (Short-form)

Notes are quick thoughts posted via micro.blog and displayed on your `/notes` page.

### How to Post

1. Download the **micro.blog app** (iOS/Android) or use micro.blog website
2. Write your thought and post
3. It appears on your site within an hour

### Sharing Music

Include a music link and an embedded player appears automatically!

**Supported platforms:**
- Spotify: `https://open.spotify.com/track/...`
- Apple Music: `https://music.apple.com/...`
- SoundCloud: `https://soundcloud.com/...`
- Bandcamp: `https://artist.bandcamp.com/...`

**Example post:**
> Loving this album! https://open.spotify.com/album/xyz123

---

## Editing Your Bio

Open `src/data/timeline.ts` and edit:

```typescript
export const bio = {
  name: 'Your Name',
  title: 'Product Designer',
  tagline: 'Your one-line tagline',
  location: 'City, Country',
  email: 'you@example.com',
  about: [
    'First paragraph about you...',
    'Second paragraph...',
  ],
  philosophy: 'Your design philosophy...',
}
```

### Career Timeline

```typescript
export const careerTimeline = [
  {
    role: 'Senior Designer',
    company: 'Company Name',
    period: '2022 - Present',
    description: 'What you did...',
  },
]
```

### Skills

```typescript
export const skills = {
  design: ['Figma', 'Sketch'],
  development: ['HTML/CSS', 'React'],
  other: ['User Research'],
}
```

---

## Managing Projects

Edit `src/data/projects.ts` to add/edit projects:

```typescript
{
  slug: 'project-name',        // URL: /work/project-name
  title: 'Project Title',
  subtitle: 'Brief tagline',
  category: 'mobile',          // 'mobile' | 'web' | 'branding' | 'product'
  coverImage: '/images/projects/cover.jpg',
  role: 'Lead Designer',
  timeline: '3 months',
  team: '2 designers, 4 engineers',
  overview: 'Project description...',
  process: [
    'Research phase',
    'Design phase',
    'Testing phase',
  ],
  solution: [
    'Solution point 1',
    'Solution point 2',
  ],
  outcomes: [
    { metric: '+50%', label: 'Conversion' },
    { metric: '4.8★', label: 'Rating' },
  ],
  images: ['/images/projects/1.jpg', '/images/projects/2.jpg'],
  featured: true,              // Show on homepage
  testimonial: {               // Optional
    quote: 'Great work!',
    author: 'Client Name',
    title: 'CEO, Company',
  },
}
```

---

## Setting Up Services

### Environment Variables

Create `.env.local` in your project root:

```bash
# micro.blog (for Notes page)
MICROBLOG_FEED_URL=https://micro.blog/posts/YOURUSERNAME

# Contact Form (pick one)
FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
# OR
RESEND_API_KEY=your-api-key
CONTACT_EMAIL=you@example.com

# Analytics (optional)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-id
NEXT_PUBLIC_UMAMI_URL=https://cloud.umami.is/script.js
```

**For Vercel:** Add these in Dashboard → Settings → Environment Variables

---

### Setting Up micro.blog

1. Create account at [micro.blog](https://micro.blog)
2. Go to **Account** → **Edit Feeds & Cross-posting**
3. Find your feed URL: `https://micro.blog/posts/YOURUSERNAME`
4. Add to `.env.local`:
   ```
   MICROBLOG_FEED_URL=https://micro.blog/posts/YOURUSERNAME
   ```

**Tip:** Download the micro.blog app for posting on the go!

---

### Setting Up Contact Form

#### Option A: Formspree (Easiest)

1. Go to [formspree.io](https://formspree.io)
2. Create free account → Create form
3. Copy endpoint (e.g., `https://formspree.io/f/abc123`)
4. Add to `.env.local`:
   ```
   FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ID
   ```

#### Option B: Resend

1. Go to [resend.com](https://resend.com)
2. Get API key from dashboard
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxx
   CONTACT_EMAIL=you@example.com
   ```

---

### Setting Up Analytics (Optional)

#### Umami Cloud ($9/month)

1. Sign up at [cloud.umami.is](https://cloud.umami.is)
2. Add your website
3. Copy Website ID
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-id
   NEXT_PUBLIC_UMAMI_URL=https://cloud.umami.is/script.js
   ```

---

### Setting Up Blog Editor (Decap CMS)

1. Edit `public/admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: YOUR-USERNAME/YOUR-REPO
     branch: main
   ```

2. For **local development**:
   ```bash
   npx decap-server
   ```
   Then visit `http://localhost:3000/admin`

3. For **production**, you'll need GitHub OAuth setup. See [Decap CMS docs](https://decapcms.org/docs/github-backend/).

---

## Deploying Changes

### With Vercel (Automatic)

1. Make changes
2. Commit to GitHub:
   ```bash
   git add .
   git commit -m "Updated content"
   git push
   ```
3. Vercel deploys automatically!

### Testing Locally First

```bash
npm run build   # Check for errors
npm run dev     # Preview at localhost:3000
```

---

## Troubleshooting

### Blog posts not showing?
- Ensure `draft: false` in frontmatter
- Check date isn't in the future
- File must end in `.mdx`

### Notes not updating?
- Notes refresh hourly or on deploy
- Verify `MICROBLOG_FEED_URL` is correct
- Test feed URL in browser

### Images not loading?
- Images go in `public/` folder
- Paths start with `/` (e.g., `/images/photo.jpg`)
- Filenames are case-sensitive

### Contact form not working?
- Check `FORMSPREE_ENDPOINT` or `RESEND_API_KEY`
- In development, submissions log to console
- Check Vercel function logs for errors

### Dark mode not saving?
- Theme is stored in browser localStorage
- Try clearing browser cache

---

## Site Features

- **Dark mode** - Toggle in header (sun/moon icon)
- **Page transitions** - Smooth animations between pages
- **RSS feed** - Available at `/feed.xml`
- **Music embeds** - Spotify, Apple Music, SoundCloud, Bandcamp
- **Responsive** - Works on all devices
- **Fast** - Optimized for performance

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | Framework |
| TypeScript | Language |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Decap CMS | Blog editor |
| micro.blog | Short-form posts |
| Umami | Analytics |

---

## File Structure

```
src/
├── app/                    # Pages
├── components/             # UI components
├── content/blog/           # Your blog posts (.mdx)
├── data/
│   ├── projects.ts        # Your projects
│   ├── testimonials.ts    # Testimonials
│   └── timeline.ts        # Bio, career, skills
└── lib/                   # Utilities

public/
├── admin/                 # CMS config
└── images/               # Your images
    ├── blog/
    └── projects/
```

---

## Support

Issues? Check [troubleshooting](#troubleshooting) or open a GitHub issue.
