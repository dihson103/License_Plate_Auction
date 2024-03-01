import { SearchUserResponse, UserSearchParams } from '@/types/users.type'

export const getUsers = async (searchParam: UserSearchParams): Promise<SearchUserResponse> => {
  const result = await fetch(
    `http://localhost:6001/users?status=${searchParam.status || true}&SearchValue=${searchParam.searchValue || ''}&PageIndex=${searchParam.pageIndex || 1}&PageSize=${searchParam.pageSize || 4}`
  )
  if (!result.ok) throw Error('Fail to fetch users')
  return result.json()
}
