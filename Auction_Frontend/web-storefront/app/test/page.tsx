import { AuctionListConfig } from '../types/auction.type'

type Props = {
  searchParams: AuctionListConfig
}

export default function page({ searchParams }: Props) {
  console.log(searchParams)
  return <div>page: {searchParams.page ?? 1}</div>
}
