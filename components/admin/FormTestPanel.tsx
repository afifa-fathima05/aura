'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TestTube, Play, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { testFirestoreConnection, initializeFirestoreWithSampleData } from '@/lib/pureFirestoreEventService'

export function FormTestPanel() {
  const [testing, setTesting] = useState(false)
  const [testResults, setTestResults] = useState<{
    connection?: { success: boolean; message: string; eventCount?: number }
    sampleData?: { success: boolean; message: string; created: number }
  }>({})

  const runConnectionTest = async () => {
    setTesting(true)
    try {
      const result = await testFirestoreConnection()
      setTestResults(prev => ({ ...prev, connection: result }))
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        connection: { 
          success: false, 
          message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
        } 
      }))
    } finally {
      setTesting(false)
    }
  }

  const initializeSampleData = async () => {
    setTesting(true)
    try {
      const result = await initializeFirestoreWithSampleData()
      setTestResults(prev => ({ ...prev, sampleData: result }))
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        sampleData: { 
          success: false, 
          message: `Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          created: 0
        } 
      }))
    } finally {
      setTesting(false)
    }
  }

  const getStatusIcon = (success?: boolean) => {
    if (success === undefined) return <AlertCircle className="w-4 h-4 text-gray-400" />
    return success ? 
      <CheckCircle className="w-4 h-4 text-green-400" /> : 
      <XCircle className="w-4 h-4 text-red-400" />
  }

  const getStatusColor = (success?: boolean) => {
    if (success === undefined) return 'text-gray-400'
    return success ? 'text-green-400' : 'text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-xl"
    >
      <div className="flex items-center space-x-3 mb-6">
        <TestTube className="w-5 h-5 text-neon-pink" />
        <h3 className="text-lg font-orbitron font-semibold text-white">
          System Test Panel
        </h3>
      </div>

      <div className="space-y-4">
        {/* Connection Test */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {getStatusIcon(testResults.connection?.success)}
              <span className="font-medium text-white">Firestore Connection</span>
            </div>
            <button
              onClick={runConnectionTest}
              disabled={testing}
              className="flex items-center space-x-2 px-3 py-2 bg-neon-blue/20 hover:bg-neon-blue/30 disabled:opacity-50 rounded-lg text-neon-blue transition-colors"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm">Test</span>
            </button>
          </div>
          
          {testResults.connection && (
            <div className={`text-sm ${getStatusColor(testResults.connection.success)}`}>
              {testResults.connection.message}
              {testResults.connection.eventCount !== undefined && (
                <span className="block text-gray-400 mt-1">
                  Events in database: {testResults.connection.eventCount}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Sample Data Initialization */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {getStatusIcon(testResults.sampleData?.success)}
              <span className="font-medium text-white">Sample Data</span>
            </div>
            <button
              onClick={initializeSampleData}
              disabled={testing}
              className="flex items-center space-x-2 px-3 py-2 bg-neon-pink/20 hover:bg-neon-pink/30 disabled:opacity-50 rounded-lg text-neon-pink transition-colors"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm">Initialize</span>
            </button>
          </div>
          
          {testResults.sampleData && (
            <div className={`text-sm ${getStatusColor(testResults.sampleData.success)}`}>
              {testResults.sampleData.message}
              {testResults.sampleData.created > 0 && (
                <span className="block text-gray-400 mt-1">
                  Created {testResults.sampleData.created} sample events
                </span>
              )}
            </div>
          )}
        </div>

        {/* Status Indicator */}
        {testing && (
          <div className="flex items-center justify-center space-x-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="loading-spinner w-4 h-4"></div>
            <span className="text-blue-400 text-sm">Running tests...</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}