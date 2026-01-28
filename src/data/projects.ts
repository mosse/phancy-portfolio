export type ProjectCategory = 'mobile' | 'web' | 'branding' | 'product'

export type Project = {
  slug: string
  title: string
  subtitle: string
  category: ProjectCategory
  coverImage: string
  role: string
  timeline: string
  team: string
  overview: string
  process: string[]
  solution: string[]
  outcomes: { metric: string; label: string }[]
  images: string[]
  featured: boolean
  testimonial?: {
    quote: string
    author: string
    title: string
  }
}

export const projects: Project[] = [
  {
    slug: 'finance-app-redesign',
    title: 'Finance App Redesign',
    subtitle: 'Reimagining personal finance for Gen Z',
    category: 'mobile',
    coverImage: '/images/projects/finance-app-cover.jpg',
    role: 'Lead Product Designer',
    timeline: '4 months',
    team: '2 designers, 4 engineers, 1 PM',
    overview:
      'A complete redesign of a personal finance app targeting younger users. The existing app had poor retention and confusing navigation. We simplified the experience while adding features users actually wanted.',
    process: [
      'Conducted 20+ user interviews to understand pain points with existing finance apps',
      'Created journey maps and identified key moments of friction',
      'Ran a design sprint to explore radical simplification ideas',
      'Prototyped and tested 3 different navigation paradigms',
    ],
    solution: [
      'Introduced a card-based interface that feels native to mobile',
      'Created a "money mood" feature that gamifies savings goals',
      'Simplified onboarding from 12 steps to 4',
      'Designed a notification system that educates rather than nags',
    ],
    outcomes: [
      { metric: '47%', label: 'Increase in 30-day retention' },
      { metric: '3.2x', label: 'More savings goals created' },
      { metric: '4.8', label: 'App Store rating (up from 3.2)' },
    ],
    images: [
      '/images/projects/finance-app-1.jpg',
      '/images/projects/finance-app-2.jpg',
      '/images/projects/finance-app-3.jpg',
      '/images/projects/finance-app-4.jpg',
    ],
    featured: true,
    testimonial: {
      quote:
        'The redesign completely transformed how our users think about saving money. The attention to detail and user empathy was exceptional.',
      author: 'Sarah Chen',
      title: 'VP Product, FinanceApp',
    },
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    subtitle: 'A design system for scalable online retail',
    category: 'web',
    coverImage: '/images/projects/ecommerce-cover.jpg',
    role: 'Senior Product Designer',
    timeline: '6 months',
    team: '3 designers, 8 engineers, 2 PMs',
    overview:
      'Built a comprehensive design system and shopping experience for a growing e-commerce platform. The goal was to create consistency across web and mobile while enabling rapid feature development.',
    process: [
      'Audited existing UI inconsistencies across 40+ screens',
      'Established design tokens for color, typography, and spacing',
      'Created a component library with accessibility baked in',
      'Documented patterns and usage guidelines for the engineering team',
    ],
    solution: [
      'Developed 60+ reusable components with multiple variants',
      'Designed a flexible product card system for different contexts',
      'Created an adaptive checkout flow that reduced cart abandonment',
      'Built dark mode support into the system from day one',
    ],
    outcomes: [
      { metric: '35%', label: 'Reduction in design-to-dev time' },
      { metric: '22%', label: 'Decrease in cart abandonment' },
      { metric: 'AA', label: 'WCAG accessibility compliance' },
    ],
    images: [
      '/images/projects/ecommerce-1.jpg',
      '/images/projects/ecommerce-2.jpg',
      '/images/projects/ecommerce-3.jpg',
      '/images/projects/ecommerce-4.jpg',
    ],
    featured: true,
  },
  {
    slug: 'healthcare-dashboard',
    title: 'Healthcare Dashboard',
    subtitle: 'Data visualization for clinical teams',
    category: 'product',
    coverImage: '/images/projects/healthcare-cover.jpg',
    role: 'Product Designer',
    timeline: '3 months',
    team: '1 designer, 3 engineers, 1 clinical advisor',
    overview:
      'Designed a dashboard for healthcare administrators to monitor patient outcomes and resource allocation. The challenge was making complex data accessible without losing clinical accuracy.',
    process: [
      'Shadowed clinical staff to understand their daily workflows',
      'Mapped data requirements with the analytics team',
      'Explored visualization approaches through rapid prototyping',
      'Validated designs with nurses, doctors, and administrators',
    ],
    solution: [
      'Created role-based views that surface relevant information',
      'Designed progressive disclosure for complex data sets',
      'Built customizable widgets for personalized dashboards',
      'Implemented clear alert hierarchies for critical metrics',
    ],
    outcomes: [
      { metric: '60%', label: 'Faster access to key metrics' },
      { metric: '89%', label: 'User satisfaction score' },
      { metric: '2hrs', label: 'Saved per shift on reporting' },
    ],
    images: [
      '/images/projects/healthcare-1.jpg',
      '/images/projects/healthcare-2.jpg',
      '/images/projects/healthcare-3.jpg',
      '/images/projects/healthcare-4.jpg',
    ],
    featured: true,
  },
  {
    slug: 'brand-identity-startup',
    title: 'Startup Brand Identity',
    subtitle: 'Visual identity for a climate tech company',
    category: 'branding',
    coverImage: '/images/projects/branding-cover.jpg',
    role: 'Brand Designer',
    timeline: '2 months',
    team: '2 designers, founder',
    overview:
      'Created a complete brand identity for a climate technology startup. The brand needed to convey innovation and urgency while remaining approachable and optimistic.',
    process: [
      'Facilitated brand workshops with the founding team',
      'Researched competitor positioning in the climate space',
      'Developed mood boards exploring different tonal directions',
      'Iterated on logo concepts through multiple feedback rounds',
    ],
    solution: [
      'Designed a dynamic logo system that adapts to context',
      'Created a vibrant color palette inspired by nature',
      'Developed a custom icon set for product and marketing',
      'Produced comprehensive brand guidelines',
    ],
    outcomes: [
      { metric: '100%', label: 'Founder satisfaction' },
      { metric: '15+', label: 'Assets delivered' },
      { metric: 'Series A', label: 'Successful funding round' },
    ],
    images: [
      '/images/projects/branding-1.jpg',
      '/images/projects/branding-2.jpg',
      '/images/projects/branding-3.jpg',
      '/images/projects/branding-4.jpg',
    ],
    featured: false,
  },
  {
    slug: 'fitness-tracking-app',
    title: 'Fitness Tracking App',
    subtitle: 'Workout companion for busy professionals',
    category: 'mobile',
    coverImage: '/images/projects/fitness-cover.jpg',
    role: 'Product Designer',
    timeline: '5 months',
    team: '2 designers, 5 engineers, 1 PM',
    overview:
      'Designed a fitness app focused on quick, effective workouts for people with limited time. The app needed to motivate without being preachy and fit into unpredictable schedules.',
    process: [
      'Surveyed 200+ target users about fitness habits and barriers',
      'Analyzed competitor apps for onboarding and retention patterns',
      'Created user personas representing different fitness levels',
      'Tested workout flows with real exercises in real environments',
    ],
    solution: [
      'Designed adaptive workout lengths from 7 to 45 minutes',
      'Created a gentle streak system that forgives missed days',
      'Built social features for accountability without pressure',
      'Implemented smart scheduling based on calendar integration',
    ],
    outcomes: [
      { metric: '52%', label: 'Weekly active user retention' },
      { metric: '4.6', label: 'App Store rating' },
      { metric: '2M+', label: 'Downloads in first year' },
    ],
    images: [
      '/images/projects/fitness-1.jpg',
      '/images/projects/fitness-2.jpg',
      '/images/projects/fitness-3.jpg',
      '/images/projects/fitness-4.jpg',
    ],
    featured: false,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category)
}

export const categories: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Work' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'web', label: 'Web' },
  { value: 'product', label: 'Product' },
  { value: 'branding', label: 'Branding' },
]
