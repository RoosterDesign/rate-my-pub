import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { BottomNav } from '@/components/BottomNav'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Rate My Pub',
  description: 'Rate your local pubs and see who comes out on top',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <main className="mx-auto max-w-lg px-4 py-8 pb-24">{children}</main>
        <BottomNav />
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
