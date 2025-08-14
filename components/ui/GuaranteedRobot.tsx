'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function GuaranteedRobot() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center relative"
    >
      {/* Glass Background */}
      <div className="absolute inset-0 rounded-full glass border border-white/20 shadow-2xl" />
      
      {/* Robot Animation */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Robot Head */}
        <motion.div
          animate={{ 
            rotateY: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          whileHover={{ 
            scale: 1.1,
            rotateZ: [0, 5, -5, 0]
          }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl cursor-pointer select-none"
        >
          🤖
        </motion.div>
        
        {/* Greeting Text */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-center"
        >
          <p className="text-lg sm:text-xl font-orbitron font-bold gradient-text">
            Hello! I'm AURA
          </p>
          <p className="text-sm text-gray-400 font-urbanist">
            Your Creative Assistant
          </p>
        </motion.div>
        
        {/* Pulsing Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-neon-blue rounded-full"
            />
          ))}
        </div>

        {/* Interactive Elements */}
        <motion.div
          className="flex space-x-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-neon-blue/20 border border-neon-blue/50 rounded-full text-xs font-urbanist text-neon-blue hover:bg-neon-blue/30 transition-colors"
          >
            👋 Wave
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-neon-purple/20 border border-neon-purple/50 rounded-full text-xs font-urbanist text-neon-purple hover:bg-neon-purple/30 transition-colors"
          >
            💬 Chat
          </motion.button>
        </motion.div>
      </div>
      
      {/* Animated Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 border-2 border-dashed border-neon-blue/30 rounded-full"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue/40 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}