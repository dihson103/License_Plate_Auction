import type { Metadata } from 'next'
import './globals.css'
import { ThemeModeScript } from 'flowbite-react'
import AppNavBar from './components/AppNavBar'
import AppSideBar from './components/AppSideBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
