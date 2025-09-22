'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Lightbulb, Users, Trophy, Rocket } from 'lucide-react'
import { LottieAnimation } from '@/components/ui/LottieAnimation'
import ShinyText from '@/components/ui/ShinyText'

// Import Lottie animations
import rocketAnimation from '@/components/lottie/rocket.json'
import collaborationAnimation from '@/components/lottie/Collabration.json'
import excellenceAnimation from '@/components/lottie/Excellence.json'
import curiosityAnimation from '@/components/lottie/Magnifying-glass.json'

// Type definition for values
interface ValueItem {
  title: string
  description: string
  animation?: any
  icon?: string
}

const timelineEvents = [
  {
   
    title: 'The Spark',
    description: 'Aura ignites — born to fuse creativity and technology into a living force. ',
    icon: Lightbulb,
    color: 'text-neon-blue'
  },
  {

    title: 'The Rise',
    description: 'Trailblazing events spark waves. Futures shift. A new creative era begins.',
    icon: Users,
    color: 'text-neon-purple'
  },
  {

    title: 'The Crown',
    description: 'We didn’t compete — we set the standard. Aura became the name they chase.',
    icon: Trophy,
    color: 'text-neon-pink'
  },
  {

    title: 'The Evolution',
    description: 'No limits. Just forward. Innovation, unity, and boldness define our next frontier.',
    icon: Rocket,
    color: 'text-neon-green'
  },
]

const values: ValueItem[] = [
  {
    title: 'Innovation',
    description: 'We push the boundaries of creative expression through cutting-edge mediums and ideas.',
    animation: rocketAnimation
  },
  {
    title: 'Collaboration',
    description: 'We believe the best art emerges when minds come together in harmony.',
    animation: collaborationAnimation
  },
  {
    title: 'Excellence',
    description: 'We strive for mastery and polish in everything we create — from stage to canvas.',
    animation: excellenceAnimation
  },
  {
    title: 'Curiosity',
    description: 'We explore beyond the obvious, inviting imagination and experimentation in every form.',
    animation: curiosityAnimation
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-6">
            About AURA
          </h2>
          <p className="text-xl text-gray-400 font-urbanist max-w-3xl mx-auto">
           AURA is where art meets innovation..<br></br>
             A bold creative collective uniting passionate minds to reimagine expression through immersive, tech-infused experiences.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-syne font-bold text-neon-blue mb-4">
              Our Mission
            </h3>
            <p className="text-gray-300 font-urbanist leading-relaxed">
             To build a vibrant platform where artistic expression meets innovation — empowering students to explore, experiment, and evolve through interdisciplinary collaboration, digital media, and immersive storytelling.<br></br>
             We are here to nurture raw talent, spark curiosity, and cultivate a culture of fearless creation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-syne font-bold text-neon-purple mb-4">
              Our Vision
            </h3>
            <p className="text-gray-300 font-urbanist leading-relaxed">
              To be the leading creative hub that shapes the future of digital art and 
              innovation, fostering a new generation of creators who will redefine the 
              boundaries between imagination and reality.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-syne font-bold text-center gradient-text mb-12">
            The unfolding story of AURA’s rise.
          </h3>
          <div className="relative">
            {/* Timeline line - Desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink rounded-full"></div>
            
            {/* Timeline line - Mobile */}
            <div className="md:hidden absolute left-8 top-0 w-1 h-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink rounded-full"></div>
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
               
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row flex-row' : 'md:flex-row-reverse flex-row'
                  }`}
                >
                  {/* Desktop Layout */}
                  <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="glass p-6 rounded-xl">
                      <div className={`text-2xl font-orbitron font-bold ${event.color} mb-2`}>
                       
                      </div>
                      <h4 className="text-xl font-syne font-semibold text-white mb-3">
                        {event.title}
                      </h4>
                      <ShinyText
                        text={event.description}
                        disabled={false}
                        speed={3}
                        className="text-gray-400 font-urbanist"
                      />
                    </div>
                  </div>
                  
                  {/* Timeline Icon */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 glass rounded-full border-2 border-white/20 md:mx-0 mr-6">
                    <event.icon className={`w-8 h-8 ${event.color}`} />
                  </div>
                  
                  {/* Mobile Layout */}
                  <div className="md:hidden flex-1">
                    <div className="glass p-6 rounded-xl">
                      <div className={`text-2xl font-orbitron font-bold ${event.color} mb-2`}>
                    
                      </div>
                      <h4 className="text-xl font-syne font-semibold text-white mb-3">
                        {event.title}
                      </h4>
                      <ShinyText
                        text={event.description}
                        disabled={false}
                        speed={3}
                        className="text-gray-400 font-urbanist"
                      />
                    </div>
                  </div>
                  
                  {/* Desktop spacer */}
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h3 className="text-3xl font-syne font-bold text-center gradient-text mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="glass p-6 rounded-xl text-center card-hover"
              >
                <div className="mb-4 flex justify-center">
                  {value.animation ? (
                    <LottieAnimation 
                      animationData={value.animation}
                      className="w-16 h-16 transition-transform duration-300 hover:scale-110"
                      loop={true}
                      autoplay={true}
                      hoverToPlay={false}
                    />
                  ) : (
                    <div className="text-4xl transition-transform duration-300 hover:scale-110">{value.icon}</div>
                  )}
                </div>
                <h4 className="text-xl font-syne font-semibold text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-400 font-urbanist text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}