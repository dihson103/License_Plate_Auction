import { AdminSearchParam, AdminsSearchResponse } from '@/types/admins.type'

export const getAdmins = async (searchParam: AdminSearchParam): Promise<AdminsSearchResponse> => {
  const result = await fetch(
    `http://localhost:6001/admins?SearchValue=${searchParam.searchValue || ''}&PageIndex=${searchParam.pageIndex || 1}&PageSize=${searchParam.pageSize || 4}`
  )
  if (!result.ok) throw Error('Fetch admins fails.')
  return result.json()
}
