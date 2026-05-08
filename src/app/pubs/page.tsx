export const dynamic = 'force-dynamic'

import { sql } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface Pub {
  id: number
  name: string
}

export default async function PubsPage() {
  const pubs = await sql`SELECT id, name FROM pubs ORDER BY name ASC` as Pub[]

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
        <div className="flex flex-col gap-2">
          {pubs.map((pub) => (
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
