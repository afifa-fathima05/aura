'use client'

import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext'
import { ProtectedAdminLogin } from '@/components/admin/ProtectedAdminLogin'
import { SimpleProtectedEventAdmin } from '@/components/admin/SimpleProtectedEventAdmin'

function AdminDashboardContent() {
  const { isAuthenticated, isLoading } = useAdminAuth()

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

  if (!isAuthenticated) {
    return <ProtectedAdminLogin />
  }

  return <SimpleProtectedEventAdmin />
}

export default function AdminDashboardPage() {
  return (
    <AdminAuthProvider>
      <AdminDashboardContent />
    </AdminAuthProvider>
  )
}