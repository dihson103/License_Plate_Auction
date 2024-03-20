'use server'

import { AuctionResponse, SearchResponse } from '@/app/types/auction.type'
import { baseUrl, fetchApi, fetchApiWithOutCache } from './utils.action'
import { AuthResponse } from '../types/auth.type'

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

export const getDataDetail = async (id: number) => {
  const url = `${baseUrl}/auctions/${id}`
  return fetchApiWithOutCache<AuctionResponse>(url)
}

export const getAuctionsOfUser = async (user: AuthResponse) => {
  const url = `${baseUrl}/auctions/me`
  return fetchApi<AuctionResponse[]>(url, null, 'GET', user)
}
