# Phancy Portfolio

A modern, performant portfolio site built to showcase a world-class product designer's experience and craft.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **CMS**: Decap CMS (git-based, for longform blog posts)
- **Short-form**: micro.blog (mobile-friendly, for notes/links)
- **Deployment**: Vercel-ready

## Site Architecture

### Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, featured work, and quick intro |
| `/about` | Designer bio, philosophy, career timeline |
| `/work` | Full project grid with category filters |
| `/work/[slug]` | Individual case study page |
| `/blog` | Longform articles and essays |
| `/blog/[slug]` | Individual blog post |
| `/notes` | Short-form stream (links, thoughts, quick posts) |
| `/contact` | Contact form and social links |

### Sections

#### 1. Hero
- Full-viewport landing with name, title, and a single compelling tagline
- Subtle entrance animation
- Scroll indicator

#### 2. Featured Work
- Curated grid (3–4 flagship projects) on the homepage
- Each card: cover image, project title, role, and a one-liner
- Hover reveals a brief summary; click navigates to case study

#### 3. About
- Portrait photo and short bio
- Design philosophy / personal statement
- Career timeline (roles, companies, years)
- Core skills and tools

#### 4. Work / Case Studies
- Filterable project grid (by category: mobile, web, branding, etc.)
- Each case study page includes:
  - Overview (challenge, role, timeline)
  - Process (research, wireframes, iterations)
  - Solution (final designs, key screens)
  - Outcomes (metrics, impact, testimonials)
  - Image gallery / before-and-after comparisons

#### 5. Testimonials
- Rotating quotes from colleagues, clients, or managers
- Name, title, and company attribution

#### 6. Blog (Longform)
- Articles, essays, design thinking, process deep-dives
- Written via Decap CMS (visual editor at `/admin`)
- Stored as MDX files in `src/content/blog/`
- Supports rich content: images, code blocks, embeds
- RSS feed at `/feed.xml` for syndication

#### 7. Notes (Short-form)
- Quick thoughts, links, observations, micro-posts
- Posted via micro.blog app (mobile-friendly)
- Pulled into site from micro.blog JSON feed
- Displayed as a stream/timeline
- micro.blog handles syndication to Mastodon, Bluesky, etc.

#### 8. Contact
- Simple contact form (name, email, message)
- Links to LinkedIn, Dribbble, Behance, email
- Optional: calendar booking link

### Global Elements

- **Navigation**: Minimal top nav, collapses to hamburger on mobile
- **Footer**: Social links, copyright, back-to-top
- **Theme**: Light mode with optional dark mode toggle
- **Transitions**: Smooth page transitions via Framer Motion

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home page
│   ├── about/
│   │   └── page.tsx
│   ├── work/
│   │   ├── page.tsx        # Project grid
│   │   └── [slug]/
│   │       └── page.tsx    # Case study
│   ├── blog/
│   │   ├── page.tsx        # Blog index
│   │   └── [slug]/
│   │       └── page.tsx    # Blog post
│   ├── notes/
│   │   └── page.tsx        # Short-form stream
│   ├── contact/
│   │   └── page.tsx
│   ├── admin/
│   │   └── page.tsx        # Decap CMS entry point
│   └── feed.xml/
│       └── route.ts        # RSS feed generation
├── content/
│   └── blog/               # MDX blog posts (managed by Decap)
│       └── *.mdx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FeaturedWork.tsx
│   │   └── Testimonials.tsx
│   ├── work/
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── CaseStudy.tsx
│   ├── blog/
│   │   ├── PostList.tsx
│   │   ├── PostCard.tsx
│   │   └── PostBody.tsx    # MDX renderer
│   ├── notes/
│   │   ├── NotesFeed.tsx
│   │   └── NoteCard.tsx
│   ├── about/
│   │   ├── Bio.tsx
│   │   ├── Timeline.tsx
│   │   └── Skills.tsx
│   ├── contact/
│   │   └── ContactForm.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── SectionHeading.tsx
│       ├── ImageReveal.tsx
│       └── AnimatedContainer.tsx
├── data/
│   ├── projects.ts         # Project/case study content
│   ├── testimonials.ts     # Testimonial entries
│   └── timeline.ts         # Career timeline data
├── lib/
│   ├── utils.ts            # Shared helpers
│   ├── blog.ts             # MDX parsing utilities
│   └── microblog.ts        # micro.blog feed fetcher
└── styles/
    └── globals.css         # Tailwind base + custom properties

