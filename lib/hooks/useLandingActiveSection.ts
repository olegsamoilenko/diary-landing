'use client'

import { useEffect, useState } from 'react'
import { landingNavItems } from '@/lib/constants/landingNavItems'

export function useLandingActiveSection() {
  const [activeSectionId, setActiveSectionId] = useState('hero')

  useEffect(() => {
    const sectionIds = landingNavItems.map((item) => item.targetId)

    const handleScroll = () => {
      const headerOffset = 96
      let currentActive = sectionIds[0]

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue

        const rect = el.getBoundingClientRect()

        if (rect.top - headerOffset <= 0) {
          currentActive = id
        }
      }

      setActiveSectionId(currentActive)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    activeSectionId,
    setActiveSectionId,
  }
}
