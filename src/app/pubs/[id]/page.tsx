export const dynamic = 'force-dynamic'

import { sql } from '@/lib/db'
import { saveScores } from '@/actions/scores'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

interface Criterion {
  id: number
  name: string
  subtitle: string | null
  display_order: number
}

interface Score {
  criterion_id: number
  score: number
}

interface Pub {
  id: number
  name: string
}

export default async function PubRatingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const pubId = parseInt(id, 10)

  if (isNaN(pubId)) notFound()

  const [pubResult, criteriaResult, scoresResult] = await Promise.all([
    sql`SELECT id, name FROM pubs WHERE id = ${pubId}`,
    sql`SELECT id, name, subtitle, display_order FROM criteria ORDER BY display_order ASC`,
    sql`SELECT criterion_id, score FROM scores WHERE pub_id = ${pubId}`,
  ])

  const pubs = pubResult as unknown as Pub[]
  const criteria = criteriaResult as unknown as Criterion[]
  const existingScores = scoresResult as unknown as Score[]

  const pub = pubs[0]
  if (!pub) notFound()

  const scoreMap = new Map(existingScores.map((s) => [s.criterion_id, s.score]))
  const saveScoresForPub = saveScores.bind(null, pubId)

  const totalScore = existingScores.reduce((sum, s) => sum + s.score, 0)
  const hasScores = existingScores.length > 0

  return (
    <div className="flex flex-col gap-4">
      <Link href="/pubs" className="text-sm text-muted-foreground">&larr; Back to Pubs</Link>
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">{pub.name}</h1>
        {hasScores && (
          <span className="text-muted-foreground text-sm">
            <span className="text-xl font-bold text-foreground">{totalScore}</span>/50
          </span>
        )}
      </div>

      <form action={saveScoresForPub} className="flex flex-col gap-3">
        {criteria.map((criterion) => {
          const currentScore = scoreMap.get(criterion.id) ?? 0
          return (
            <Card key={criterion.id}>
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-base">{criterion.name}</CardTitle>
                {criterion.subtitle && (
                  <p className="text-xs text-muted-foreground">{criterion.subtitle}</p>
                )}
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center gap-3">
                  <Label htmlFor={`criterion-${criterion.id}`} className="sr-only">
                    Score for {criterion.name}
                  </Label>
                  <Select
                    name={`criterion_${criterion.id}`}
                    defaultValue={String(currentScore)}
                  >
                    <SelectTrigger
                      id={`criterion-${criterion.id}`}
                      className="w-28 text-lg h-12"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 11 }, (_, i) => (
                        <SelectItem key={i} value={String(i)} className="text-lg py-2">
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-muted-foreground">/ 10</span>
                </div>
              </CardContent>
            </Card>
          )
        })}

        <Button type="submit" size="lg" className="mt-2 h-14 text-lg">
          Save Scores
        </Button>
      </form>
    </div>
  )
}
