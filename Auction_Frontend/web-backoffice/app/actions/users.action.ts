import { SearchUserResponse, UserSearchParams } from '@/types/users.type'
import { baseUrl, fetchApi } from './utils.action'

const getListUserTag = ['users']

export const getUsers = (searchParam: UserSearchParams): Promise<SearchUserResponse> => {
  const url = `${baseUrl}/users?status=${searchParam.status || true}&SearchValue=${searchParam.searchValue || ''}&PageIndex=${searchParam.pageIndex || 1}&PageSize=${searchParam.pageSize || 4}`
  return fetchApi<SearchUserResponse>(url, null, 'GET')
}
