import { url } from 'inspector'
import { ApiError, ProvinceResponse } from '../types/util.type'
import { AuthResponse } from '../types/auth.type'

export const getProvinces = async (): Promise<ProvinceResponse> => {
  const result = await fetch('https://vapi.vnappmob.com/api/province')
  if (!result.ok) throw new Error('Failed to fetch data')
  return result.json()
}

const getUserInformationFromSession = () => {}

export const fetchApi = async <T>(
  url: string,
  body: string | null,
  method: 'GET' | 'POST' | 'PATCH',
  user?: AuthResponse
) => {
  const result = await fetch(url, {
    method: method,
    body: body,
    headers: user
      ? {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
          'x-api-key': user.publicKey
        }
      : {
          'Content-type': 'application/json'
        }
  })

  if (!result.ok) {
    const errorJsonData = await result.json()
    const error = errorJsonData as ApiError
    throw new Error(error.message)
  }

  if (result.status >= 400) {
    return 'Unauth' as T
  }

  if (result.status === 204) {
    return 'Action is success' as T
  }

  const jsonData = await result.json()

  return jsonData as T
}

export const baseUrl = 'http://localhost:6001'

export const fetchApiWithOutCache = async <T>(url: string) => {
  const result = await fetch(url, { cache: 'no-cache' })
  if (!result.ok) {
    const errorJsonData = await result.json()
    const error = errorJsonData as ApiError
    throw new Error(error.message)
  }

  const jsonData = await result.json()
  return jsonData as T
}
