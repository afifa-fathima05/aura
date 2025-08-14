// This is a utility script to seed initial data to Firebase
// Run this manually in the browser console or create a separate Node.js script

import { addFirestoreEvent } from '../lib/pureFirestoreEventService'

const sampleEvents = [
  {
    title: 'Digital Art Showcase 2024',
    description: 'Experience the future of digital creativity with immersive installations, interactive exhibits, and cutting-edge technology.',
    date: new Date('2024-03-15'),
    location: 'Main Auditorium',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    status: 'upcoming' as const,
    externalLink: 'https://aura.club/events/digital-art-showcase'
  },
  {
    title: 'AI & Creativity Workshop',
    description: 'Learn how artificial intelligence is revolutionizing creative processes and discover new tools for artistic expression.',
    date: new Date('2024-02-28'),
    location: 'Innovation Lab',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    status: 'live' as const,
    externalLink: 'https://aura.club/events/ai-creativity-workshop'
  },
  {
    title: 'VR Experience Night',
    description: 'Dive into virtual worlds and explore the boundaries between reality and imagination.',
    date: new Date('2024-04-10'),
    location: 'VR Studio',
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800',
    status: 'upcoming' as const,
    externalLink: 'https://aura.club/events/vr-experience-night'
  }
]

// Function to seed events (call this manually)
export const seedEvents = async () => {
  try {
    for (const event of sampleEvents) {
      await addFirestoreEvent(event)
      console.log(`Added event: ${event.title}`)
    }
    console.log('All sample events added successfully!')
  } catch (error) {
    console.error('Error seeding events:', error)
  }
}

// Uncomment and run this in browser console to seed data:
// seedEvents()