'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon } from 'lucide-react'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
  fallbackClassName?: string
  onLoad?: () => void
  onError?: () => void
}

export function SafeImage({ 
  src, 
  alt, 
  className = '', 
  fallbackClassName = '',
  onLoad,
  onError 
}: SafeImageProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    if (!src) {
      setImageState('error')
      return
    }

    setImageState('loading')
    setImageSrc('')

    // Handle data URLs (base64 images)
    if (src.startsWith('data:')) {
      // Data URLs are already valid, just set them
      setImageSrc(src)
      setImageState('loaded')
      onLoad?.()
      return
    }

    // Handle regular URLs
    const img = new Image()
    
    img.onload = () => {
      setImageSrc(src)
      setImageState('loaded')
      onLoad?.()
    }
    
    img.onerror = () => {
      console.warn('Image failed to load:', src)
      setImageState('error')
      onError?.()
    }
    
    img.src = src
  }, [src, onLoad, onError])

  if (imageState === 'loading') {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 ${fallbackClassName}`}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500 text-xs font-urbanist">Loading...</p>
        </div>
      </div>
    )
  }

  if (imageState === 'error' || !imageSrc) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 ${fallbackClassName}`}>
        <div className="text-center">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm font-urbanist">
            {src ? 'Image failed to load' : 'No image'}
          </p>
          {src && (
            <p className="text-gray-600 text-xs font-urbanist mt-1">
              {src.startsWith('data:') ? 'Data URL' : 'External URL'}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onLoad={onLoad}
      onError={onError}
    />
  )
}