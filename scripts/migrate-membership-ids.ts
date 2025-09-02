// One-off migration: Recompute membershipId for all existing membership applications
// New format: YEAR-DEPTCODE-ROLLNUMBER (e.g., 2028-AIDS-21CS123)
// How to run (options):
// 1) Create a temporary Next.js page/button that imports and calls runMembershipIdMigration()
// 2) Import this in a dev-only admin panel and trigger it
// 3) In the browser console, if this file is exported to a window hook

import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const MEMBERSHIP_COLLECTION = 'membership_applications'

type Item = {
  id: string
  year?: string
  department?: string
  rollNumber?: string
  membershipId?: string
}

function buildMembershipId(year?: string, department?: string, rollNumber?: string): string {
  const yearCode = (year || '').trim().toUpperCase().replace(/[^0-9A-Z]/g, '')
  const departmentCode = (department || '')
    .trim()
    .toUpperCase()
    // Turn strings like "AI&DS" into "AIDS" and keep only A-Z0-9
    .replace(/[^A-Z0-9]/g, '') || 'AURA'
  const rollRaw = (rollNumber || '').trim()
  const rollDigits = rollRaw.match(/(\d+)$/i)?.[1] || ''
  const rollCode = rollDigits

  // Build ID without hyphens, using last two digits of year
  const yearDigits = (yearCode || '').replace(/[^0-9]/g, '')
  const yearShort = yearDigits.slice(-2)
  return `${yearShort}AURA${departmentCode}${rollCode}`
}

export async function runMembershipIdMigration(): Promise<{ updated: number; skipped: number; total: number }> {
  const snap = await getDocs(collection(db, MEMBERSHIP_COLLECTION))
  let updated = 0
  let skipped = 0

  for (const docSnap of snap.docs) {
    const data = docSnap.data() as any
    const id = docSnap.id

    const newId = buildMembershipId(data.year, data.department, data.rollNumber)

    // If we cannot build anything meaningful, skip
    if (!newId) {
      skipped++
      continue
    }

    // Only update if different to avoid unnecessary writes
    if (data.membershipId !== newId) {
      const ref = doc(db, MEMBERSHIP_COLLECTION, id)
      await updateDoc(ref, { membershipId: newId })
      updated++
      // eslint-disable-next-line no-console
      console.log(`Updated ${id}: ${data.membershipId || '<none>'} -> ${newId}`)
    } else {
      skipped++
    }
  }

  const total = snap.size
  // eslint-disable-next-line no-console
  console.log(`Migration complete. Updated: ${updated}, Skipped: ${skipped}, Total: ${total}`)
  return { updated, skipped, total }
}