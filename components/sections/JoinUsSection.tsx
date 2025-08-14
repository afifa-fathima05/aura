'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Users, Zap, Heart, ArrowRight } from 'lucide-react'
import { MembershipModal } from '@/components/ui/MembershipModal'
import { LottieAnimation } from '@/components/ui/LottieAnimation'

// Import Lottie animations
import echoedVoicesAnimation from '@/components/lottie/Echoed Voices.json'
import movingStoriesAnimation from '@/components/lottie/Moving Stories.json'
import framedRealitiesAnimation from '@/components/lottie/Framed Realities.json'
import skillDevelopmentAnimation from '@/components/lottie/skill developement.json'

const benefits = [
  {
    icon: Sparkles,
    title: 'Echoed Voices',
    description: 'From melody to spoken word, your voice holds power. This is your stage to be heard and celebrated.',
    color: 'text-aura-primary',
    animation: echoedVoicesAnimation
  },
  {
    icon: Users,
    title: 'Moving Stories',
    description: 'Let motion speak where words pause — your expression becomes narrative, your rhythm becomes language.',
    color: 'text-aura-secondary',
    animation: movingStoriesAnimation
  },
  {
    icon: Zap,
    title: 'Framed Realities',
    description: 'Capture the unseen and shape compelling perspectives — every frame a story, every angle a message.',
    color: 'text-neon-pink',
    animation: framedRealitiesAnimation
  },
  {
    icon: Heart,
    title: 'Skill Development',
    description: 'Grow beyond talent. Learn from industry professionals, refine your craft, and evolve into a creative force.',
    color: 'text-neon-green',
    animation: skillDevelopmentAnimation
  },
]



export function JoinUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false)

  return (
    <section id="join" ref={ref} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-3 sm:mb-6">
            Join AURA
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 font-urbanist max-w-3xl mx-auto px-2">
            Step into the future of creativity.<br />
            Find your path, ignite your passion, and create with a community that dares to dream beyond.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="glass p-4 sm:p-6 rounded-xl text-center"
            >
              <div className="mb-3 sm:mb-4 flex justify-center">
                {benefit.animation ? (
                  <LottieAnimation 
                    animationData={benefit.animation}
                    className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300 hover:scale-110"
                    loop={true}
                    autoplay={true}
                    hoverToPlay={false}
                  />
                ) : (
                  <div className={`${benefit.color}`}>
                    <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-syne font-semibold text-white mb-2 sm:mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-400 font-urbanist text-xs sm:text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>



        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center glass p-6 sm:p-8 lg:p-12 rounded-2xl mx-2 sm:mx-0 relative overflow-hidden"
        >
          {/* Futuristic Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-aura-primary/5 via-transparent to-aura-secondary/5 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aura-primary to-transparent animate-shine"></div>
          
          <div className="relative z-10">
            <motion.h3 
              className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold mb-3 sm:mb-4 px-2"
              style={{
                background: 'linear-gradient(45deg, #ff6b35, #f7931e, #ffd23f, #06d6a0)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 3s ease infinite'
              }}
            >
              ⚡ READY TO START YOUR CREATIVE JOURNEY? ⚡
            </motion.h3>
            
            <motion.p 
              className="text-sm sm:text-base font-urbanist mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
              style={{
                background: 'linear-gradient(90deg, #ffffff, #aaaaaa, #ffffff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'text-shimmer 2s ease-in-out infinite'
              }}
            >
              🚀 Join hundreds of creators who are already pushing the boundaries of what's possible. 
              Your next breakthrough is just one click away. 🌟
            </motion.p>
            
            {/* Futuristic decorative elements */}
            <div className="flex justify-center space-x-4 mb-4">
              <div className="w-2 h-2 bg-aura-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-aura-secondary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-aura-accent rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-aura-primary rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Membership Modal */}
      <MembershipModal
        isOpen={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
      />
    </section>
  )
}