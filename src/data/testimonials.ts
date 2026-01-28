export type Testimonial = {
  id: string
  quote: string
  author: string
  title: string
  company: string
  image?: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'One of the most thoughtful designers I\'ve worked with. They have a rare ability to balance user needs with business goals while keeping the team aligned and energized.',
    author: 'Michael Torres',
    title: 'Director of Product',
    company: 'TechCorp',
    image: '/images/testimonials/michael.jpg',
  },
  {
    id: '2',
    quote:
      'Their design system work transformed how our team ships features. What used to take weeks now takes days, and the consistency across our product has never been better.',
    author: 'Emily Watson',
    title: 'Engineering Manager',
    company: 'ScaleUp Inc',
    image: '/images/testimonials/emily.jpg',
  },
  {
    id: '3',
    quote:
      'The user research insights were invaluable. They didn\'t just make things pretty—they fundamentally changed how we understand our customers.',
    author: 'David Park',
    title: 'CEO',
    company: 'StartupXYZ',
    image: '/images/testimonials/david.jpg',
  },
  {
    id: '4',
    quote:
      'Collaborative, detail-oriented, and always advocating for the user. They elevated the entire team\'s design thinking.',
    author: 'Rachel Kim',
    title: 'Senior Product Manager',
    company: 'DesignCo',
    image: '/images/testimonials/rachel.jpg',
  },
]
