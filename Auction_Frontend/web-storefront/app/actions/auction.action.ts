'use server'

import { SearchResponse } from '@/app/types/auction.type'

export const getData = async (
  pageIndex: number = 1,
  licensePlate: string | undefined,
  status: string,
  city: string,
  kindOfCar: string,
  licenseType: string
): Promise<SearchResponse> => {
  console.log(licenseType)
  const result = await fetch(
    `http://localhost:6001/search?Page=${pageIndex}&PageSize=4&LisensePlate=${licensePlate}&Status=${status}&City=${city}&KindOfCar=${kindOfCar}&LicenseType=${licenseType}`
  )

  if (!result.ok) throw new Error('Failed to fetch data')

  return result.json()
}
