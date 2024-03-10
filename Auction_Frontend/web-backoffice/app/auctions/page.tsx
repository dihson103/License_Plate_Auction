import { AdminSearchParam } from '@/types/admins.type'
import AuctionTable from './AuctionTable'
import SearchAuction from './SearchAuction'

type Props = {
  searchParams: AdminSearchParam
}

export default function Auctions({ searchParams }: Props) {
  return (
    <>
      <SearchAuction />
      <AuctionTable searchParams={searchParams} />
    </>
  )
}
