import { AdminSearchParam } from '@/types/admins.type'
import AdminTable from './AdminTable'
import SearchAdmin from './SearchAdmin'
import { Suspense } from 'react'
import AppLoading from '../components/AppLoading'

type Props = {
  searchParams: AdminSearchParam
}

export default function Admins({ searchParams }: Props) {
  return (
    <div>
      <Suspense fallback={<AppLoading />}>
        <SearchAdmin />
        <AdminTable searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
