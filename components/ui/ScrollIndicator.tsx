'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface ScrollIndicatorProps {
  onClick: () => void
}

export function ScrollIndicator({ onClick }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center space-y-2 text-gray-400 hover:text-neon-blue transition-colors duration-300"
      >
        <span className="text-sm font-urbanist">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="p-2 rounded-full border border-current"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}