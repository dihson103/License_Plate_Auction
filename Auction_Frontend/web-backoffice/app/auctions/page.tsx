import { AdminSearchParam } from '@/types/admins.type'

type Props = {
  searchParams: AdminSearchParam
}

export default function Auctions({ searchParams }: Props) {
  return <div>Auctions {searchParams.searchValue}</div>
}
