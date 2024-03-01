import { AdminSearchParam } from '@/types/admins.type'
import AdminTable from './AdminTable'
import SearchAdmin from './SearchAdmin'

type Props = {
  searchParams: AdminSearchParam
}

export default function Admins({ searchParams }: Props) {
  return (
    <div>
      <SearchAdmin />
      <AdminTable searchParams={searchParams} />
    </div>
  )
}
