'use client'

import { useEffect } from 'react'

export function HashNavigationHandler() {
  useEffect(() => {
    // Handle hash navigation when coming from other pages
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100) // Small delay to ensure page is rendered
    }
  }, [])

  return null // This component doesn't render anything
}