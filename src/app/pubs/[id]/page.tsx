export const dynamic = 'force-dynamic'

import { sql } from '@/lib/db'
import { saveScores } from '@/actions/scores'
import { notFound } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle, MapPin, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { SavedToast } from '@/components/SavedToast'
import { DeletePubButton } from '@/components/DeletePubButton'
import { ResetPubButton } from '@/components/ResetPubButton'
import { SaveScoresSubmit } from '@/components/SaveScoresSubmit'

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
  maps_url: string | null
  notes: string | null
  completed: boolean
}

export default async function PubRatingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ saved?: string }>
}) {
  const { id } = await params
  const { saved } = await searchParams
  const pubId = parseInt(id, 10)

  if (isNaN(pubId)) notFound()

  const [pubResult, criteriaResult, scoresResult] = await Promise.all([
    sql`SELECT id, name, maps_url, notes, completed FROM pubs WHERE id = ${pubId}`,
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
  const maxScore = criteria.length * 10
  const hasScores = existingScores.length > 0

  return (
    <div className="flex flex-col gap-4">
      <SavedToast show={saved === 'true'} />

      <Link href="/pubs" className="text-sm text-muted-foreground">&larr; Back to Pubs</Link>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-2xl font-bold truncate">{pub.name}</h1>
          {pub.completed && (
            <CheckCircle className="shrink-0 size-6 text-green-400" />
          )}
          {pub.maps_url && (
            <a
              href={pub.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Open in Google Maps"
            >
              <MapPin className="size-5" />
            </a>
          )}
        </div>
        {hasScores && (
          <span className="shrink-0 text-muted-foreground text-sm">
            <span className="text-xl font-bold text-foreground">{totalScore}</span>/{maxScore}
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

        <div className="flex flex-col gap-2 mt-4">
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            name="notes"
            defaultValue={pub.notes ?? ''}
            placeholder="Add your notes about this pub..."
            rows={4}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          />
        </div>

        <SaveScoresSubmit />
      </form>

      <div className="mt-4 border-t border-border pt-4 flex gap-2">
        <Link
          href={`/pubs/${pub.id}/edit`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
        >
          <Pencil className="size-4" />
          Edit Pub
        </Link>
        <ResetPubButton pubId={pub.id} />
        <DeletePubButton pubId={pub.id} pubName={pub.name} />
      </div>
    </div>
  )
}
