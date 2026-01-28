export type TimelineEntry = {
  id: string
  role: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  description: string
  highlights: string[]
}

export const timeline: TimelineEntry[] = [
  {
    id: '1',
    role: 'Senior Product Designer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    startDate: '2022',
    endDate: null,
    description:
      'Leading design for the core platform team, focusing on enterprise features and design system evolution.',
    highlights: [
      'Led redesign of flagship product, improving NPS by 25 points',
      'Grew and mentored a team of 3 designers',
      'Established design critique and review processes',
    ],
  },
  {
    id: '2',
    role: 'Product Designer',
    company: 'ScaleUp Inc',
    location: 'New York, NY',
    startDate: '2019',
    endDate: '2022',
    description:
      'Designed consumer-facing features for a fast-growing fintech startup through Series A to C.',
    highlights: [
      'Shipped mobile app to 2M+ users',
      'Built component library from scratch',
      'Led accessibility initiative across product',
    ],
  },
  {
    id: '3',
    role: 'UX Designer',
    company: 'Agency Creative',
    location: 'Los Angeles, CA',
    startDate: '2017',
    endDate: '2019',
    description:
      'Worked with diverse clients across healthcare, finance, and retail on digital transformation projects.',
    highlights: [
      'Delivered 15+ client projects',
      'Specialized in user research and testing',
      'Won agency award for healthcare dashboard design',
    ],
  },
  {
    id: '4',
    role: 'Junior Designer',
    company: 'DesignStudio',
    location: 'Portland, OR',
    startDate: '2015',
    endDate: '2017',
    description:
      'Started career at a boutique design studio working on brand identity and web design projects.',
    highlights: [
      'Learned fundamentals of visual design and typography',
      'Assisted on 20+ branding projects',
      'Transitioned from graphic design to product design',
    ],
  },
]

export type Skill = {
  category: string
  items: string[]
}

export const skills: Skill[] = [
  {
    category: 'Design',
    items: [
      'User Research',
      'Interaction Design',
      'Visual Design',
      'Prototyping',
      'Design Systems',
      'Information Architecture',
    ],
  },
  {
    category: 'Tools',
    items: ['Figma', 'Sketch', 'Adobe CC', 'Framer', 'Principle', 'Miro'],
  },
  {
    category: 'Technical',
    items: ['HTML/CSS', 'React basics', 'Git', 'Accessibility (WCAG)', 'Analytics'],
  },
  {
    category: 'Soft Skills',
    items: [
      'Stakeholder Management',
      'Workshop Facilitation',
      'Mentoring',
      'Cross-functional Collaboration',
    ],
  },
]

export const bio = {
  name: 'Alex Morgan',
  title: 'Product Designer',
  tagline: 'Designing thoughtful digital experiences that balance user needs with business goals.',
  location: 'San Francisco, CA',
  email: 'hello@example.com',
  about: [
    "I'm a product designer with 8+ years of experience crafting digital products that people actually enjoy using. I believe the best design is invisible—it gets out of the way and lets people accomplish their goals.",
    "My approach combines rigorous user research with a keen eye for visual detail. I've worked across startups and enterprises, leading projects from initial research through to shipped products used by millions.",
    "When I'm not pushing pixels, you'll find me hiking Bay Area trails, experimenting with film photography, or hunting for the perfect cup of coffee.",
  ],
  philosophy:
    'Good design solves problems. Great design solves problems people didn\'t know they had, in ways that feel obvious in hindsight.',
  image: '/images/about/portrait.jpg',
}
