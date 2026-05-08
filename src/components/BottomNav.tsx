'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Beer, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home', Icon: Home, exact: true },
  { href: '/pubs', label: 'Pubs', Icon: Beer, exact: false },
  { href: '/leaderboard', label: 'Leaderboard', Icon: Trophy, exact: false },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {navItems.map(({ href, label, Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg px-6 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('size-5', isActive && 'stroke-[2.5px]')} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
