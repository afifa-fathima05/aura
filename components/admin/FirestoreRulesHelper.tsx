'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Copy, Check, AlertTriangle } from 'lucide-react'

export function FirestoreRulesHelper() {
  const [copied, setCopied] = useState(false)

  const firestoreRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Events collection - read for all, write for authenticated users
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Contact submissions - write for all, read for authenticated users
    match /contact_submissions/{submissionId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    // Admin users collection - only authenticated users
    match /admin_users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(firestoreRules)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-neon-blue" />
          <h3 className="text-lg font-orbitron font-semibold text-white">
            Firestore Security Rules
          </h3>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-2 px-3 py-2 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg text-neon-blue transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy Rules</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-black/30 rounded-lg p-4 mb-4">
        <pre className="text-sm text-gray-300 overflow-x-auto">
          <code>{firestoreRules}</code>
        </pre>
      </div>

      <div className="flex items-start space-x-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-yellow-400 font-medium text-sm mb-1">
            Important Setup Instructions:
          </p>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>1. Go to Firebase Console → Firestore Database → Rules</li>
            <li>2. Replace the existing rules with the code above</li>
            <li>3. Click "Publish" to apply the new rules</li>
            <li>4. Test the rules to ensure they work correctly</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}