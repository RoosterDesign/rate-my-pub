'use server'

import { sql } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function addPub(formData: FormData) {
  const name = formData.get('name')

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return
  }

  await sql`INSERT INTO pubs (name) VALUES (${name.trim()})`

  revalidatePath('/pubs')
  revalidatePath('/leaderboard')
  redirect('/pubs')
}
