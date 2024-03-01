import { UserSearchParams } from '@/types/users.type'
import UserTable from './UserTable'
import SearchUser from './SearchUser'

type Props = {
  searchParams: UserSearchParams
}

export default function Users({ searchParams }: Props) {
  return (
    <div>
      <SearchUser />
      <UserTable searchParams={searchParams} />
    </div>
  )
}
