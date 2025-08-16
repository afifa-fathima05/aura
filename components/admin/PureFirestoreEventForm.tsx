'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Image, Save, X, Zap } from 'lucide-react'
import { Event } from '@/types'
import { addFirestoreEvent, updateFirestoreEvent } from '@/lib/pureFirestoreEventService'
import { guaranteedFastUpload } from '@/lib/uploadService'


interface PureFirestoreEventFormProps {
  event?: Event
  onSave: () => void
  onCancel: () => void
}

export function PureFirestoreEventForm({ event, onSave, onCancel }: PureFirestoreEventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: (() => {
      if (event?.date) {
        try {
          const dateObj = event.date instanceof Date ? event.date : new Date(event.date as any)
          return !isNaN(dateObj.getTime()) ? dateObj.toISOString().split('T')[0] : ''
        } catch (error) {
          console.warn('Error converting event date:', error)
          return ''
        }
      }
      return ''
    })(),
    location: event?.location || '',
    imageUrl: event?.imageUrl || '',
    status: event?.status || 'upcoming',
    agenda: event?.agenda || '',
    registrationLink: event?.registrationLink || '',
    details: event?.details || '',
    rules: event?.rules?.join('\n') || '',
    likes: event?.likes || 0,
    coordinators: event?.coordinators?.join('\n') || ''
  })
  
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(event?.imageUrl || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setUploadProgress(0)

    try {
      let imageUrl = formData.imageUrl

      // Upload image if new file selected
      if (imageFile) {
        setUploading(true)
        console.log('🔥 Uploading image for Firestore event...')
        
        imageUrl = await guaranteedFastUpload(imageFile, (progress) => {
          setUploadProgress(progress)
        })
        
        console.log('✅ Image uploaded:', imageUrl)
        setUploading(false)
      }

      const eventData = {
        ...formData,
        date: new Date(formData.date),
        imageUrl,
        rules: formData.rules ? formData.rules.split('\n').filter(rule => rule.trim()) : [],
        coordinators: formData.coordinators ? formData.coordinators.split('\n').map(s => s.trim()).filter(Boolean) : [],
        likes: Number(formData.likes)
      }

      if (event?.id) {
        // Update existing event
        console.log('🔥 Updating Firestore event:', event.id)
        await updateFirestoreEvent(event.id, eventData)
        console.log('✅ Event updated in Firestore - Real-time listeners will update UI')
      } else {
        // Create new event
        console.log('🔥 Creating new Firestore event...')
        const eventId = await addFirestoreEvent(eventData)
        console.log('✅ Event created in Firestore with ID:', eventId, '- Real-time listeners will update UI')
      }

      // Close form - real-time listeners will update the UI automatically
      onSave()
      
    } catch (error) {
      console.error('❌ Error saving event to Firestore:', error)
      alert(`Failed to save event: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
      setUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div className="glass p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-orbitron font-bold gradient-text">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
              placeholder="Enter event title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist resize-none"
              placeholder="Enter event description"
            />
          </div>

          {/* Date and Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
              placeholder="Enter event location"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
            >
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Agenda */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              Event Agenda
            </label>
            <textarea
              name="agenda"
              value={formData.agenda}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist resize-none"
              placeholder="Enter event agenda (what will happen during the event)"
            />
          </div>

          {/* Registration Link */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              Registration Link (Google Form)
            </label>
            <input
              type="url"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
              placeholder="https://forms.google.com/..."
            />
          </div>

          {/* Event Details */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              Event Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist resize-none"
              placeholder="Enter detailed event information"
            />
          </div>

          {/* Rules */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              Event Rules (one per line)
            </label>
            <textarea
              name="rules"
              value={formData.rules}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist resize-none"
              placeholder="Enter event rules (one per line)&#10;Example:&#10;RSVP required&#10;Business casual dress code&#10;No outside food allowed"
            />
          </div>

          {/* Coordinators */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              Event Coordinators (Name - Phone, one per line)
            </label>
            <textarea
              name="coordinators"
              value={formData.coordinators}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist resize-none"
              placeholder="Example:&#10;Monish Meghanathan - 9791123916&#10;Jane Doe - 9876543210"
            />
          </div>

          {/* Likes */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              Initial Likes Count
            </label>
            <input
              type="number"
              name="likes"
              value={formData.likes}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
              placeholder="0"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              <Image className="w-4 h-4 inline mr-2" />
              Event Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neon-blue file:text-black file:font-semibold hover:file:bg-neon-blue/80 transition-all duration-300"
            />
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Upload Progress */}
            {uploading && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Uploading to Cloudinary...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-neon-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 px-6 py-3 bg-neon-blue hover:bg-neon-blue/80 rounded-lg text-black font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="loading-spinner w-5 h-5"></div>
                  <span>Saving to Firestore...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{event ? 'Update Event' : 'Create Event'}</span>
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={onCancel}
              disabled={saving || uploading}
              className="px-6 py-3 glass border border-gray-600 hover:border-gray-500 rounded-lg text-gray-300 hover:text-white transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Real-time Firestore Indicator */}
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Zap className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-green-400 font-medium text-sm">Real-time Firestore</p>
              <p className="text-gray-400 text-xs">
                Changes will appear instantly across all devices and browsers
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}