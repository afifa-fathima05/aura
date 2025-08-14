'use client'

import { useState, useEffect } from 'react'
import { BackupRobot } from './BackupRobot'

interface HybridRobotProps {
  className?: string
}

export function HybridRobot({ className = '' }: HybridRobotProps) {
  const [useBackup, setUseBackup] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // After 8 seconds, switch to backup visual
    const timer = setTimeout(() => {
      console.log('🔄 Switching to backup visual due to loading timeout')
      setUseBackup(true)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue mx-auto mb-2"></div>
          <p className="text-sm text-gray-400 font-urbanist">Loading Robot...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <BackupRobot />
    </div>
  )
}