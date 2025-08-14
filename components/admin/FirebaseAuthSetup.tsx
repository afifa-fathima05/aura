'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, UserPlus, CheckCircle, AlertCircle } from 'lucide-react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function FirebaseAuthSetup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setMessageType('error')
      return
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters')
      setMessageType('error')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setMessage(`User created successfully: ${userCredential.user.email}`)
      setMessageType('success')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      console.error('Error creating user:', error)
      setMessage(error.message || 'Failed to create user')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass rounded-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-aura-primary to-aura-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-orbitron font-bold text-white mb-2">
            Firebase Auth Setup
          </h2>
          <p className="text-gray-400 font-urbanist">
            Create admin users for the AURA dashboard
          </p>
        </div>

        <form onSubmit={handleCreateUser} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist"
              placeholder="admin@aura.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist"
              placeholder="Minimum 6 characters"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist"
              placeholder="Confirm your password"
            />
          </div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center space-x-2 p-4 rounded-lg ${
                messageType === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                  : 'bg-red-500/20 border border-red-500/30 text-red-400'
              }`}
            >
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-urbanist">{message}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-neon glass px-6 py-4 rounded-lg font-syne font-semibold text-white border border-aura-primary hover:bg-aura-primary/20 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating User...</span>
              </>
            ) : (
              <>
                <User className="w-5 h-5" />
                <span>Create Admin User</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-sm font-syne font-bold text-blue-400 mb-2">Important Notes:</h3>
          <ul className="text-xs text-blue-300 font-urbanist space-y-1">
            <li>• This creates a Firebase Authentication user</li>
            <li>• Use this email/password to login to the admin dashboard</li>
            <li>• Make sure to use a secure password</li>
            <li>• You can create multiple admin users if needed</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}