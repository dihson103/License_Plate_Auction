import type { Metadata } from 'next'
import Provider from '../Provider'
import AppHeader from '../components/AppHeader'
import AppBanner from '../components/AppBanner'
import AppFooter from '../components/AppFooter'

export const metadata: Metadata = {
  title: 'Auctions',
  description: 'Auction List'
}

export default function AuctionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Provider>
        <AppHeader />
      </Provider>
      {children}
      <AppFooter />
    </div>
  )
}
