import type { Metadata } from 'next'
import './globals.css'
import { ThemeModeScript } from 'flowbite-react'

export const metadata: Metadata = {
  title: 'Admin page',
  description: 'This is the admin page of lisense plate auction'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <ThemeModeScript />
      </head>
      <body>{children}</body>
    </html>
  )
}
