import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auction',
  description: 'Auction Detail'
}

export default function AuctionLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
