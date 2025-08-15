'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ParticleBackground } from '@/components/ui/ParticleBackground'
import WelcomeAlert from '@/components/ui/WelcomeAlert'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Check if we're in admin section
  const isAdminRoute = pathname?.startsWith('/admin')
  
  if (isAdminRoute) {
    // Admin layout - no navbar, no footer, no particles
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {children}
      </div>
    )
  }
  
  // Regular layout - with navbar, footer, and particles
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <WelcomeAlert />
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}