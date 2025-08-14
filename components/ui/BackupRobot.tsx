'use client'

import { motion } from 'framer-motion'

export function BackupRobot() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated Robot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        {/* Robot Emoji with Animation */}
        <motion.div
          animate={{ 
            rotateY: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl mb-4"
        >
          🤖
        </motion.div>

        {/* Robot Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-2"
        >
          <h3 className="text-2xl font-orbitron font-bold text-white">
            AURA Robot
          </h3>
          <p className="text-gray-400 font-urbanist">
            Your Creative Assistant
          </p>
          
          {/* Interactive Buttons */}
          <div className="flex space-x-3 justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-neon-blue/20 border border-neon-blue/50 rounded-full text-sm font-urbanist text-neon-blue hover:bg-neon-blue/30 transition-all duration-300"
            >
              👋 Hello
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-neon-purple/20 border border-neon-purple/50 rounded-full text-sm font-urbanist text-neon-purple hover:bg-neon-purple/30 transition-all duration-300"
            >
              💬 Chat
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute w-1 h-1 bg-neon-blue rounded-full"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
                boxShadow: '0 0 6px rgba(59, 130, 246, 0.8)'
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}