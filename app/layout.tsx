import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Legacy Live | Extraordinary Entertainment',
  description: 'Developed by DB Studios',
  generator: 'DB Studios',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
