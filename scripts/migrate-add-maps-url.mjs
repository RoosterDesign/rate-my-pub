import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envContent = readFileSync(join(__dirname, '..', '.env.local'), 'utf-8')
const dbUrl = envContent.match(/DATABASE_URL=([^\n]+)/)?.[1]?.trim()

const sql = neon(dbUrl)

await sql`ALTER TABLE pubs ADD COLUMN IF NOT EXISTS maps_url TEXT`
console.log('✓ Added maps_url column to pubs table')
