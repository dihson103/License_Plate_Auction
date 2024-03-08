import { AdminSearchParam } from '@/types/admins.type'
import AuctionTable from './AuctionTable'

type Props = {
  searchParams: AdminSearchParam
}

export default function Auctions({ searchParams }: Props) {
  return (
    <>
      <AuctionTable searchParams={searchParams} />
    </>
  )
}
