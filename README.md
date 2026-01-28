# Phancy Portfolio

A modern, performant portfolio site built to showcase a world-class product designer's experience and craft.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready

## Site Architecture

### Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, featured work, and quick intro |
| `/about` | Designer bio, philosophy, career timeline |
| `/work` | Full project grid with category filters |
| `/work/[slug]` | Individual case study page |
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

#### 6. Contact
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
│   └── contact/
│       └── page.tsx
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
│   └── utils.ts            # Shared helpers
└── styles/
    └── globals.css         # Tailwind base + custom properties
```

## Design Principles

1. **Content-first**: The work is the star — UI stays out of the way
2. **Whitespace**: Generous spacing to let projects breathe
3. **Typography**: One strong serif or sans-serif pairing, large headings
4. **Motion**: Purposeful, subtle animations — no gimmicks
5. **Performance**: Optimized images (Next.js Image), minimal JS, fast loads
6. **Responsive**: Mobile-first, fluid layouts from 320px to ultrawide

## Data Model

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

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
