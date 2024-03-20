import { UserSearchParams } from '@/types/users.type'
import UserTable from './UserTable'
import SearchUser from './SearchUser'
import { Suspense } from 'react'
import AppLoading from '@/app/components/AppLoading'

type Props = {
  searchParams: UserSearchParams
}

export default function Users({ searchParams }: Props) {
  return (
    <div>
      <Suspense fallback={<AppLoading />}>
        <SearchUser />
        <UserTable searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
