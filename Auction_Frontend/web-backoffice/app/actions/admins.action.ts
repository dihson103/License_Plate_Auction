'use server'

import {
  AdminResponse,
  AdminSearchParam,
  AdminsSearchResponse,
  CreateAdminRequest,
  UpdateAdminRequest
} from '@/types/admins.type'
import { baseUrl, fetchApi } from './utils.action'
import { revalidatePath } from 'next/cache'

export const getAdmins = (searchParam: AdminSearchParam): Promise<AdminsSearchResponse> => {
  const url = `${baseUrl}/admins?SearchValue=${searchParam.searchValue || ''}&PageIndex=${searchParam.pageIndex || 1}&PageSize=${searchParam.pageSize || 4}`
  return fetchApi<AdminsSearchResponse>(url, null, 'GET')
}

export const getAdmin = (id: number): Promise<AdminResponse> => {
  const url = `${baseUrl}/admins/${id}`
  return fetchApi<AdminResponse>(url, null, 'GET')
}

export const deleteAdmin = (id: number) => {
  const url = `${baseUrl}/admins/${id}`
  const result = fetchApi(url, null, 'DELETE')
  revalidatePath('/admins')
  return result
}

export const updateAdmin = (admin: UpdateAdminRequest) => {
  const url = `${baseUrl}/admins/${admin.id}`
  const body = JSON.stringify(admin)
  const result = fetchApi(url, body, 'PUT')
  revalidatePath('/admins')
  return result
}

export const createAdmin = (admin: CreateAdminRequest) => {
  const url = `${baseUrl}/admins`
  const body = JSON.stringify(admin)
  const result = fetchApi<AdminResponse>(url, body, 'POST')
  revalidatePath('/admins')
  return result
}
