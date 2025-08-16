// Pure Firebase Firestore Event Service - No localStorage, Real-time only

import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  onSnapshot,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Event } from '@/types'

const EVENTS_COLLECTION = 'events'

// Convert Firestore document to Event type
const convertFirestoreEvent = (doc: any): Event => {
  const data = doc.data()
  
  // Safely convert date
  let eventDate: Date
  try {
    if (data.date?.toDate) {
      eventDate = data.date.toDate()
    } else if (data.date) {
      eventDate = new Date(data.date)
    } else {
      eventDate = new Date()
    }
    
    // Validate the date
    if (isNaN(eventDate.getTime())) {
      eventDate = new Date()
    }
  } catch (error) {
    console.warn('Error converting event date:', error)
    eventDate = new Date()
  }
  
  const convertedEvent = {
    id: doc.id,
    title: data.title || '',
    description: data.description || '',
    date: eventDate,
    location: data.location || '',
    imageUrl: data.imageUrl || '',
    status: data.status || 'upcoming',
    createdAt: data.createdAt?.toDate?.() || new Date(),
    updatedAt: data.updatedAt?.toDate?.() || new Date(),
    // Additional fields
    details: data.details || undefined,
    agenda: data.agenda || undefined,
    rules: data.rules || undefined,
    registrationLink: data.registrationLink || undefined,
    coordinators: Array.isArray(data.coordinators) ? data.coordinators : (data.coordinators ? [String(data.coordinators)] : undefined),
    likes: data.likes || 0
  }



  return convertedEvent
}

// Get all events from Firestore (one-time read)
export const getFirestoreEvents = async (): Promise<Event[]> => {
  try {
    console.log('🔥 Fetching events from Firestore...')
    
    const eventsRef = collection(db, EVENTS_COLLECTION)
    const q = query(eventsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const events: Event[] = []
    querySnapshot.forEach((doc) => {
      events.push(convertFirestoreEvent(doc))
    })
    
    console.log(`✅ Fetched ${events.length} events from Firestore`)
    return events
    
  } catch (error) {
    console.error('❌ Error fetching Firestore events:', error)
    throw error
  }
}

// Get events by status (one-time read)
export const getFirestoreEventsByStatus = async (status: string): Promise<Event[]> => {
  try {
    console.log(`🔥 Fetching ${status} events from Firestore...`)
    
    const eventsRef = collection(db, EVENTS_COLLECTION)
    const q = query(
      eventsRef, 
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    const events: Event[] = []
    querySnapshot.forEach((doc) => {
      events.push(convertFirestoreEvent(doc))
    })
    
    console.log(`✅ Fetched ${events.length} ${status} events`)
    return events
    
  } catch (error) {
    console.error(`❌ Error fetching ${status} events:`, error)
    throw error
  }
}

// Add new event to Firestore
export const addFirestoreEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    console.log('🔥 Adding event to Firestore...', eventData.title)
    
    const eventsRef = collection(db, EVENTS_COLLECTION)
    const now = new Date()
    
    const dataToSave = {
      ...eventData,
      createdAt: now,
      updatedAt: now
    }
    

    
    const docRef = await addDoc(eventsRef, dataToSave)
    
    console.log('✅ Event added to Firestore with ID:', docRef.id)
    return docRef.id
    
  } catch (error) {
    console.error('❌ Error adding event to Firestore:', error)
    throw error
  }
}

// Update event in Firestore
export const updateFirestoreEvent = async (eventId: string, updates: Partial<Event>): Promise<void> => {
  try {
    console.log('🔥 Updating event in Firestore:', eventId)
    
    const dataToUpdate = {
      ...updates,
      updatedAt: new Date()
    }
    

    
    const eventRef = doc(db, EVENTS_COLLECTION, eventId)
    await updateDoc(eventRef, dataToUpdate)
    
    console.log('✅ Event updated in Firestore')
    
  } catch (error) {
    console.error('❌ Error updating event in Firestore:', error)
    throw error
  }
}

// Delete event from Firestore
export const deleteFirestoreEvent = async (eventId: string): Promise<void> => {
  try {
    console.log('🔥 Deleting event from Firestore:', eventId)
    
    const eventRef = doc(db, EVENTS_COLLECTION, eventId)
    await deleteDoc(eventRef)
    
    console.log('✅ Event deleted from Firestore')
    
  } catch (error) {
    console.error('❌ Error deleting event from Firestore:', error)
    throw error
  }
}

