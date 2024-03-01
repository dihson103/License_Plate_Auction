import { AdminSearchParam, AdminsSearchResponse } from '@/types/admins.type'
import { ApiError } from '@/types/utils.type'

export const getAdmins = async (searchParam: AdminSearchParam): Promise<AdminsSearchResponse> => {
  const result = await fetch(
    `http://localhost:6001/admins?SearchValue=${searchParam.searchValue || ''}&PageIndex=${searchParam.pageIndex || 1}&PageSize=${searchParam.pageSize || 4}`
  )
  if (!result.ok) {
    const error = (await result.json()) as ApiError
    throw Error(error.message)
  }
  return result.json()
}
