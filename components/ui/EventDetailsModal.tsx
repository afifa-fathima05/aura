'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Calendar, MapPin } from 'lucide-react'
import { Event } from '@/types'
import { SafeImage } from './SafeImage'
import { formatDate } from '@/lib/utils'
import ShinyText from './ShinyText'

interface EventDetailsModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
}

export function EventDetailsModal({ event, isOpen, onClose }: EventDetailsModalProps) {
  if (!event) return null

  const statusColors = {
    upcoming: 'text-neon-blue border-neon-blue bg-neon-blue/10',
    live: 'text-neon-green border-neon-green bg-neon-green/10',
    completed: 'text-gray-400 border-gray-400 bg-gray-400/10',
    archived: 'text-gray-400 border-gray-400 bg-gray-400/10',
  }

  const statusLabels = {
    upcoming: 'Upcoming',
    live: 'Live Now',
    completed: 'Completed',
    archived: 'Archived',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 p-2 glass rounded-full text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Event Image */}
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
                <SafeImage
                  src={event.imageUrl || ''}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  fallbackClassName="w-full h-full"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-syne font-semibold border ${statusColors[event.status as keyof typeof statusColors]}`}>
                    {statusLabels[event.status as keyof typeof statusLabels]}
                  </span>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Event Name */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl font-orbitron font-bold text-white mb-6 text-center"
              >
                {event.title}
              </motion.h2>

              {/* Event Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-center space-x-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-neon-purple" />
                    <span className="font-urbanist">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-neon-pink" />
                    <span className="font-urbanist">{event.location}</span>
                  </div>
                </div>
                
                <div className="text-gray-300 font-urbanist leading-relaxed text-center text-lg">
                  {event.description}
                </div>
              </motion.div>

              {/* Event Details */}
              {event.details && event.details.trim() !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-syne font-bold text-white mb-4 text-center">Event Details</h3>
                  <div className="glass p-6 rounded-lg border border-white/10">
                    <div className="text-gray-300 font-urbanist leading-relaxed whitespace-pre-line">
                      {event.details}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Agenda */}
              {event.agenda && event.agenda.trim() !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-syne font-bold text-white mb-4 text-center">Event Agenda</h3>
                  <div className="glass p-6 rounded-lg border border-white/10">
                    <div className="text-gray-300 font-urbanist leading-relaxed whitespace-pre-line">
                      {event.agenda}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Rules & Guidelines */}
              {event.rules && event.rules.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-syne font-bold text-white mb-4 text-center">Rules & Guidelines</h3>
                  <div className="glass p-6 rounded-lg border border-white/10">
                    <ul className="text-gray-300 font-urbanist leading-relaxed space-y-3">
                      {event.rules.map((rule, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="text-neon-blue mt-1 flex-shrink-0">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}



              {/* Registration Button */}
              {event.registrationLink && event.registrationLink.trim() !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex justify-center"
                >
                  <motion.a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon glass px-8 py-4 rounded-lg premium-shiny-border font-syne font-semibold text-white hover:bg-neon-blue/10 transition-all duration-300 flex items-center space-x-3"
                  >
                    <ShinyText text="Register Now" speed={2.5} className="font-syne font-semibold text-white" />
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}