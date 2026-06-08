'use client'

import { useEffect, useRef } from 'react'

type SectionName =
  | 'hero_1'
  | 'credibility_2'
  | 'why_nemory_3'
  | 'how_it_works_5'
  | 'privacy_6'
  | 'gallery_7'
  | 'faq_8'

export function useSectionViewTracking(
  sectionName: SectionName,
  threshold = 0.45,
) {
  const ref = useRef<HTMLElement | null>(null)
  const trackedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || trackedRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || trackedRef.current) return

        trackedRef.current = true

        window.gtag?.('event', `section_${sectionName}_viewed`, {
          section: sectionName,
        })

        observer.disconnect()
      },
      { threshold },
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [sectionName, threshold])

  return ref
}
