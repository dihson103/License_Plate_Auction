'use server'

import { cookies } from 'next/headers'
import { LoginFormSchema } from '../rules/auth.rule'
import { baseUrl, fetchApi } from './utils.action'
import { AuthResponse } from '@/types/auth.type'

export const login = async (loginReqest: LoginFormSchema) => {
  const url = `${baseUrl}/auth/admin`
  const bodyJson = JSON.stringify({ user: loginReqest.email, password: loginReqest.password })
  const result = await fetchApi<AuthResponse>(url, bodyJson, 'POST')
  return result
}

export const setAuthToCookie = (data: AuthResponse) => {
  cookies().set('api-auth', JSON.stringify(data), { httpOnly: true })
}

export const deleteAuthCookie = () => {
  cookies().delete('api-auth')
}

export const getAuthFromCookie = () => {
  const authCookie = cookies().get('api-auth')
  if (!authCookie) return null

  try {
    const auth = JSON.parse(authCookie.value) as AuthResponse
    return auth
  } catch (error) {
    return null
  }
}
