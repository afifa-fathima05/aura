'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function WavingRobot() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center"
    >
      {/* Glow Effect Background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-xl" />
      
      {/* Main Robot Container */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        
        {/* Robot Body */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotateY: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative"
        >
          {/* Robot Head */}
          <div className="text-8xl sm:text-9xl md:text-[10rem] relative">
            🤖
            
            {/* Waving Hand */}
            <motion.div
              animate={{ 
                rotate: [0, 20, -10, 20, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-8 sm:-right-12 md:-right-16 text-4xl sm:text-5xl md:text-6xl"
              style={{ transformOrigin: 'bottom center' }}
            >
              👋
            </motion.div>
          </div>
        </motion.div>
        
        {/* Greeting Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center space-y-2"
        >
          <motion.p 
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xl sm:text-2xl md:text-3xl font-orbitron font-bold gradient-text"
          >
            Hello There! 👋
          </motion.p>
          <p className="text-sm sm:text-base text-gray-400 font-urbanist">
            Welcome to AURA Creative Club
          </p>
        </motion.div>

        {/* Interactive Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 relative">
            <p className="text-sm font-urbanist text-white/90">
              Ready to create something amazing?
            </p>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/10 border-r border-b border-white/20 rotate-45" />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex space-x-3"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-neon-blue/20 border border-neon-blue/50 rounded-full text-sm font-urbanist text-neon-blue hover:bg-neon-blue/30 transition-all duration-300 flex items-center space-x-2"
          >
            <span>👋</span>
            <span>Wave Back</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-neon-purple/20 border border-neon-purple/50 rounded-full text-sm font-urbanist text-neon-purple hover:bg-neon-purple/30 transition-all duration-300 flex items-center space-x-2"
          >
            <span>💬</span>
            <span>Say Hi</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-blue/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>

      {/* Orbital Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 border border-dashed border-neon-blue/20 rounded-full"
      />
    </motion.div>
  )
}