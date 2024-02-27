import { ProvinceResponse } from '../types/util.type'

export const getProvinces = async (): Promise<ProvinceResponse> => {
  const result = await fetch('https://vapi.vnappmob.com/api/province')
  if (!result.ok) throw new Error('Failed to fetch data')
  return result.json()
}
