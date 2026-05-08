export const dynamic = 'force-dynamic'

import { sql } from '@/lib/db'
import { updatePub } from '@/actions/pubs'
import { notFound } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Pub {
  id: number
  name: string
  maps_url: string | null
}

export default async function EditPubPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const pubId = parseInt(id, 10)

  if (isNaN(pubId)) notFound()

  const result = await sql`SELECT id, name, maps_url FROM pubs WHERE id = ${pubId}`
  const pub = (result as unknown as Pub[])[0]

  if (!pub) notFound()

  const updatePubForId = updatePub.bind(null, pubId)

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/pubs/${pubId}`} className="text-sm text-muted-foreground">
        &larr; Back
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Edit {pub.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updatePubForId} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Pub Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={pub.name}
                required
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="maps_url">
                Google Maps Link <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="maps_url"
                name="maps_url"
                type="url"
                defaultValue={pub.maps_url ?? ''}
                placeholder="https://maps.google.com/..."
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="lg" className="flex-1">
                Save Changes
              </Button>
              <Link
                href={`/pubs/${pubId}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                Cancel
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
