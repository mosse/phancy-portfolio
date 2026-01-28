'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

type AnimationVariant = 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn'

const variants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
}

type AnimatedContainerProps = {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside' | 'nav'
}

export function AnimatedContainer({
  children,
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.5,
  className,
  as = 'div',
}: AnimatedContainerProps) {
  const Component = motion[as]

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      className={className}
    >
      {children}
    </Component>
  )
}

// Staggered children animation container
type StaggerContainerProps = {
  children: ReactNode
  className?: string
  staggerDelay?: number
  as?: 'div' | 'ul' | 'ol' | 'section'
}

const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  as = 'div',
}: StaggerContainerProps) {
  const Component = motion[as]

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  )
}
