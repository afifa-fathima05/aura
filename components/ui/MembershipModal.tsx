'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Phone, GraduationCap, Heart, Send } from 'lucide-react'
import { addMembershipApplication } from '@/lib/firebaseServices'

interface MembershipModalProps {
  isOpen: boolean
  onClose: () => void
}



const yearOptions = [
  'First Year',
  'Second Year',
  'Third Year',
  'Fourth Year'
]

const sectionOptions = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I','J','K','L','M','N','O','P',
]

// Single-choice participation options for the join form
const participationOptions = [
  'Dance',
  'Singing',
  'Photography',
  'Tamil Related Events',
  'Drawing & Painting',
  'Instrumental Music',
  'Poetry',
  'Others'
] as const

type ParticipationOption = typeof participationOptions[number]

export function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    registerNumber: '',
    year: '',
    section: '',
    department: 'AI&DS',
    email: '',
    participation: '' as ParticipationOption | '',
    otherParticipation: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }




  // Ensure we are authenticated (anonymous is fine) so stricter Firestore rules also pass
  const ensureAuthenticated = async () => {
    try {
      const { auth } = await import('@/lib/firebase')
      const { signInAnonymously } = await import('firebase/auth')
      if (!auth.currentUser) {
        await signInAnonymously(auth)
      }
    } catch (e) {
      // If anonymous sign-in is disabled, continue and rely on public-write rules
      console.warn('Anonymous auth not available, proceeding without it')
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      console.log('🚀 Submitting membership application:', formData)
      
      // Validate required fields
      if (!formData.name.trim() || !formData.rollNumber.trim() || !formData.registerNumber.trim() || 
          !formData.year.trim() || !formData.section.trim() || !formData.email.trim() || !formData.participation) {
        throw new Error('Please fill in all required fields')
      }

      // Normalize participation (use other text if "Others" is selected)
      const participationFinal = formData.participation === 'Others'
        ? (formData.otherParticipation || 'Others')
        : formData.participation
      
      // Force department to AI&DS for now
      const department = 'AI&DS'
      


      // Attempt to ensure auth to satisfy rules that require request.auth != null
      await ensureAuthenticated()
      

      // Check admin flag whether responses are enabled
      let responsesAllowed = true
      try {
        const { doc, getDoc } = await import('firebase/firestore')
        const { db } = await import('@/lib/firebase')
        const ref = doc(db, 'admin_flags', 'global')
        const snap = await getDoc(ref)
        responsesAllowed = (snap.data() as any)?.liveResponsesEnabled !== false
      } catch (e) {
        console.warn('Could not read admin flags, defaulting to allowed')
      }

      if (!responsesAllowed) {
        throw new Error('Submissions are currently paused by admin. Please try again later.')
      }

      const result = await addMembershipApplication({
        ...formData,
        department,
        participation: participationFinal!,
        name: formData.name.trim(),
        rollNumber: formData.rollNumber.trim(),
        registerNumber: formData.registerNumber.trim(),
        email: formData.email.trim()
      })
      
      console.log('✅ Membership application submitted successfully with ID:', result)
      setSubmitted(true)
      
      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          rollNumber: '',
          registerNumber: '',
          year: '',
          section: '',
          department: 'AI&DS',
          email: '',
          participation: '',
          otherParticipation: ''
        })
        onClose()
      }, 3000)
    } catch (error: any) {
      console.error('❌ Error submitting membership application:', error)

      // Friendlier message for permission errors
      const message = error?.code === 'permission-denied'
        ? 'Submissions are blocked by Firestore security rules. Please enable anonymous auth or publish the provided rules.'
        : (error.message || 'Failed to submit application. Please try again.')
      setError(message)

      setTimeout(() => setError(''), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
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
          className="glass p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-orbitron font-bold gradient-text">
              Join AURA
            </h2>
            <button
              onClick={onClose}
              className="p-2 glass rounded-full text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 mx-auto mb-4 text-neon-green"
              >
                <Heart className="w-16 h-16" />
              </motion.div>
              <h3 className="text-xl font-syne font-bold text-white mb-2">
                Application Submitted!
              </h3>
              <p className="text-gray-400 font-urbanist">
                Thank you for your interest in joining AURA. We'll review your application and get back to you soon!
              </p>
            </motion.div>
          ) : (
            <>
              {/* Department availability note */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/40 rounded-lg text-yellow-300 font-urbanist"
              >
                ⚠️ Note: AURA Club is exclusive to AI & DS Dept for now. Expansion to other departments may come soon — stay tuned!
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 font-urbanist"
                >
                  ❌ {error}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                    Gmail ID *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
                    placeholder="Enter your Gmail ID"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
                    placeholder="Enter your roll number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                    Register Number *
                  </label>
                  <input
                    type="text"
                    name="registerNumber"
                    value={formData.registerNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
                    placeholder="Enter your register number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                    Academic Year *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
                  >
                    <option value="">Select your year</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year} className="bg-gray-800">{year}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                    Section *
                  </label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
                  >
                    <option value="">Select your section</option>
                    {sectionOptions.map(section => (
                      <option key={section} value={section} className="bg-gray-800">{section}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Participation - single choice with optional 'Others' input */}
              <div>
                <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                  I like to participate in *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {participationOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/20 cursor-pointer hover:bg-white/10 transition">
                      <input
                        type="radio"
                        name="participation"
                        value={opt}
                        checked={formData.participation === opt}
                        onChange={handleInputChange}
                        required
                        className="accent-neon-blue"
                      />
                      <span className="text-white font-urbanist">{opt}</span>
                    </label>
                  ))}
                </div>
                {formData.participation === 'Others' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="otherParticipation"
                      value={formData.otherParticipation}
                      onChange={handleInputChange}
                      placeholder="Please specify"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all duration-300 font-urbanist"
                    />
                  </div>
                )}
              </div>

              {/* Department (AI&DS only; others muted) */}
              <div>
                <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                  Department *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Active selectable option */}
                  <label className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/20 cursor-pointer hover:bg-white/10 transition">
                    <input
                      type="radio"
                      name="department"
                      value="AI&DS"
                      checked={formData.department === 'AI&DS'}
                      onChange={handleInputChange}
                      className="accent-neon-blue"
                    />
                    <span className="text-white font-urbanist">AI&DS</span>
                  </label>

                  {/* Disabled placeholders */}
                  {['AI&ML','CSE','IT','CSBS','EEE','ECE','MECH'].map((dept) => (
                    <div key={dept} className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                      <input type="radio" disabled className="opacity-40" />
                      <span className="text-gray-500 font-urbanist">{dept}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-400 font-urbanist">
                  Other departments coming soon.
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-neon glass px-6 py-4 rounded-lg font-syne font-semibold text-white border border-neon-blue hover:bg-neon-blue/20 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner w-5 h-5"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Application</span>
                  </>
                )}
              </motion.button>
            </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}