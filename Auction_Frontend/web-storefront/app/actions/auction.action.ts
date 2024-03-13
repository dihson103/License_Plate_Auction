'use server'

import { SearchResponse } from '@/app/types/auction.type'
import { baseUrl, fetchApi } from './utils.action'

export const getData = async (
  pageIndex: number = 1,
  licensePlate: string | undefined,
  status: string,
  city: string,
  kindOfCar: string,
  licenseType: string
): Promise<SearchResponse> => {
  const url = `${baseUrl}/search?Page=${pageIndex}&PageSize=4&LisensePlate=${licensePlate}&Status=${status}&City=${city}&KindOfCar=${kindOfCar}&LicenseType=${licenseType}`
  return fetchApi<SearchResponse>(url, null, 'GET')
}
