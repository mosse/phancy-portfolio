'use client'

import { motion } from 'framer-motion'
import { bio } from '@/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

export function Hero() {
  return (
    <section
      className="min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative"
      aria-label="Introduction"
    >
      <motion.div
        className="max-w-4xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-sm font-medium text-neutral-500 uppercase tracking-wider"
        >
          {bio.title}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="mt-3 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          {bio.name}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl sm:text-2xl text-neutral-600 max-w-2xl leading-relaxed"
        >
          {bio.tagline}
        </motion.p>
        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
          <a
            href="/work"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-700 rounded-md transition-colors"
          >
            View my work
          </a>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-neutral-900 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-md transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <a
          href="#featured-work"
          className="flex flex-col items-center text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Scroll to featured work"
        >
          <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
          <motion.svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </a>
      </motion.div>
    </section>
  )
}
