'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function SavedToast({ show }: { show: boolean }) {
  const router = useRouter()

  useEffect(() => {
    if (show) {
      toast.success('Scores saved!')
      const url = new URL(window.location.href)
      url.searchParams.delete('saved')
      router.replace(url.pathname, { scroll: false })
    }
  }, [show, router])

  return null
}
