import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ConditionalLayout } from '@/components/layout/ConditionalLayout'
import { AuthProvider } from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AURA - Where Creativity Meets Reality',
  description: 'A futuristic creative club for university students. Join us in exploring the intersection of art, technology, and innovation.',
  keywords: ['creative club', 'university', 'art', 'technology', 'innovation', 'AURA'],
  authors: [{ name: 'AURA Creative Club' }],
  openGraph: {
    title: 'AURA - Where Creativity Meets Reality',
    description: 'A futuristic creative club for university students.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA - Where Creativity Meets Reality',
    description: 'A futuristic creative club for university students.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ff6b35',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="min-h-screen overflow-x-hidden">
          <AuthProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}