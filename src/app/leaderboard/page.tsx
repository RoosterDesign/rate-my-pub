export const dynamic = 'force-dynamic'

import { sql } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface LeaderboardEntry {
  id: number
  name: string
  total_score: number
  completed: boolean
}

const medalColors: Record<number, { border: string; bg: string }> = {
  1: { border: '#704b01', bg: '#704b01' },
  2: { border: '#757370', bg: '#757370' },
  3: { border: '#4e2a0d', bg: '#4e2a0d' },
}

export default async function LeaderboardPage() {
  const [entries, criteriaCount] = await Promise.all([
    sql`
      SELECT
        p.id,
        p.name,
        p.completed,
        COALESCE(SUM(s.score), 0) AS total_score
      FROM pubs p
      LEFT JOIN scores s ON s.pub_id = p.id
      GROUP BY p.id, p.name, p.completed
      ORDER BY total_score DESC, p.name ASC
    ` as unknown as LeaderboardEntry[],
    sql`SELECT COUNT(*) AS count FROM criteria` as unknown as { count: number }[],
  ])

  const maxScore = Number(criteriaCount[0].count) * 10

  const uniqueScores = [...new Set(entries.map((e) => e.total_score))].sort((a, b) => b - a)
  const scoreRank = new Map(uniqueScores.map((score, i) => [score, i + 1]))

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
          {entries.map((entry, index) => {
            const rank = scoreRank.get(entry.total_score)!
            const medal = entry.completed && rank <= 3 ? medalColors[rank] : null
            return (
              <Link key={entry.id} href={`/pubs/${entry.id}`}>
                <Card
                  className={cn('transition-colors cursor-pointer', !medal && 'hover:bg-muted/50')}
                  style={medal ? { backgroundColor: medal.bg, borderColor: medal.border } : undefined}
                >
                  <CardContent className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-muted-foreground w-8 text-center">
                        {index + 1}
                      </span>
                      <span className="text-lg font-medium">{entry.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{entry.total_score}</span>
                      <span className="text-sm text-muted-foreground">/{maxScore}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
