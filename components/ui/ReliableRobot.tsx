'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ReliableRobotProps {
  className?: string
}

export function ReliableRobot({ className = '' }: ReliableRobotProps) {
  // Removed Spline: keep a pure, reliable animated robot
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue mx-auto mb-2"></div>
          <p className="text-sm text-gray-400 font-urbanist">Loading Robot...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Always show the animated robot - this is our primary display */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center p-6"
        >
          {/* Large animated robot */}
          <motion.div
            animate={{ 
              rotateY: [0, 5, -5, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative mb-6"
          >
            <div className="text-8xl sm:text-9xl lg:text-[10rem] mb-6">🤖</div>
            
            {/* Floating particles around robot */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.random() * 60 - 30],
                    y: [0, Math.random() * 60 - 30],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="absolute w-2 h-2 bg-neon-blue rounded-full"
                  style={{
                    left: `${30 + Math.random() * 40}%`,
                    top: `${30 + Math.random() * 40}%`,
                    boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)'
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white font-orbitron font-bold mb-2">
              AURA Robot
            </h3>
            <p className="text-gray-400 font-urbanist mb-4 text-base sm:text-lg">
              Your Creative Assistant
            </p>
            
            {/* Interactive buttons */}
            <div className="flex space-x-3 justify-center mb-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  console.log('Hello from AURA Robot!')
                  // You can add actual functionality here
                }}
                className="px-6 py-3 bg-neon-blue/20 border border-neon-blue/50 rounded-full text-base font-urbanist text-neon-blue hover:bg-neon-blue/30 transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/25"
              >
                👋 Hello
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  console.log('Chat with AURA Robot!')
                  // You can add actual functionality here
                }}
                className="px-6 py-3 bg-neon-purple/20 border border-neon-purple/50 rounded-full text-base font-urbanist text-neon-purple hover:bg-neon-purple/30 transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/25"
              >
                💬 Chat
              </motion.button>
            </div>
            
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-sm font-urbanist text-green-400"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Interactive Mode Active
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Removed Spline iframe and indicators */}
    </div>
  )
}