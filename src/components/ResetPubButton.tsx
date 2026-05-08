'use client'

import { useTransition } from 'react'
import { RotateCcw } from 'lucide-react'
import { resetPub } from '@/actions/pubs'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function ResetPubButton({ pubId }: { pubId: number }) {
  const [isPending, startTransition] = useTransition()

  function handleReset() {
    startTransition(async () => {
      await resetPub(pubId)
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
        disabled={isPending}
      >
        <RotateCcw className="size-4" />
        {isPending ? 'Resetting...' : 'Reset Pub'}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset this pub?</AlertDialogTitle>
          <AlertDialogDescription>
            This will clear all scores and mark the pub as not completed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
