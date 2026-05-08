'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Pub {
  id: number
  name: string
}

export function PubList({ pubs }: { pubs: Pub[] }) {
  const [search, setSearch] = useState('')

  const filtered = pubs.filter((pub) =>
    pub.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Search pubs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground mt-4">No pubs found.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((pub) => (
            <Link key={pub.id} href={`/pubs/${pub.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="py-4">
                  <span className="text-lg font-medium">{pub.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
