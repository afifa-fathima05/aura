'use client'

import { motion } from 'framer-motion'

export function RobotFallback() {
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
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl cursor-pointer"
        >
          🤖
        </motion.div>
        
        {/* Loading Text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <p className="text-lg sm:text-xl font-orbitron font-bold gradient-text">
            AURA Robot
          </p>
          <p className="text-sm text-gray-400 font-urbanist">
            Ready to Assist!
          </p>
        </motion.div>
        
        {/* Loading Dots */}
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
      </div>
      
      {/* Animated Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 border-2 border-dashed border-neon-blue/30 rounded-full"
      />
    </motion.div>
  )
}