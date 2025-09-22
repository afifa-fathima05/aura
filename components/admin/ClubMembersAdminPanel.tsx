"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Users, Loader2, Info, RefreshCw } from "lucide-react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { deleteClubMember } from "@/lib/firebaseServices"

interface ClubMemberDoc {
  id: string
  name: string
  position: string
  bio?: string
  imageUrl?: string
}

export function ClubMembersAdminPanel() {
  const [members, setMembers] = useState<ClubMemberDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)

  useEffect(() => {
    const ref = collection(db, "club_members")
    const q = query(ref, orderBy("name"))
    const unsub = onSnapshot(q, (snap) => {
      const next: ClubMemberDoc[] = []
      snap.forEach((d) => next.push({ id: d.id, ...(d.data() as any) }))
      setMembers(next)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleRemove = async (id: string) => {
    if (!confirm("Remove this member?")) return
    try {
      setRemovingId(id)
      await deleteClubMember(id)
    } catch (err) {
      console.error("Failed to delete member", err)
      alert("Failed to remove member. Check console for details.")
    } finally {
      setRemovingId(null)
    }
  }

  if (loading) {
    return (
      <div className="glass p-6 rounded-xl text-center">
        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-neon-blue" />
        <p className="text-gray-400">Loading members...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-neon-blue" />
          <h3 className="text-xl font-orbitron font-bold gradient-text">Club Members</h3>
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span>Realtime list from Firestore</span>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="glass p-8 rounded-xl text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No members found in Firestore collection "club_members".</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-4 rounded-xl flex flex-col gap-3"
            >
              <div>
                <div className="text-white font-syne font-semibold">{m.name}</div>
                <div className="text-sm text-neon-blue font-urbanist">{m.position}</div>
              </div>
              {m.bio && (
                <p className="text-sm text-gray-300 line-clamp-3">{m.bio}</p>
              )}
              <div className="flex justify-end">
                <button
                  onClick={() => handleRemove(m.id)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm inline-flex items-center gap-2 disabled:opacity-50"
                  disabled={removingId === m.id}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{removingId === m.id ? 'Removing...' : 'Remove'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}