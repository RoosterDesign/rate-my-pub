import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center mb-6">Rate My Pub</h1>
      <Link
        href="/pubs"
        className={cn(buttonVariants({ size: 'lg' }), 'h-20 text-xl')}
      >
        Pubs
      </Link>
      <Link
        href="/leaderboard"
        className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-20 text-xl')}
      >
        Leaderboard
      </Link>
      <Link href="/add-pub" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-20 text-xl')}>
        Add Pub
      </Link>
    </div>
  )
}
