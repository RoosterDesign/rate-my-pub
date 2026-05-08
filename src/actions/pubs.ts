'use server'

import { sql } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function addPub(formData: FormData) {
  const name = formData.get('name')

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return
  }

  const mapsUrl = formData.get('maps_url')
  const mapsUrlValue = typeof mapsUrl === 'string' && mapsUrl.trim() ? mapsUrl.trim() : null

  await sql`INSERT INTO pubs (name, maps_url) VALUES (${name.trim()}, ${mapsUrlValue})`

  revalidatePath('/pubs')
  revalidatePath('/leaderboard')
  redirect('/pubs')
}

export async function updatePub(pubId: number, formData: FormData) {
  const name = formData.get('name')

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return
  }

  const mapsUrl = formData.get('maps_url')
  const mapsUrlValue = typeof mapsUrl === 'string' && mapsUrl.trim() ? mapsUrl.trim() : null

  await sql`UPDATE pubs SET name = ${name.trim()}, maps_url = ${mapsUrlValue} WHERE id = ${pubId}`

  revalidatePath(`/pubs/${pubId}`)
  revalidatePath('/pubs')
  revalidatePath('/leaderboard')
  redirect(`/pubs/${pubId}`)
}

export async function deletePub(pubId: number) {
  await sql`DELETE FROM pubs WHERE id = ${pubId}`
  revalidatePath('/pubs')
  revalidatePath('/leaderboard')
  redirect('/pubs')
}
