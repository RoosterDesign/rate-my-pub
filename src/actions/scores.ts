'use server'

import { sql } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function saveScores(pubId: number, formData: FormData) {
  const notes = (formData.get('notes') as string | null) ?? ''

  const entries: Array<{ criterionId: number; score: number }> = []

  for (const [key, value] of formData.entries()) {
    if (key.startsWith('criterion_')) {
      const criterionId = parseInt(key.replace('criterion_', ''), 10)
      const score = parseInt(value as string, 10)

      if (!isNaN(criterionId) && !isNaN(score) && score >= 0 && score <= 10) {
        entries.push({ criterionId, score })
      }
    }
  }

  await sql`UPDATE pubs SET notes = ${notes || null}, completed = true WHERE id = ${pubId}`

  for (const entry of entries) {
    await sql`
      INSERT INTO scores (pub_id, criterion_id, score, updated_at)
      VALUES (${pubId}, ${entry.criterionId}, ${entry.score}, NOW())
      ON CONFLICT (pub_id, criterion_id)
      DO UPDATE SET score = EXCLUDED.score, updated_at = NOW()
    `
  }

  revalidatePath(`/pubs/${pubId}`)
  revalidatePath('/pubs')
  revalidatePath('/leaderboard')
  redirect(`/pubs/${pubId}?saved=true`)
}
