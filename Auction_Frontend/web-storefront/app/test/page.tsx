import { getCurrentUser } from '../actions/auth.action'
import { AuctionListConfig } from '../types/auction.type'

type Props = {
  searchParams: AuctionListConfig
}

export default async function page({ searchParams }: Props) {
  const user = await getCurrentUser()
  return (
    <>
      <div>page: {searchParams.page ?? 1}</div>
      <div>current user: {user?.data.fullName}</div>
    </>
  )
}
