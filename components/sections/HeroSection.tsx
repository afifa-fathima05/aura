"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/utils";
import { ChevronDown, Sparkles } from "lucide-react";
import ShinyText from "@/components/ui/ShinyText";


import { MembershipModal } from "@/components/ui/MembershipModal";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import herosectionrobo from '../lottie/herosectionrobo.json';


const HeroSection = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 pt-8 pb-28 sm:pt-28 sm:pb-32 overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-12 lg:gap-16">
          {/* Right Content (Lottie) - first on mobile, second on desktop */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end px-0 sm:px-2 -translate-y-6 sm:translate-y-0">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl"
            >
              <LottieAnimation
                animationData={herosectionrobo}
                className="w-full h-auto"
                loop={true}
                autoplay={true}
              />
            </motion.div>
          </div>

          {/* Left Content (Text) */}
          <div className="order-2 lg:order-1 text-center lg:text-left px-2 sm:px-4 space-y-5 sm:space-y-6 -translate-y-6 sm:translate-y-0">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="pt-2 sm:pt-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-orbitron text-white">THE AURA</h1>
              <ShinyText
                text="An Visionary Club of Panimalar Engineering College"
                disabled={false}
                speed={3}
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-syne font-light leading-relaxed mb-3 sm:mb-4"
              />
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-urbanist leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8"
              >
                Join the most innovative creative club at Panimalar Engineering College. We’re a community of visionaries, creators, and tech enthusiasts pushing the boundaries of digital innovation and creative expression.
              </motion.div>
            </motion.div>

            {/* Join Now Button */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.5 }}
              className="flex justify-center lg:justify-start mt-0 sm:mt-4"
            >
              <motion.button
                onClick={() => setIsMembershipModalOpen(true)}
                whileHover={{ boxShadow: '0 0 30px rgba(255, 107, 53, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="btn-neon glass px-5 py-2.5 rounded-full text-sm font-syne font-semibold text-white border border-aura-primary hover:bg-aura-primary/20 transition-all duration-300 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join Now</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex justify-center px-4"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-1 sm:space-y-2 text-gray-400 text-center"
            >
              <span className="text-xs sm:text-sm font-syne whitespace-nowrap">Scroll to explore</span>
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Membership Modal */}
      <MembershipModal
        isOpen={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
      />
    </section>
  );
};


export default HeroSection;


