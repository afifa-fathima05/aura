"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { XCircle } from "lucide-react"

/**
 * Dismissible welcome alert shown on initial page load.
 * - Clean glass UI with padding
 * - Close button
 * - Smooth animated disappear on close
 * - Persists dismissal for the current browser tab (sessionStorage)
 */
export default function WelcomeAlert() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem("aura_welcome_dismissed") === "1"
    if (!dismissed) {
      // Defer to next tick to ensure hydration before showing
      const t = setTimeout(() => setOpen(true), 50)
      return () => clearTimeout(t)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    try {
      sessionStorage.setItem("aura_welcome_dismissed", "1")
    } catch {}
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-4 left-1/2 z-[60] -translate-x-1/2 px-4 sm:px-6 w-full max-w-xl"
          role="alert"
          aria-live="polite"
        >
          <div className="glass relative flex items-start gap-3 rounded-xl border border-white/15 p-4 sm:p-5 shadow-lg">
            <div className="shrink-0 text-yellow-300/90">
              <XCircle className="h-6 w-6 rotate-45" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="font-syne text-sm sm:text-base font-semibold text-white mb-1">
                Welcome to AURA
              </p>
              <p className="font-urbanist text-xs sm:text-sm text-gray-300 leading-relaxed">
                Explore events, join the community, and discover where creativity meets reality.
              </p>
            </div>
            <button
              aria-label="Close welcome message"
              onClick={handleClose}
              className="ml-2 rounded-full p-1.5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}