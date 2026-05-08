import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envContent = readFileSync(join(__dirname, '..', '.env.local'), 'utf-8')
const dbUrl = envContent.match(/DATABASE_URL=([^\n]+)/)?.[1]?.trim()

const sql = neon(dbUrl)

const pubs = [
  { name: "Tramway", url: "https://www.google.com/maps/search/?api=1&query=Tramway%20Stratford-upon-Avon" },
  { name: "The Bear", url: "https://www.google.com/maps/search/?api=1&query=The%20Bear%20Stratford-upon-Avon" },
  { name: "The Boathouse", url: "https://www.google.com/maps/search/?api=1&query=The%20Boathouse%20Stratford-upon-Avon" },
  { name: "Cox's Yard", url: "https://www.google.com/maps/search/?api=1&query=Cox%E2%80%99s%20Yard%20Stratford-upon-Avon" },
  { name: "The Encore", url: "https://www.google.com/maps/search/?api=1&query=The%20Encore%20Stratford-upon-Avon" },
  { name: "The Pen and Parchment", url: "https://www.google.com/maps/search/?api=1&query=The%20Pen%20and%20Parchment%20Stratford-upon-Avon" },
  { name: "The Red Lion", url: "https://www.google.com/maps/search/?api=1&query=The%20Red%20Lion%20Stratford-upon-Avon" },
  { name: "The Barge", url: "https://www.google.com/maps/search/?api=1&query=The%20Barge%20Stratford-upon-Avon" },
  { name: "The Duck", url: "https://www.google.com/maps/search/?api=1&query=The%20Duck%20Stratford-upon-Avon" },
  { name: "RSC Bar", url: "https://www.google.com/maps/search/?api=1&query=RSC%20Bar%20Stratford-upon-Avon" },
  { name: "Arden Hotel", url: "https://www.google.com/maps/search/?api=1&query=Arden%20Hotel%20Stratford-upon-Avon" },
  { name: "The Embankment", url: "https://www.google.com/maps/search/?api=1&query=The%20Embankment%20Stratford-upon-Avon" },
  { name: "Town House", url: "https://www.google.com/maps/search/?api=1&query=Town%20House%20Stratford-upon-Avon" },
  { name: "Woodsman", url: "https://www.google.com/maps/search/?api=1&query=Woodsman%20Stratford-upon-Avon" },
  { name: "Garrick", url: "https://www.google.com/maps/search/?api=1&query=Garrick%20Stratford-upon-Avon" },
  { name: "Cru", url: "https://www.google.com/maps/search/?api=1&query=Cru%20Stratford-upon-Avon" },
  { name: "Rose and Crown", url: "https://www.google.com/maps/search/?api=1&query=Rose%20and%20Crown%20Stratford-upon-Avon" },
  { name: "Prospero Lounge", url: "https://www.google.com/maps/search/?api=1&query=Prospero%20Lounge%20Stratford-upon-Avon" },
  { name: "The Phoenix", url: "https://www.google.com/maps/search/?api=1&query=The%20Phoenix%20Stratford-upon-Avon" },
  { name: "The Keys", url: "https://www.google.com/maps/search/?api=1&query=The%20Keys%20Stratford-upon-Avon" },
  { name: "The Queens Head", url: "https://www.google.com/maps/search/?api=1&query=The%20Queens%20Head%20Stratford-upon-Avon" },
  { name: "All Bar One", url: "https://www.google.com/maps/search/?api=1&query=All%20Bar%20One%20Stratford-upon-Avon" },
  { name: "Hotel du Vin", url: "https://www.google.com/maps/search/?api=1&query=Hotel%20du%20Vin%20Stratford-upon-Avon" },
  { name: "Ya Bard", url: "https://www.google.com/maps/search/?api=1&query=Ya%20Bard%20Stratford-upon-Avon" },
  { name: "The Coach House", url: "https://www.google.com/maps/search/?api=1&query=The%20Coach%20House%20Stratford-upon-Avon" },
  { name: "The Avon Lounge", url: "https://www.google.com/maps/search/?api=1&query=The%20Avon%20Lounge%20Stratford-upon-Avon" },
  { name: "The Old Thatch", url: "https://www.google.com/maps/search/?api=1&query=The%20Old%20Thatch%20Stratford-upon-Avon" },
  { name: "White Swan", url: "https://www.google.com/maps/search/?api=1&query=White%20Swan%20Stratford-upon-Avon" },
  { name: "Cafe Cocktail", url: "https://www.google.com/maps/search/?api=1&query=Cafe%20Cocktail%20Stratford-upon-Avon" },
  { name: "Stratford Ale House", url: "https://www.google.com/maps/search/?api=1&query=Stratford%20Ale%20House%20Stratford-upon-Avon" },
  { name: "Windmill", url: "https://www.google.com/maps/search/?api=1&query=Windmill%20Stratford-upon-Avon" },
  { name: "Bull", url: "https://www.google.com/maps/search/?api=1&query=Bull%20Stratford-upon-Avon" },
  { name: "Vintner", url: "https://www.google.com/maps/search/?api=1&query=Vintner%20Stratford-upon-Avon" },
  { name: "Loxleys", url: "https://www.google.com/maps/search/?api=1&query=Loxleys%20Stratford-upon-Avon" },
  { name: "Everyman bar", url: "https://www.google.com/maps/search/?api=1&query=Everyman%20bar%20Stratford-upon-Avon" },
]

let updated = 0
let inserted = 0
let skipped = 0

for (const { name, url } of pubs) {
  const result = await sql`UPDATE pubs SET maps_url = ${url} WHERE name = ${name}`
  if (result.count === 0) {
    // Not found — insert as new pub
    await sql`INSERT INTO pubs (name, maps_url) VALUES (${name}, ${url})`
    console.log(`  + ${name} (inserted as new pub)`)
    inserted++
  } else {
    console.log(`  ✓ ${name}`)
    updated++
  }
}

console.log(`\nDone! ${updated} updated, ${inserted} inserted, ${skipped} skipped.`)
