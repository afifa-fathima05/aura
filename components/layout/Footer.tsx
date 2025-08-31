'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Linkedin, 
  Facebook,
  Youtube,
  Mail, 
  MapPin, 
  Phone,
  Sparkles
} from 'lucide-react'

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/auraclub.pec?igsh=MXEwemFqOThnOWJyYw%3D%3D&utm_source=qr', color: 'text-pink-400' },
  { name: 'LinkedIn', icon: Linkedin, href: 'http://linkedin.com/company/auraclub-pec/', color: 'text-blue-500' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/auraclub.pec', color: 'text-blue-400' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@auraclubpec', color: 'text-red-500' },
]



export function Footer() {
  return (
    <footer className="relative bg-black/20 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img 
                  src="https://res.cloudinary.com/dihxc3yzi/image/upload/v1754811115/cropped_circle_image_hshjiw.png"
                  alt="AURA Logo"
                  className="w-10 h-10 rounded-full object-cover border-2 border-neon-blue/50"
                />
              </motion.div>
              <span className="text-2xl font-orbitron font-bold gradient-text">
                AURA
              </span>
            </div>
            <p className="text-gray-400 font-urbanist">
              Where Creativity Meets Reality. Join us in exploring the intersection 
              of art, technology, and innovation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${social.color} hover:text-white transition-colors duration-300`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-syne font-semibold text-white">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4 text-neon-blue" />
                <span className="font-urbanist">aurapecai@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4 text-neon-purple" />
                <span className="font-urbanist">+91 6379 279 094</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 text-neon-pink" />
                <span className="font-urbanist">Panimalar Engineering College, Poonamallee</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-syne font-semibold text-white">
              Stay Updated
            </h3>
            <p className="text-gray-400 font-urbanist text-sm">
              Subscribe to our newsletter for the latest events and updates.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full btn-neon glass px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-neon-blue/20 transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          {/* Mobile layout */}
          <div className="md:hidden text-gray-400 font-urbanist text-sm space-y-4">
            {/* Top: copyright */}
            <div className="text-center">
              <p>© 2024 AURA Creative Club</p>
              <p>All rights reserved.</p>
            </div>
            {/* Bottom row: left = credit, right = links */}
            <div className="flex items-end justify-between">
              <p className="mt-2 text-left">
                Design and developed by
                <a href="https://www.instagram.com/arshu.x7/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon-blue"> Mohamed Arshad</a>
              </p>
              <div className="flex flex-col items-end text-right">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-neon-blue transition-colors duration-300 font-urbanist text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-neon-blue transition-colors duration-300 font-urbanist text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet layout (unchanged) */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-center md:text-left">
            <div className="text-gray-400 font-urbanist text-sm">
              <p>© 2024 AURA Creative Club</p>
              <p>All rights reserved.</p>
              <p className="mt-2">Design and developed by 
                <a href="https://portfolio-c177e.web.app" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon-blue"> Mohamed Arshad</a>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-6 gap-2 sm:gap-0 items-center md:items-end">
              <Link
                href="#"
                className="text-gray-400 hover:text-neon-blue transition-colors duration-300 font-urbanist text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-neon-blue transition-colors duration-300 font-urbanist text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}