// Real-time listener for all events
export const subscribeToFirestoreEvents = (
  callback: (events: Event[]) => void,
  onError?: (error: Error) => void
) => {
  try {
    console.log('🔥 Setting up real-time listener for all events...')
    
    const eventsRef = collection(db, EVENTS_COLLECTION)
    const q = query(eventsRef, orderBy('createdAt', 'desc'))
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const events: Event[] = []
        querySnapshot.forEach((doc) => {
          events.push(convertFirestoreEvent(doc))
        })
        
        console.log(`🔄 Real-time update: ${events.length} events`)
        callback(events)
      }, 
      (error) => {
        console.error('❌ Error in real-time listener:', error)
        onError?.(error)
      }
    )
    
    return unsubscribe
    
  } catch (error) {
    console.error('❌ Error setting up real-time listener:', error)
    onError?.(error as Error)
    return () => {} // Return empty function if setup fails
  }
}

// Real-time listener for events by status
export const subscribeToFirestoreEventsByStatus = (
  status: string,
  callback: (events: Event[]) => void,
  onError?: (error: Error) => void
) => {
  try {
    console.log(`🔥 Setting up real-time listener for ${status} events...`)
    
    const eventsRef = collection(db, EVENTS_COLLECTION)
    const q = query(
      eventsRef, 
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    )
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const events: Event[] = []
        querySnapshot.forEach((doc) => {
          events.push(convertFirestoreEvent(doc))
        })
        
        console.log(`🔄 Real-time update: ${events.length} ${status} events`)
        callback(events)
      }, 
      (error) => {
        console.error(`❌ Error in ${status} events listener:`, error)
        onError?.(error)
      }
    )
    
    return unsubscribe
    
  } catch (error) {
    console.error(`❌ Error setting up ${status} events listener:`, error)
    onError?.(error as Error)
    return () => {}
  }
}

// Get event count by status (real-time)
export const subscribeToEventCounts = (
  callback: (counts: { upcoming: number; live: number; completed: number; total: number }) => void,
  onError?: (error: Error) => void
) => {
  try {
    console.log('🔥 Setting up real-time event counts listener...')
    
    const eventsRef = collection(db, EVENTS_COLLECTION)
    const q = query(eventsRef)
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        let upcoming = 0
        let live = 0
        let completed = 0
        
        querySnapshot.forEach((doc) => {
          const status = doc.data().status
          switch (status) {
            case 'upcoming':
              upcoming++
              break
            case 'live':
              live++
              break
            case 'completed':
              completed++
              break
          }
        })
        
        const total = upcoming + live + completed
        
        console.log(`🔄 Event counts: ${upcoming} upcoming, ${live} live, ${completed} completed, ${total} total`)
        callback({ upcoming, live, completed, total })
      }, 
      (error) => {
        console.error('❌ Error in event counts listener:', error)
        onError?.(error)
      }
    )
    
    return unsubscribe
    
  } catch (error) {
    console.error('❌ Error setting up event counts listener:', error)
    onError?.(error as Error)
    return () => {}
  }
}

