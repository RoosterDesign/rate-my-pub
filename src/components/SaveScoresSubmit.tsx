'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export function SaveScoresSubmit() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="size-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}
      <Button type="submit" size="lg" className="mt-2 h-14 text-lg" disabled={pending}>
        {pending ? 'Saving...' : 'Completed it Mate'}
      </Button>
    </>
  )
}
