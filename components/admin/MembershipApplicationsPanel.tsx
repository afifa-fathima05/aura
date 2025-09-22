'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Mail, 
  User, 
  Calendar, 
  Hash,
  GraduationCap,
  CheckCircle,
  XCircle,
  Clock,
  Download
} from 'lucide-react'
import { getMembershipApplications, MembershipApplication } from '@/lib/firebaseServices'
import { formatDate } from '@/lib/utils'

// ----- CSV helpers -----
const csvHeaders = [
  'membershipId', 'name', 'email', 'rollNumber', 'registerNumber', 'year', 'section', 'department', 'participation'
]

function escapeCsv(val: unknown): string {
  const s = String(val ?? '')
  // Escape quotes by doubling them, wrap in quotes to preserve commas
  return '"' + s.replace(/"/g, '""') + '"'
}

function toCsv(apps: MembershipApplication[]): string {
  const rows: string[] = []
  rows.push(csvHeaders.map(escapeCsv).join(','))
  for (const a of apps) {
    const row = [
      a.membershipId || '',
      a.name || '',
      a.email || '',
      a.rollNumber || '',
      a.registerNumber || '',
      a.year || '',
      a.section || '',
      (a as any).department || 'AI&DS',
      (a as any).participation || ''
    ].map(escapeCsv).join(',')
    rows.push(row)
  }
  return rows.join('\n')
}

function downloadCsvFromText(csvText: string, filename: string) {
  const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function MembershipApplicationsPanel() {
  const [applications, setApplications] = useState<MembershipApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<MembershipApplication | null>(null)
  

  // Filters
  const [filterYear, setFilterYear] = useState<string>('')
  const [filterSection, setFilterSection] = useState<string>('')
  const [filterDepartment, setFilterDepartment] = useState<string>('')

  const years = useMemo(() => {
    const ys = Array.from(new Set(applications.map(a => a.year).filter(Boolean))) as string[]
    return ys.sort()
  }, [applications])

  const sections = useMemo(() => {
    const ss = Array.from(new Set(applications.map(a => a.section).filter(Boolean))) as string[]
    return ss.sort()
  }, [applications])

  const departments = useMemo(() => {
    const ds = Array.from(new Set(applications.map(a => a.department).filter(Boolean))) as string[]
    return ds.sort()
  }, [applications])

  const filteredApplications = useMemo(() => {
    return applications.filter(a => (
      (filterYear ? a.year === filterYear : true) &&
      (filterSection ? a.section === filterSection : true) &&
      (filterDepartment ? a.department === filterDepartment : true)
    ))
  }, [applications, filterYear, filterSection, filterDepartment])

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      console.log('🔥 Loading membership applications...')
      const apps = await getMembershipApplications()
      setApplications(apps)
      console.log(`✅ Loaded ${apps.length} membership applications`)
    } catch (error) {
      console.error('❌ Error loading membership applications:', error)
    } finally {
      setLoading(false)
    }
  }

  // Status visuals removed per requirement

  if (loading) {
    return (
      <div className="glass p-6 rounded-xl">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading membership applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-neon-blue" />
          <h2 className="text-2xl font-orbitron font-bold gradient-text">
            Membership Applications
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-gray-400">
          <span className="text-gray-400">Filters:</span>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="h-10 min-w-36 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-aura-primary"
          >
            <option value="">All Years</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="h-10 min-w-36 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-aura-primary"
          >
            <option value="">All Sections</option>
            {sections.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="h-10 min-w-36 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-aura-primary"
          >
            <option value="">All Departments</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {(filterYear || filterSection || filterDepartment) && (
            <button
              onClick={() => { setFilterYear(''); setFilterSection(''); setFilterDepartment(''); }}
              className="px-4 py-2 sm:px-4 sm:py-2.5 glass rounded-lg text-gray-300 hover:text-white"
            >
              Clear
            </button>
          )}
          {/* Download CSV */}
          <button
            onClick={() => {
              const csv = toCsv(filteredApplications)
              const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
              downloadCsvFromText(csv, `membership-applications-${timestamp}.csv`)
            }}
            className="ml-1 sm:ml-2 px-4 py-2 sm:px-4 sm:py-2.5 glass rounded-lg text-white border border-white/10 hover:bg-white/10 inline-flex items-center gap-2"
            title="Download CSV"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>

          {/* Export XLSX (SheetJS) */}
          <button
            onClick={async () => {
              try {
                const xlsx = await import('xlsx')
                const { utils, writeFile } = xlsx as any
                const rows = filteredApplications.map(a => ({
                  membershipId: a.membershipId || '',
                  name: a.name || '',
                  email: a.email || '',
                  rollNumber: a.rollNumber || '',
                  registerNumber: a.registerNumber || '',
                  year: a.year || '',
                  section: a.section || '',
                  department: (a as any).department || 'AI&DS',
                  participation: (a as any).participation || ''
                }))
                const ws = utils.json_to_sheet(rows, { header: ['membershipId', 'name', 'email', 'rollNumber', 'registerNumber', 'year', 'section', 'department', 'participation'] })
                const wb = utils.book_new()
                utils.book_append_sheet(wb, ws, 'Members')
                const ts = new Date().toISOString().replace(/[:.]/g, '-')
                writeFile(wb, `membership-applications-${ts}.xlsx`)
              } catch (err) {
                console.error('XLSX export failed:', err)
                alert('Failed to export Excel. Please ensure the xlsx dependency is installed.')
              }
            }}
            className="ml-1 sm:ml-2 px-4 py-2 sm:px-4 sm:py-2.5 glass rounded-lg text-white border border-white/10 hover:bg-white/10 inline-flex items-center gap-2"
            title="Export to Excel"
          >
            <Download className="w-4 h-4" />
            <span>XLSX</span>
          </button>
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="glass p-8 rounded-xl text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-syne font-bold text-white mb-2">No Applications Found</h3>
          <p className="text-gray-400 font-urbanist">
            Try adjusting the filters above.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map((application) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedApplication(application)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-syne font-bold text-white">
                      {application.name}
                    </h3>
                    {application.membershipId && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/10 text-neon-blue">
                        {application.membershipId}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-neon-blue" />
                      <span>{application.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-neon-green" />
                      <span>Roll: {application.rollNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-neon-purple" />
                      <span>Reg: {application.registerNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-neon-orange" />
                      <span>{application.year} - Section {application.section}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-neon-pink" />
                      <span>{formatDate(application.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-orbitron font-bold gradient-text">
                Application Details
              </h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 glass rounded-full text-gray-400 hover:text-white transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <div className="glass p-3 rounded-lg text-white font-urbanist">
                    {selectedApplication.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Gmail ID</label>
                  <div className="glass p-3 rounded-lg text-white font-urbanist">
                    {selectedApplication.email}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Roll Number</label>
                  <div className="glass p-3 rounded-lg text-white font-urbanist">
                    {selectedApplication.rollNumber}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Register Number</label>
                  <div className="glass p-3 rounded-lg text-white font-urbanist">
                    {selectedApplication.registerNumber}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Academic Year</label>
                  <div className="glass p-3 rounded-lg text-white font-urbanist">
                    {selectedApplication.year}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Section</label>
                  <div className="glass p-3 rounded-lg text-white font-urbanist">
                    {selectedApplication.section}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Membership ID</label>
                  <div className="glass p-3 rounded-lg text-neon-blue font-urbanist">
                    {selectedApplication.membershipId}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Application Date</label>
                  <div className="glass p-3 rounded-lg text-white font-urbanist">
                    {formatDate(selectedApplication.createdAt)}
                  </div>
                </div>
                {/* Status removed per requirement */}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}