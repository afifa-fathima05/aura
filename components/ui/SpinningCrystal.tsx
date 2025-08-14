'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function SpinningCrystal() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleClick = () => {
    setClickCount(prev => prev + 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Outer Glow Ring */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ 
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.3 }
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 blur-xl"
      />

      {/* Main Crystal Container */}
      <motion.div
        animate={{ 
          rotateY: 360,
          rotateX: isHovered ? 15 : 0,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ 
          rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 0.3 },
          scale: { duration: 0.3 }
        }}
        className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Crystal Core */}
        <motion.div
          animate={{ 
            background: [
              'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))',
              'linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8))',
              'linear-gradient(135deg, rgba(236, 72, 153, 0.8), rgba(59, 130, 246, 0.8))'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-4 backdrop-blur-sm border border-white/30 transform rotate-45"
          style={{
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)'
          }}
        />

        {/* Inner Light */}
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity },
            opacity: { duration: 2, repeat: Infinity }
          }}
          className="absolute inset-1/4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur-sm"
          style={{
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.6)'
          }}
        />

        {/* Light Reflections */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              rotate: 360
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
            className="absolute w-2 h-8 bg-white/60 rounded-full blur-sm"
            style={{
              left: `${30 + Math.cos(i * 60 * Math.PI / 180) * 25}%`,
              top: `${30 + Math.sin(i * 60 * Math.PI / 180) * 25}%`,
              transformOrigin: 'center',
              transform: `rotate(${i * 60}deg)`
            }}
          />
        ))}
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Interactive Effects */}
      {isHovered && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 border-2 border-neon-blue/50 rounded-full"
        />
      )}

      {/* Click Effect */}
      {clickCount > 0 && (
        <motion.div
          key={clickCount}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 border-4 border-neon-purple/80 rounded-full"
        />
      )}

      {/* Interaction Hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
      >
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-gray-400 font-urbanist"
        >
          Click to interact ✨
        </motion.p>
      </motion.div>
    </motion.div>
  )
}