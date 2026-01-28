import '@testing-library/jest-dom'

// Mock IntersectionObserver (used by Framer Motion's whileInView)
class MockIntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor(callback: IntersectionObserverCallback) {
    // Immediately call the callback with all observed elements as "intersecting"
    // This makes whileInView animations trigger immediately in tests
    setTimeout(() => {
      callback(
        [
          {
            isIntersecting: true,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: 1,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            target: document.body,
            time: 0,
          },
        ],
        this
      )
    }, 0)
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

// Mock ResizeObserver (may be used by some animation libraries)
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver

// Mock matchMedia (used for responsive animations)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
