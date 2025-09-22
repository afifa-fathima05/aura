'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Join Us', href: '#join' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (href: string) => {
    const scrollWithOffset = (hash: string) => {
      const el = document.querySelector(hash);
      if (!el) return;
      const yOffset = -80; // navbar height + small gap
      const y = (el as HTMLElement).getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.history.pushState(null, '', hash); // update URL hash
      window.scrollTo({ top: y, behavior: 'smooth' });
    };

    if (pathname === '/') {
      requestAnimationFrame(() => scrollWithOffset(href));
    } else {
      router.push(`/${href}`);
      setTimeout(() => scrollWithOffset(href), 250);
    }
    setIsOpen(false);
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-w-full overflow-hidden ${
        scrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Text Only */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-orbitron font-bold gradient-text">
              AURA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="text-gray-300 hover:text-neon-blue transition-colors duration-300 font-urbanist font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
              {user && (
                <Link
                  href="/admin"
                  className="text-aura-secondary font-urbanist font-medium"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Auth Button */}
          <div className="hidden md:block">
            {user ? (
              <button
                onClick={signOut}
                className="glass px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-all duration-300"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/admin"
                className="btn-neon glass px-4 py-2 rounded-2xl text-sm font-medium text-white hover:bg-white/20 transition-all duration-300"
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-neon-blue transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="text-gray-300 hover:text-neon-blue block px-3 py-2 text-base font-medium transition-colors duration-300 w-full text-center"
                >
                  {item.name}
                </button>
              ))}
              {user && (
                <Link
                  href="/admin"
                  className="text-aura-secondary block px-3 py-2 text-base font-medium text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              )}
              <div className="px-3 py-2 text-center">
                {user ? (
                  <button
                    onClick={() => {
                      signOut()
                      setIsOpen(false)
                    }}
                    className="w-full text-center text-gray-300 hover:text-neon-blue transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/admin"
                    className="text-gray-300 hover:text-neon-blue transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}