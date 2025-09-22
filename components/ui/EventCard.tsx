'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import { Event } from '@/types'
import { formatDate } from '@/lib/utils'
import { SafeImage } from './SafeImage'
import ShinyText from './ShinyText'

interface EventCardProps {
  event: Event
  onClick?: () => void
  onLearnMore?: () => void
}

const statusColors = {
  upcoming: 'text-neon-blue border-neon-blue',
  live: 'text-neon-green border-neon-green',
  completed: 'text-gray-400 border-gray-400',
  archived: 'text-gray-400 border-gray-400', // Keep for backward compatibility
}

const statusLabels = {
  upcoming: 'Upcoming',
  live: 'Live Now',
  completed: 'Completed',
  archived: 'Archived', // Keep for backward compatibility
}

export function EventCard({ event, onClick, onLearnMore }: EventCardProps) {
  return (
    <motion.div
      // Removed zoom/raise hover to keep only text color hover effects
      whileHover={{}}
      whileTap={{}}
      className={`glass rounded-2xl overflow-hidden group w-full max-w-full ${onClick ? 'cursor-pointer' : ''}`}
      style={{ 
        borderRadius: '1rem'
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <SafeImage
          src={event.imageUrl || ''}
          alt={event.title}
          className="w-full h-full object-cover"
          fallbackClassName="w-full h-full"
        />
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-urbanist font-semibold border ${
          statusColors[event.status as keyof typeof statusColors] || statusColors.upcoming
        } bg-black/50 backdrop-blur-sm`}>
          {statusLabels[event.status as keyof typeof statusLabels] || event.status}
        </div>

        {/* Live Indicator */}
        {event.status === 'live' && (
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="text-xs font-urbanist font-semibold text-neon-green">
              LIVE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-syne font-bold text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
          {event.title}
        </h3>
        
        <p className="text-gray-400 font-urbanist text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4 text-neon-purple" />
            <span className="font-urbanist">{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4 text-neon-pink" />
            <span className="font-urbanist">{event.location}</span>
          </div>
        </div>

        {/* Coordinators */}
        {event.coordinators && event.coordinators.length > 0 && (
          <div className="mb-4">
            <h4 className="text-[10px] sm:text-xs font-urbanist uppercase tracking-wider text-gray-400 mb-1">
              EVENT COORDINATORS:
            </h4>
            <div className="space-y-1">
              {event.coordinators.map((coord, i) => (
                <div key={i} className="text-sm text-gray-300 font-urbanist">
                  {coord}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                onLearnMore?.()
              }}
              className="text-neon-blue hover:text-white font-urbanist font-medium text-sm transition-colors duration-300"
            >
              <ShinyText text="Learn More" speed={3} className="font-urbanist font-medium text-sm" />
            </motion.button>
            {event.externalLink && (
              <motion.a
                href={event.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>

          {event.registrationLink && (
            <motion.a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-neon glass px-4 py-2 rounded-lg premium-shiny-border hover:bg-neon-blue/10 transition-all duration-300"
            >
              <ShinyText text="Register Now" speed={2.5} className="font-syne font-semibold text-white text-sm" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}