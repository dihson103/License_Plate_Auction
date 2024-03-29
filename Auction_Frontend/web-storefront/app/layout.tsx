import type { Metadata } from 'next'
import './globals.css'
import { ThemeModeScript } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SignalrProvider from './providers/SignalRProvider'

export const metadata: Metadata = {
  title: 'Lisence auction',
  description: 'Generated by create next app'
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
      <body>
        <SignalrProvider>{children}</SignalrProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
