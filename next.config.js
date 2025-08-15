/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false, // Keep TypeScript checks for production
  },
  experimental: {
    serverComponentsExternalPackages: []
  },
  // Optimize for Vercel deployment
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  webpack: (config, { isServer, dev }) => {
    // Handle undici compatibility issue
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }

    // Resolve aliases
    const isVercel = !!process.env.VERCEL
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }

    return config
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ]
  },
  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  }
}

module.exports = nextConfig