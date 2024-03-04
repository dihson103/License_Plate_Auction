'use server'

import {
  CreateUserRequest,
  SearchUserResponse,
  UpdateUserRequest,
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

export const banUser = (id: number) => {
  const url = `${baseUrl}/users/${id}`
  const result = fetchApi(url, null, 'DELETE')
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
