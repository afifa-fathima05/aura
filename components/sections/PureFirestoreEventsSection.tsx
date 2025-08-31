'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Users, CheckCircle, AlertTriangle } from 'lucide-react'
import { Event } from '@/types'
import { EventCard } from '@/components/ui/EventCard'
import { EventDetailsModal } from '@/components/ui/EventDetailsModal'
import { 
  subscribeToFirestoreEvents, 
  subscribeToEventCounts,
  initializeFirestoreWithSampleData 
} from '@/lib/pureFirestoreEventService'

export function PureFirestoreEventsSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [eventCounts, setEventCounts] = useState({
    upcoming: 0,
    live: 0,
    completed: 0,
    total: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let eventsUnsubscribe: (() => void) | null = null
    let countsUnsubscribe: (() => void) | null = null

    const setupRealtimeListeners = async () => {
      try {
        console.log('🔥 Setting up real-time Firestore listeners...')
        setConnectionStatus('connecting')

        // Initialize with sample data if empty
        await initializeFirestoreWithSampleData()

        // Set up real-time listener for all events
        eventsUnsubscribe = subscribeToFirestoreEvents(
          (updatedEvents) => {
            console.log(`🔄 Real-time events update: ${updatedEvents.length} events`)
            setEvents(updatedEvents)
            setLoading(false)
            setConnectionStatus('connected')
            setError(null)
          },
          (error) => {
            console.error('❌ Events listener error:', error)
            setError(`Real-time connection error: ${error.message}`)
            setConnectionStatus('error')
            setLoading(false)
          }
        )

        // Set up real-time listener for event counts
        countsUnsubscribe = subscribeToEventCounts(
          (counts) => {
            console.log('🔄 Event counts update:', counts)
            setEventCounts(counts)
          },
          (error) => {
            console.error('❌ Counts listener error:', error)
          }
        )

        console.log('✅ Real-time listeners set up successfully')

      } catch (error) {
        console.error('❌ Error setting up real-time listeners:', error)
        setError(`Failed to connect to Firestore: ${error instanceof Error ? error.message : 'Unknown error'}`)
        setConnectionStatus('error')
        setLoading(false)
      }
    }

    setupRealtimeListeners()

    // Cleanup listeners on unmount
    return () => {
      console.log('🧹 Cleaning up real-time listeners...')
      eventsUnsubscribe?.()
      countsUnsubscribe?.()
    }
  }, [])

  // Filter events for display (only upcoming and live)
  const upcomingEvents = events.filter(event => event.status === 'upcoming')
  const liveEvents = events.filter(event => event.status === 'live')
  const displayEvents = [...liveEvents, ...upcomingEvents].slice(0, 6)

  const handleLearnMore = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  if (loading) {
    return (
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto overflow-x-hidden">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-6"
            >
              Upcoming Events
            </motion.h2>
            <div className="flex items-center justify-center space-x-2 text-neon-blue">
              <div className="loading-spinner w-5 h-5"></div>
              <span className="font-urbanist">Connecting to Firestore...</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-6 rounded-xl animate-pulse w-full overflow-hidden">
                <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto overflow-x-hidden">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-6"
            >
              Upcoming Events
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h3 className="text-2xl font-syne font-bold text-white mb-4">
              Connection Error
            </h3>
            <p className="text-red-400 font-urbanist max-w-md mx-auto mb-6">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-neon glass px-6 py-3 rounded-lg font-syne font-semibold text-white border border-neon-blue hover:bg-neon-blue/20 transition-all duration-300"
            >
              Retry Connection
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto overflow-x-hidden">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-6"
          >
            Upcoming Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 font-urbanist max-w-3xl mx-auto"
          >
            Join us for exclusive events, networking opportunities, and unforgettable experiences
          </motion.p>
          
          {/* Events Count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-lg text-gray-400 font-medium"
          >
            <span>Total events conducted: {eventCounts.total}</span>
          </motion.div>
        </div>

        {displayEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-syne font-bold text-white mb-4">
              No Upcoming Events
            </h3>
            <p className="text-gray-400 font-urbanist max-w-md mx-auto">
              Stay tuned for exciting events and exclusive experiences coming soon!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden">
            {displayEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="w-full overflow-hidden"
              >
                <EventCard 
                  event={event} 
                  onLearnMore={() => handleLearnMore(event)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Events Link */}
        {eventCounts.total > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <button className="btn-neon glass px-8 py-4 rounded-lg font-syne font-semibold text-white border border-neon-blue hover:bg-neon-blue/20 transition-all duration-300">
              View All Events ({eventCounts.total})
            </button>
          </motion.div>
        )}

        {/* Event Details Modal */}
        <EventDetailsModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

      </div>
    </section>
  )
}