import { addPub } from '@/actions/pubs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function AddPubPage() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/" className="text-sm text-muted-foreground">&larr; Back</Link>
      <Card>
        <CardHeader>
          <CardTitle>Add a Pub</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addPub} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Pub Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. The Crown"
                required
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="maps_url">Google Maps Link <span className="text-muted-foreground">(optional)</span></Label>
              <Input
                id="maps_url"
                name="maps_url"
                type="url"
                placeholder="https://maps.google.com/..."
              />
            </div>
            <Button type="submit" size="lg">Add Pub</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
