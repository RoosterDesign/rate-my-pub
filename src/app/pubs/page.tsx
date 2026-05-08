export const dynamic = 'force-dynamic'

import { sql } from '@/lib/db'
import Link from 'next/link'
import { PubList } from '@/components/PubList'

interface Pub {
  id: number
  name: string
  completed: boolean
}

export default async function PubsPage() {
  const pubs = await sql`SELECT id, name, completed FROM pubs ORDER BY name ASC` as Pub[]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-muted-foreground">&larr; Back</Link>
        <h1 className="text-2xl font-bold">Pubs</h1>
        <div className="w-12" />
      </div>

      {pubs.length === 0 ? (
        <p className="text-center text-muted-foreground mt-8">
          No pubs yet.{' '}
          <Link href="/add-pub" className="underline">Add one!</Link>
        </p>
      ) : (
        <PubList pubs={pubs} />
      )}
    </div>
  )
}
