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

  useEffect(() => {
    if (open) {
      const auto = setTimeout(() => setOpen(false), 3500)
      return () => clearTimeout(auto)
    }
  }, [open])

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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="alert"
          aria-live="polite"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={handleClose} />
          
          {/* Alert Content */}
          <div className="glass relative flex items-start gap-2 sm:gap-3 rounded-xl border border-white/15 p-4 sm:p-6 shadow-2xl w-full max-w-md sm:max-w-lg">
            <div className="shrink-0 text-yellow-300/90">
              <XCircle className="h-6 w-6 rotate-45" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-syne text-sm sm:text-base font-semibold text-white mb-1">
                Welcome to AURA<br></br>
                ALERT🚨‼️ 
              </p>
            
              <p className="font-urbanist text-xs sm:text-sm text-gray-300 leading-relaxed break-words">
                Welcome to the Auraclub - Aura Club is now open to all departments..
              </p>
            </div>
            <button
              aria-label="Close welcome message"
              onClick={handleClose}
              className="absolute -top-2 -right-2 rounded-full p-2 bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors border border-white/20"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}