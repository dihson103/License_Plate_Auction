import { AdminSearchParam } from '@/types/admins.type'
import AuctionTable from './AuctionTable'
import SearchAuction from './SearchAuction'
import { Suspense } from 'react'
import AppLoading from '../components/AppLoading'

type Props = {
  searchParams: AdminSearchParam
}

export default function Auctions({ searchParams }: Props) {
  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <SearchAuction />
        <AuctionTable searchParams={searchParams} />
      </Suspense>
    </>
  )
}
