'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  LogOut,
  User,
  Home
} from 'lucide-react'
import { Event } from '@/types'
import { PureFirestoreEventForm } from './PureFirestoreEventForm'
import { EventModal } from '@/components/ui/EventModal'
import { SafeImage } from '@/components/ui/SafeImage'
import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { FormTestPanel } from './FormTestPanel'
import { MembershipApplicationsPanel } from './MembershipApplicationsPanel'
import { ClubMembersAdminPanel } from './ClubMembersAdminPanel'

import { 
  subscribeToFirestoreEvents,
  deleteFirestoreEvent,
  subscribeToEventCounts
} from '@/lib/pureFirestoreEventService'
import { formatDate } from '@/lib/utils'
import { subscribeToAdminFlags, setLiveResponsesEnabled } from '@/lib/firebaseServices'

export function SimpleProtectedEventAdmin() {
  const { user, logout } = useAdminAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [eventCounts, setEventCounts] = useState({
    upcoming: 0,
    live: 0,
    completed: 0,
    total: 0
  })
  const [loading, setLoading] = useState(true)
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [activeTab, setActiveTab] = useState<'events' | 'applications'>('events')
  const [liveResponsesEnabled, setLiveResponsesEnabledState] = useState(true)

  // Load events with real-time updates
  useEffect(() => {
    let eventsUnsubscribe: (() => void) | null = null
    let countsUnsubscribe: (() => void) | null = null
    let flagsUnsubscribe: (() => void) | null = null

    const setupRealtimeEvents = async () => {
      try {
        console.log('🔥 Setting up real-time events for admin...')

        // Set up real-time events listener
        eventsUnsubscribe = subscribeToFirestoreEvents(
          (updatedEvents) => {
            console.log(`🔄 Admin events update: ${updatedEvents.length} events`)
            setEvents(updatedEvents)
            setLoading(false)
          },
          (error) => {
            console.error('❌ Admin events listener error:', error)
            setLoading(false)
          }
        )

        // Set up real-time event counts listener
        countsUnsubscribe = subscribeToEventCounts(
          (counts) => {
            console.log('🔄 Admin event counts update:', counts)
            setEventCounts(counts)
          }
        )

        // Admin flags (live responses toggle)
        flagsUnsubscribe = subscribeToAdminFlags((flags) => {
          setLiveResponsesEnabledState(flags.liveResponsesEnabled)
        })

        console.log('✅ Admin real-time events setup complete')

      } catch (error) {
        console.error('❌ Error setting up admin real-time events:', error)
        setLoading(false)
      }
    }

    setupRealtimeEvents()

    // Cleanup listeners
    return () => {
      eventsUnsubscribe?.()
      countsUnsubscribe?.()
      flagsUnsubscribe?.()
    }
  }, [])

  const handleCreateEvent = () => {
    setEditingEvent(null)
    setShowEventForm(true)
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setShowEventForm(true)
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        console.log('🔥 Admin deleting event from Firestore:', eventId)
        await deleteFirestoreEvent(eventId)
        console.log('✅ Event deleted - Real-time listeners will update UI')
      } catch (error) {
        console.error('❌ Error deleting event:', error)
        alert('Failed to delete event. Please try again.')
      }
    }
  }

  const handleEventFormSave = () => {
    setShowEventForm(false)
    setEditingEvent(null)
    // Real-time listeners will automatically update the events list
  }

  const handleEventFormCancel = () => {
    setShowEventForm(false)
    setEditingEvent(null)
  }

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event)
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Fixed Header with User Info */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 lg:space-x-4">
                <h1 className="text-lg lg:text-2xl font-orbitron font-bold gradient-text">
                  AURA Admin
                </h1>
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${liveResponsesEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                  <span className={liveResponsesEnabled ? 'text-green-400' : 'text-gray-400'}>
                    {liveResponsesEnabled ? '🔥 Live' : '⏸️ Paused'}
                  </span>
                  <span className="text-gray-400">• {eventCounts.total} events</span>
                </div>
              </div>
              
              {/* User Info & Actions */}
              <div className="flex items-center space-x-1 lg:space-x-4">
                <div className="hidden md:flex items-center space-x-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                {/* Live responses toggle */}
                <button
                  onClick={async () => {
                    try {
                      await setLiveResponsesEnabled(!liveResponsesEnabled)
                    } catch (err) {
                      console.error('Failed to toggle live responses:', err)
                    }
                  }}
                  className={`hidden md:flex items-center space-x-2 px-2 lg:px-4 py-2 rounded-lg text-white text-sm transition-colors ${liveResponsesEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                  title={liveResponsesEnabled ? 'Stop real-time responses' : 'Start real-time responses'}
                >
                  <span>{liveResponsesEnabled ? 'Stop Responses' : 'Start Responses'}</span>
                </button>
                <a
                  href="/"
                  className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Website</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-orbitron font-bold gradient-text mb-4">
              AURA Admin Dashboard
            </h2>
            <p className="text-gray-400 font-urbanist">
              Manage events and membership applications in real-time
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="glass p-1 rounded-lg flex space-x-1">
              <button
                onClick={() => setActiveTab('events')}
                className={`px-6 py-3 rounded-lg font-syne font-semibold transition-all duration-300 ${
                  activeTab === 'events'
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-6 py-3 rounded-lg font-syne font-semibold transition-all duration-300 ${
                  activeTab === 'applications'
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Membership Applications
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'events' ? (
            <>
              {/* Form Test Panel */}
              <FormTestPanel />

              {/* Create Event Button */}
              <div className="flex justify-center mb-8 gap-3">
                <button
                  onClick={handleCreateEvent}
                  className="btn-neon glass px-8 py-4 rounded-lg font-syne font-semibold text-white border border-neon-blue hover:bg-neon-blue/20 transition-all duration-300 flex items-center space-x-3"
                >
                  <Plus className="w-6 h-6" />
                  <span>Create New Event</span>
                </button>
              </div>

          {/* Event Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="glass p-6 rounded-xl text-center">
              <Calendar className="w-8 h-8 text-neon-blue mx-auto mb-2" />
              <div className="text-2xl font-orbitron font-bold text-white">{eventCounts.upcoming}</div>
              <div className="text-gray-400 font-urbanist text-sm">Upcoming</div>
            </div>
            <div className="glass p-6 rounded-xl text-center">
              <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-orbitron font-bold text-white">{eventCounts.live}</div>
              <div className="text-gray-400 font-urbanist text-sm">Live</div>
            </div>
            <div className="glass p-6 rounded-xl text-center">
              <CheckCircle className="w-8 h-8 text-neon-green mx-auto mb-2" />
              <div className="text-2xl font-orbitron font-bold text-white">{eventCounts.completed}</div>
              <div className="text-gray-400 font-urbanist text-sm">Completed</div>
            </div>
            <div className="glass p-6 rounded-xl text-center">
              <Calendar className="w-8 h-8 text-neon-purple mx-auto mb-2" />
              <div className="text-2xl font-orbitron font-bold text-white">{eventCounts.total}</div>
              <div className="text-gray-400 font-urbanist text-sm">Total</div>
            </div>
          </div>

          {/* Events List */}
          {events.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-syne font-bold text-white mb-4">No Events Yet</h3>
              <p className="text-gray-400 font-urbanist mb-6">Create your first event to get started</p>
              <button
                onClick={handleCreateEvent}
                className="btn-neon glass px-6 py-3 rounded-lg font-syne font-semibold text-white border border-neon-blue hover:bg-neon-blue/20 transition-all duration-300"
              >
                Create First Event
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  {event.imageUrl && (
                    <SafeImage
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-syne font-bold text-white truncate">
                      {event.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'live' ? 'bg-red-500 text-white animate-pulse' :
                      event.status === 'upcoming' ? 'bg-blue-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {event.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 font-urbanist text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="text-xs text-gray-500 mb-4 space-y-1">
                    <p className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(event.date)}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewEvent(event)}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white text-sm transition-colors flex items-center justify-center space-x-1"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
            </>
          ) : (
            <div className="space-y-8">
              <MembershipApplicationsPanel />
            </div>
          )}
        </div>
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <PureFirestoreEventForm
          event={editingEvent || undefined}
          onSave={handleEventFormSave}
          onCancel={handleEventFormCancel}
        />
      )}

      {/* Event View Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}