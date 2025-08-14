'use client'

import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext'
import { ProtectedAdminLogin } from '@/components/admin/ProtectedAdminLogin'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function AdminPageContent() {
  const { isAuthenticated, isLoading } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return <ProtectedAdminLogin />
}

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminPageContent />
    </AdminAuthProvider>
  )
}