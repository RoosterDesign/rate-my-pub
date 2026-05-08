import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envContent = readFileSync(join(__dirname, '..', '.env.local'), 'utf-8')
const dbUrl = envContent.match(/DATABASE_URL=([^\n]+)/)?.[1]?.trim()

if (!dbUrl) {
  console.error('DATABASE_URL not found in .env.local')
  process.exit(1)
}

const sql = neon(dbUrl)

const pubs = [
  'The Bear',
  'The Boathouse',
  "Cox's Yard",
  'The Encore',
  'The Pen and Parchment',
  'The Red Lion',
  'The Barge',
  'The Duck',
  'RSC Bar',
  'Arden Hotel',
  'The Embankment',
  'Town House',
  'Woodsman',
  'Garrick',
  'Cru',
  'Rose and Crown',
  'Prospero Lounge',
  'The Phoenix',
  'The Keys',
  'The Queens Head',
  'All Bar One',
  'Hotel du Vin',
  'Ya Bard',
  'The Coach House',
  'The Avon Lounge',
  'The Old Thatch',
  'White Swan',
  'Cafe Cocktail',
  'Stratford Ale House',
  'Windmill',
  'Bull',
  'Vintner',
  'Loxleys',
  'Everyman bar',
]

console.log(`Inserting ${pubs.length} pubs...`)
let inserted = 0

for (const name of pubs) {
  try {
    await sql`INSERT INTO pubs (name) VALUES (${name})`
    console.log(`  ✓ ${name}`)
    inserted++
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`)
  }
}

console.log(`\nDone! ${inserted}/${pubs.length} pubs inserted.`)
