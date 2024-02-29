import type { Metadata } from 'next'
import './globals.css'
import { ThemeModeScript } from 'flowbite-react'
import AppNavBar from './components/AppNavBar'
import AppSideBar from './components/AppSideBar'

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
      <body className='flex h-screen bg-gray-100'>
        <AppSideBar />
        <div className='flex flex-col flex-1 overflow-y-auto'>
          <AppNavBar />
          <div className='p-4'>{children}</div>
        </div>
      </body>
    </html>
  )
}
