'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, ExternalLink, Clock } from 'lucide-react'
import { Event } from '@/types'
import { formatDateTime } from '@/lib/utils'
import ShinyText from './ShinyText'

interface EventModalProps {
  event: Event
  onClose: () => void
}

export function EventModal({ event, onClose }: EventModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative">
            {event.imageUrl ? (
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="h-64 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-t-2xl flex items-center justify-center">
                <Calendar className="w-24 h-24 text-gray-400" />
              </div>
            )}
            
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 glass rounded-full text-white hover:text-neon-blue transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Status Badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-urbanist font-semibold border ${
              event.status === 'upcoming' ? 'text-neon-blue border-neon-blue' :
              event.status === 'live' ? 'text-neon-green border-neon-green' :
              'text-gray-400 border-gray-400'
            } bg-black/50 backdrop-blur-sm`}>
              {event.status === 'upcoming' ? 'Upcoming' :
               event.status === 'live' ? 'Live Now' : 'Archived'}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-3xl font-syne font-bold text-white mb-4">
              {event.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <Calendar className="w-5 h-5 text-neon-purple" />
                <span className="font-urbanist">{formatDateTime(event.date)}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-neon-pink" />
                <span className="font-urbanist">{event.location}</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-gray-300 font-urbanist leading-relaxed text-lg">
                {event.description}
              </p>
              
              {/* Additional Details */}
              {event.details && (
                <div className="mt-6 p-4 glass rounded-lg border border-white/10">
                  <h3 className="text-xl font-syne font-semibold text-white mb-3">Event Details</h3>
                  <div className="text-gray-300 font-urbanist leading-relaxed whitespace-pre-wrap">
                    {event.details}
                  </div>
                </div>
              )}
              
              {/* Agenda */}
              {event.agenda && (
                <div className="mt-6 p-4 glass rounded-lg border border-white/10">
                  <h3 className="text-xl font-syne font-semibold text-white mb-3">Agenda</h3>
                  <div className="text-gray-300 font-urbanist leading-relaxed whitespace-pre-wrap">
                    {event.agenda}
                  </div>
                </div>
              )}
              
              {/* Rules */}
              {event.rules && event.rules.length > 0 && (
                <div className="mt-6 p-4 glass rounded-lg border border-white/10">
                  <h3 className="text-xl font-syne font-semibold text-white mb-3">Rules & Guidelines</h3>
                  <ul className="text-gray-300 font-urbanist leading-relaxed space-y-2">
                    {event.rules.map((rule, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-neon-blue mt-1">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {event.registrationLink && (
                <motion.a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon glass px-6 py-3 rounded-lg premium-shiny-border font-syne font-semibold text-white hover:bg-neon-green/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <ShinyText text="Register Now" speed={2.5} className="font-syne font-semibold text-white" />
                </motion.a>
              )}

              {event.status === 'upcoming' && !event.registrationLink && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-neon glass px-6 py-3 rounded-lg font-syne font-semibold text-white border border-neon-blue hover:bg-neon-blue/20 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Add to Calendar</span>
                </motion.button>
              )}

              {event.status === 'live' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-neon glass px-6 py-3 rounded-lg font-syne font-semibold text-white border border-neon-green hover:bg-neon-green/20 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span>Join Live</span>
                </motion.button>
              )}

              {event.externalLink && (
                <motion.a
                  href={event.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass px-6 py-3 rounded-lg font-syne font-semibold text-white border border-white/20 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  <ShinyText text="Learn More" speed={3} className="font-syne font-semibold text-white" />
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}