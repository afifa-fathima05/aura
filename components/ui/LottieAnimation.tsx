'use client'

import { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'

interface LottieAnimationProps {
  animationData: any
  className?: string
  loop?: boolean
  autoplay?: boolean
  style?: React.CSSProperties
  hoverToPlay?: boolean
}

export function LottieAnimation({ 
  animationData, 
  className = '', 
  loop = true, 
  autoplay = true,
  style = {},
  hoverToPlay = false
}: LottieAnimationProps) {
  const lottieRef = useRef<any>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (lottieRef.current && hoverToPlay) {
      if (isHovered) {
        lottieRef.current.play()
      } else {
        lottieRef.current.pause()
      }
    }
  }, [isHovered, hoverToPlay])

  const handleMouseEnter = () => {
    if (hoverToPlay) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (hoverToPlay) {
      setIsHovered(false)
    }
  }

  return (
    <div 
      className={`inline-block ${className}`} 
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay && !hoverToPlay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}