public/
└── admin/
    └── config.yml          # Decap CMS configuration
```

## Design Principles

1. **Content-first**: The work is the star — UI stays out of the way
2. **Whitespace**: Generous spacing to let projects breathe
3. **Typography**: One strong serif or sans-serif pairing, large headings
4. **Motion**: Purposeful, subtle animations — no gimmicks
5. **Performance**: Optimized images (Next.js Image), minimal JS, fast loads
6. **Responsive**: Mobile-first, fluid layouts from 320px to ultrawide

## Content Strategy (POSSE)

This site follows [POSSE](https://indieweb.org/POSSE) (Publish on your Own Site, Syndicate Elsewhere) principles: you own your content, then syndicate it to other platforms.

### Dual-content model

| Content type | Authored via | Stored | Canonical URL | Syndication |
|--------------|--------------|--------|---------------|-------------|
| **Longform** (articles, essays) | Decap CMS (`/admin`) | MDX files in git | `yoursite.com/blog/[slug]` | RSS → micro.blog, etc. |
| **Short-form** (notes, links) | micro.blog app | micro.blog | `micro.blog/you` | micro.blog → Mastodon, Bluesky |

### Why this split?

- **Longform** deserves a proper editor, version control, and full ownership — Decap commits MDX directly to your repo
- **Short-form** needs to be fast and mobile — micro.blog's app is built for this, and handles cross-posting

### Syndication flows

```
Longform:  You → Decap → Git → Site builds → RSS feed → micro.blog pulls it
Short-form: You → micro.blog app → Site fetches JSON feed → Displays in /notes
```

Your site becomes the unified reading experience, even though content is authored in two places.

## Data Models

### Projects

Projects are defined as typed objects in `src/data/projects.ts`:

```ts
type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: "mobile" | "web" | "branding" | "product";
  coverImage: string;
  role: string;
  timeline: string;
  overview: string;
  process: string[];
  solution: string[];
  outcomes: string[];
  images: string[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
};
```

### Blog Posts (MDX frontmatter)

Blog posts are MDX files in `src/content/blog/` with this frontmatter:

```yaml
---
title: "Design Systems at Scale"
date: 2025-03-15
description: "Lessons from building a design system used by 50+ teams"
tags: ["design systems", "process", "scaling"]
coverImage: "/images/blog/design-systems.jpg"
draft: false
---
```

### Notes (from micro.blog)

Notes are fetched from micro.blog's JSON feed and normalized to:

```ts
type Note = {
  id: string;
  content_html: string;
  date_published: string;
  url: string;            // permalink on micro.blog
  image?: string;         // attached photo, if any
};
```

## Decap CMS Setup

Decap CMS is configured via `public/admin/config.yml`:

```yaml
backend:
  name: git-gateway       # Or github for direct GitHub auth
  branch: main

media_folder: public/images/blog
public_folder: /images/blog

collections:
  - name: blog
    label: Blog Posts
    folder: src/content/blog
    create: true
    slug: "{{slug}}"
    extension: mdx
    format: frontmatter
    fields:
      - { name: title, label: Title, widget: string }
      - { name: date, label: Date, widget: datetime }
      - { name: description, label: Description, widget: text }
      - { name: tags, label: Tags, widget: list }
      - { name: coverImage, label: Cover Image, widget: image }
      - { name: draft, label: Draft, widget: boolean, default: true }
      - { name: body, label: Body, widget: markdown }
```

Access the CMS at `yoursite.com/admin`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env.local`:

```bash
# micro.blog JSON feed URL
MICROBLOG_FEED_URL=https://micro.blog/feed.json?username=YOURUSERNAME
```

### Decap CMS local development

For local CMS access, run the Decap proxy:

```bash
npx decap-server
```

Then visit `http://localhost:3000/admin`.
