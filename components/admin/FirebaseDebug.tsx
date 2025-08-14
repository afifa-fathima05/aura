'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, RefreshCw, Database, Key } from 'lucide-react'
import { auth, db } from '@/lib/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

interface TestResult {
  success: boolean
  message: string
  code?: string
}

export function FirebaseDebug() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<Record<string, TestResult>>({})
  const [testEmail, setTestEmail] = useState('admin@aura.com')
  const [testPassword, setTestPassword] = useState('AuraAdmin123!')

  const runDiagnostics = async () => {
    setTesting(true)
    setResults({})

    const tests = [
      {
        name: 'Firebase Config',
        test: async () => {
          const config = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          }
          
          const missing = Object.entries(config).filter(([key, value]) => !value)
          if (missing.length > 0) {
            throw new Error(`Missing config: ${missing.map(([key]) => key).join(', ')}`)
          }
          
          return 'All Firebase config variables present'
        }
      },
      {
        name: 'Auth Instance',
        test: async () => {
          if (!auth) throw new Error('Auth instance not initialized')
          if (!auth.app) throw new Error('Auth app not connected')
          return `Auth connected to project: ${auth.app.options.projectId}`
        }
      },
      {
        name: 'Firestore Instance',
        test: async () => {
          if (!db) throw new Error('Firestore instance not initialized')
          if (!db.app) throw new Error('Firestore app not connected')
          return `Firestore connected to project: ${db.app.options.projectId}`
        }
      },
      {
        name: 'Network Connectivity',
        test: async () => {
          const response = await fetch('https://firebase.googleapis.com/', { 
            method: 'HEAD',
            mode: 'no-cors'
          })
          return 'Firebase services reachable'
        }
      },
      {
        name: 'Create Test User',
        test: async () => {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword)
            return `User created: ${userCredential.user.uid}`
          } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
              return 'User already exists (this is good!)'
            }
            throw error
          }
        }
      },
      {
        name: 'Test Login',
        test: async () => {
          const userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword)
          await auth.signOut() // Clean up
          return `Login successful for: ${userCredential.user.email}`
        }
      },
      {
        name: 'Firestore Write Test',
        test: async () => {
          const testDoc = doc(db, 'test', 'connection-test')
          await setDoc(testDoc, {
            timestamp: new Date(),
            test: 'Firebase connection test'
          })
          return 'Firestore write successful'
        }
      },
      {
        name: 'Firestore Read Test',
        test: async () => {
          const testDoc = doc(db, 'test', 'connection-test')
          const docSnap = await getDoc(testDoc)
          if (!docSnap.exists()) {
            throw new Error('Test document not found')
          }
          return 'Firestore read successful'
        }
      }
    ]

    for (const { name, test } of tests) {
      try {
        const result = await test()
        setResults(prev => ({ ...prev, [name]: { success: true, message: result } }))
      } catch (error: any) {
        setResults(prev => ({ 
          ...prev, 
          [name]: { 
            success: false, 
            message: error.message,
            code: error.code 
          } 
        }))
      }
    }

    setTesting(false)
  }

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-lg border border-blue-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-syne font-bold text-white">Firebase Diagnostics</h3>
          </div>
          <motion.button
            onClick={runDiagnostics}
            disabled={testing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-neon px-4 py-2 rounded-lg font-syne font-semibold text-white border border-blue-500 hover:bg-blue-500/20 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Testing...' : 'Run Tests'}</span>
          </motion.button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Test Email</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Test Password</label>
              <input
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(results).map(([testName, result]: [string, TestResult]) => (
            <div
              key={testName}
              className={`p-3 rounded-lg border ${
                result.success 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}
            >
              <div className="flex items-center space-x-2">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                )}
                <span className="font-medium text-white">{testName}</span>
              </div>
              <p className={`text-sm mt-1 ${result.success ? 'text-green-300' : 'text-red-300'}`}>
                {result.message}
              </p>
              {result.code && (
                <p className="text-xs text-gray-500 mt-1">Error Code: {result.code}</p>
              )}
            </div>
          ))}
        </div>

        {Object.keys(results).length === 0 && !testing && (
          <div className="text-center py-8 text-gray-400">
            <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Click "Run Tests" to diagnose Firebase connection issues</p>
          </div>
        )}
      </div>

      <div className="glass p-6 rounded-lg border border-yellow-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Key className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-syne font-bold text-white">Quick Fixes</h3>
        </div>
        
        <div className="space-y-4 text-sm text-gray-300">
          <div>
            <h4 className="text-yellow-400 font-medium mb-2">If Authentication Fails:</h4>
            <ul className="space-y-1 ml-4">
              <li>• Check Firebase Console → Authentication → Sign-in method</li>
              <li>• Ensure Email/Password is enabled</li>
              <li>• Verify your Firebase project ID matches .env.local</li>
              <li>• Check if the user account exists in Firebase Console</li>
            </ul>
          </div>

          <div>
            <h4 className="text-yellow-400 font-medium mb-2">If Firestore Fails (permission-denied):</h4>
            <ul className="space-y-1 ml-4">
              <li>• <strong className="text-red-400">Most Common Issue:</strong> Firestore security rules are too restrictive</li>
              <li>• Click the "Fix Firestore Rules" tab above for step-by-step solution</li>
              <li>• Check Firebase Console → Firestore Database → Rules</li>
              <li>• Ensure database is created and rules allow access</li>
              <li>• Verify project ID in configuration</li>
            </ul>
          </div>

          <div>
            <h4 className="text-yellow-400 font-medium mb-2">If Network Fails:</h4>
            <ul className="space-y-1 ml-4">
              <li>• Check your internet connection</li>
              <li>• Verify Firebase project exists and is active</li>
              <li>• Check if Firebase services are down</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
