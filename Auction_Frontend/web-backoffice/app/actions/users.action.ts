'use server'

import {
  SearchUserResponse,
  UpdateUserRequest,
  UpdateUserStats,
  UserResponse,
  UserSearchParams
} from '@/types/users.type'
import { baseUrl, fetchApi } from './utils.action'
import { revalidatePath } from 'next/cache'
import { CreateUserFormSchema } from '../rules/users.rule'

export const getUsers = (searchParam: UserSearchParams): Promise<SearchUserResponse> => {
  const url = `${baseUrl}/users?status=${searchParam.status || true}&SearchValue=${searchParam.searchValue || ''}&PageIndex=${searchParam.pageIndex || 1}&PageSize=${searchParam.pageSize || 4}`
  return fetchApi<SearchUserResponse>(url, null, 'GET')
}

export const registerUser = (user: CreateUserFormSchema) => {
  const url = `${baseUrl}/users/register`
  const bodyJson = JSON.stringify(user)
  const result = fetchApi<UserResponse>(url, bodyJson, 'POST')
  revalidatePath('/users')
  return result
}

export const updateUserStatus = (updateRequest: UpdateUserStats) => {
  const url = `${baseUrl}/users/${updateRequest.id}/status`
  const bodyJson = JSON.stringify(updateRequest)
  const result = fetchApi(url, bodyJson, 'PATCH')
  revalidatePath('/users')
  return result
}

export const updateUser = (user: UpdateUserRequest) => {
  const url = `${baseUrl}/users/${user.id}`
  const bodyJson = JSON.stringify(user)
  const result = fetchApi(url, bodyJson, 'PUT')
  revalidatePath('/users')
  return result
}
