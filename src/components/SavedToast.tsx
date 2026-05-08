'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function SavedToast({ show }: { show: boolean }) {
  const router = useRouter()
  const hasShown = useRef(false)

  useEffect(() => {
    if (show && !hasShown.current) {
      hasShown.current = true
      toast.custom(() => (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-xl">
          <img src="/completed-it.png" alt="Completed it Mate!" className="w-48 rounded-lg" />
          <p className="text-sm font-semibold text-white">Completed it Mate!</p>
        </div>
      ), { duration: 5000 })
      const url = new URL(window.location.href)
      url.searchParams.delete('saved')
      router.replace(url.pathname, { scroll: false })
    }
  }, [show, router])

  return null
}
