export const dynamic = 'force-dynamic'

import { sql } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

interface LeaderboardEntry {
  id: number
  name: string
  total_score: number
}

export default async function LeaderboardPage() {
  const entries = await sql`
    SELECT
      p.id,
      p.name,
      COALESCE(SUM(s.score), 0) AS total_score
    FROM pubs p
    LEFT JOIN scores s ON s.pub_id = p.id
    GROUP BY p.id, p.name
    ORDER BY total_score DESC, p.name ASC
  ` as LeaderboardEntry[]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-muted-foreground">&larr; Back</Link>
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <div className="w-12" />
      </div>

      {entries.length === 0 ? (
        <p className="text-center text-muted-foreground mt-8">No pubs yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {entries.map((entry, index) => (
            <Link key={entry.id} href={`/pubs/${entry.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-muted-foreground w-8 text-center">
                      {index + 1}
                    </span>
                    <span className="text-lg font-medium">{entry.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">{entry.total_score}</span>
                    <span className="text-sm text-muted-foreground">/50</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
