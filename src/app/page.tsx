import { Hero, FeaturedWork, Testimonials } from '@/components/home'
import { PageTransition } from '@/components/layout'

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <FeaturedWork />
      <Testimonials />
    </PageTransition>
  )
}
