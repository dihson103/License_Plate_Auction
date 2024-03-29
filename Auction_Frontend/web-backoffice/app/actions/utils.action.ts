import { ApiError, ProvinceResponse } from '@/types/utils.type'

export const fetchApi = async <T>(
  url: string,
  bodyJson: string | null,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
): Promise<T> => {
  const result = await fetch(url, {
    method: method,
    body: bodyJson,
    headers: {
      'Content-type': 'application/json'
    }
  })

  if (!result.ok) {
    const errorJsonData = await result.json()
    const error = errorJsonData as ApiError
    throw new Error(error.message)
  }

  if (result.status === 204) {
    return 'Action is success' as T
  }

  const jsonData = await result.json()

  return jsonData as T
}

export const baseUrl = 'http://localhost:6001'

export const getProvinces = async (): Promise<ProvinceResponse> => {
  const result = await fetch('https://vapi.vnappmob.com/api/province')
  if (!result.ok) throw new Error('Failed to fetch data')
  return result.json()
}