// Test Firestore connection
export const testFirestoreConnection = async (): Promise<{
  success: boolean
  message: string
  eventCount?: number
}> => {
  try {
    console.log('🧪 Testing Firestore connection...')
    
    const events = await getFirestoreEvents()
    
    return {
      success: true,
      message: `Firestore connection successful! Found ${events.length} events.`,
      eventCount: events.length
    }
    
  } catch (error) {
    console.error('❌ Firestore connection test failed:', error)
    
    return {
      success: false,
      message: `Firestore connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

// Initialize Firestore with sample data (if empty)
export const initializeFirestoreWithSampleData = async (): Promise<{
  success: boolean
  message: string
  created: number
}> => {
  try {
    console.log('🔥 Checking if Firestore needs sample data...')
    
    const existingEvents = await getFirestoreEvents()
    
    if (existingEvents.length > 0) {
      return {
        success: true,
        message: `Firestore already has ${existingEvents.length} events. No sample data needed.`,
        created: 0
      }
    }
    
    console.log('📝 Creating sample events in Firestore...')
    
    const sampleEvents: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        title: 'Welcome to AURA',
        description: 'Join us for an exclusive welcome event where you\'ll meet fellow members and discover what AURA has to offer.',
        date: new Date('2024-12-25'),
        location: 'AURA Club Lounge',
        imageUrl: '',
        status: 'upcoming' as const,
        agenda: '6:00 PM - Welcome & Registration\n6:30 PM - Opening Presentation\n7:00 PM - Networking Session\n7:30 PM - Club Tour\n8:00 PM - Light Refreshments\n8:30 PM - Q&A Session\n9:00 PM - Event Conclusion',
        registrationLink: 'https://forms.google.com/welcome-to-aura',
        details: 'This is a special welcome event designed for new members to get acquainted with the AURA community. You\'ll have the opportunity to meet our team, learn about upcoming events, and connect with fellow members.\n\nThe event includes:\n• Welcome presentation\n• Networking session\n• Light refreshments\n• Club tour',
        rules: [
          'RSVP required by December 20th',
          'Business casual dress code',
          'Members only event',
          'Please bring your membership card',
          'No outside food or beverages allowed'
        ],
        likes: 15
      },
      {
        title: 'Networking Night',
        description: 'Connect with industry leaders and expand your professional network in an elegant setting.',
        date: new Date('2024-12-30'),
        location: 'AURA Rooftop Terrace',
        imageUrl: '',
        status: 'upcoming' as const,
        agenda: '7:00 PM - Welcome Reception\n7:30 PM - Industry Leader Presentations\n8:00 PM - Speed Networking Sessions\n8:30 PM - Premium Cocktails & Canapés\n9:00 PM - Live Jazz Performance\n9:30 PM - Open Networking\n10:30 PM - Event Wrap-up',
        registrationLink: 'https://forms.google.com/networking-night',
        details: 'An exclusive networking event bringing together professionals from various industries. This is your chance to make meaningful connections and expand your professional circle.\n\nEvent highlights:\n• Industry leader presentations\n• Speed networking sessions\n• Premium cocktails and canapés\n• Live jazz music',
        rules: [
          'Professional attire required',
          'Bring business cards for networking',
          'Limited to 50 attendees',
          'Age 21+ for alcoholic beverages',
          'Photography permitted in designated areas only'
        ],
        likes: 28
      },
      {
        title: 'New Year Gala',
        description: 'Celebrate the new year in style with live music, gourmet dining, and exclusive entertainment.',
        date: new Date('2024-12-31'),
        location: 'AURA Grand Ballroom',
        imageUrl: '',
        status: 'upcoming' as const,
        agenda: '7:00 PM - Cocktail Reception\n8:00 PM - 5-Course Gourmet Dinner\n10:00 PM - Live Band Performance\n11:00 PM - Dancing & Entertainment\n11:55 PM - Champagne Toast Preparation\n12:00 AM - Midnight Celebration\n12:30 AM - DJ & Dancing\n2:00 AM - Event Conclusion',
        registrationLink: 'https://forms.google.com/new-year-gala',
        details: 'Ring in the New Year with AURA\'s most prestigious event of the year. Join us for an unforgettable evening of elegance, entertainment, and celebration.\n\nWhat to expect:\n• 5-course gourmet dinner\n• Live band and DJ\n• Champagne toast at midnight\n• Dancing until 2 AM\n• Professional photography',
        rules: [
          'Black-tie dress code strictly enforced',
          'Tickets must be purchased in advance',
          'No refunds after December 25th',
          'Valid ID required for entry',
          'Valet parking available',
          'No outside decorations or party favors'
        ],
        likes: 42
      }
    ]
    
    let created = 0
    for (const eventData of sampleEvents) {
      try {
        await addFirestoreEvent(eventData)
        created++
      } catch (error) {
        console.error('❌ Error creating sample event:', eventData.title, error)
      }
    }
    
    console.log(`✅ Created ${created} sample events in Firestore`)
    
    return {
      success: true,
      message: `Successfully created ${created} sample events in Firestore.`,
      created
    }
    
  } catch (error) {
    console.error('❌ Error initializing Firestore with sample data:', error)
    
    return {
      success: false,
      message: `Failed to initialize sample data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      created: 0
    }
  }
}