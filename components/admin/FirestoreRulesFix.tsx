'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Copy, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react'

export function FirestoreRulesFix() {
  const [copied, setCopied] = useState(false)

  const firestoreRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write events
    match /events/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Allow authenticated users to read/write contacts
    match /contacts/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Allow authenticated users to read/write memberships
    match /memberships/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Allow public read access to events for the website
    match /events/{document} {
      allow read: if true;
    }
  }
}`

  const handleCopyRules = async () => {
    try {
      await navigator.clipboard.writeText(firestoreRules)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy rules:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass rounded-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-aura-primary to-aura-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-orbitron font-bold text-white mb-2">
            Firestore Security Rules
          </h2>
          <p className="text-gray-400 font-urbanist">
            Configure your Firestore database security rules
          </p>
        </div>

        {/* Warning */}
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <h3 className="text-sm font-syne font-bold text-yellow-400 mb-1">
                Security Rules Required
              </h3>
              <p className="text-xs text-yellow-300 font-urbanist">
                Your Firestore database needs proper security rules to allow authenticated access.
                Copy the rules below and apply them in your Firebase Console.
              </p>
            </div>
          </div>
        </div>

        {/* Rules Code Block */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-syne font-bold text-white">
              Firestore Security Rules
            </h3>
            <motion.button
              onClick={handleCopyRules}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-aura-primary/20 border border-aura-primary rounded-lg text-aura-primary hover:bg-aura-primary/30 transition-all duration-300"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-urbanist">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm font-urbanist">Copy Rules</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="bg-gray-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
              {firestoreRules}
            </pre>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-syne font-bold text-white mb-4">
              How to Apply These Rules:
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-aura-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                  1
                </div>
                <div>
                  <p className="text-gray-300 font-urbanist">
                    Go to the <strong>Firebase Console</strong> and select your project
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-aura-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                  2
                </div>
                <div>
                  <p className="text-gray-300 font-urbanist">
                    Navigate to <strong>Firestore Database</strong> → <strong>Rules</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-aura-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                  3
                </div>
                <div>
                  <p className="text-gray-300 font-urbanist">
                    Replace the existing rules with the rules above
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-aura-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                  4
                </div>
                <div>
                  <p className="text-gray-300 font-urbanist">
                    Click <strong>Publish</strong> to apply the new rules
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Link */}
          <div className="flex justify-center">
            <motion.a
              href="https://console.firebase.google.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-aura-primary to-aura-secondary rounded-lg text-white font-syne font-semibold hover:shadow-lg hover:shadow-aura-primary/25 transition-all duration-300"
            >
              <span>Open Firebase Console</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-sm font-syne font-bold text-blue-400 mb-2">What These Rules Do:</h3>
          <ul className="text-xs text-blue-300 font-urbanist space-y-1">
            <li>• Allow authenticated users to read/write events, contacts, and memberships</li>
            <li>• Allow public read access to events (for the website)</li>
            <li>• Secure your database from unauthorized access</li>
            <li>• Enable the admin dashboard to function properly</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}