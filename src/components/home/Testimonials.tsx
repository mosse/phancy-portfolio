'use client'

import { useState } from 'react'
import { testimonials, type Testimonial } from '@/data'

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="text-center">
      <p className="text-xl sm:text-2xl text-neutral-700 leading-relaxed max-w-3xl mx-auto">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="mt-8">
        <div className="flex items-center justify-center gap-4">
          {/* Avatar placeholder */}
          <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-400 text-xs">
            {testimonial.author.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="text-left">
            <cite className="not-italic font-semibold text-neutral-900">
              {testimonial.author}
            </cite>
            <p className="text-sm text-neutral-500">
              {testimonial.title}, {testimonial.company}
            </p>
          </div>
        </div>
      </footer>
    </blockquote>
  )
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="testimonials-heading"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12"
        >
          What People Say
        </h2>

        <div className="relative">
          <TestimonialCard testimonial={testimonials[currentIndex]} />

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full border border-neutral-300 text-neutral-600 hover:bg-neutral-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-neutral-900'
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 rounded-full border border-neutral-300 text-neutral-600 hover:bg-neutral-100 transition-colors"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
