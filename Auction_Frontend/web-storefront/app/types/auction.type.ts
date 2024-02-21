export type AuctionResponse = {
  id: number
  reservePrice: number
  winner: string | null
  currentHighBid: number | null
  startDateTime: string | null
  endDateTime: string
  createAt: string
  updateAt: string
  status: string
  licensePlate: string
  kindOfCar: string
  licenseType: string
  city: string
}

export type SearchResponse = {
  totalPages: number
  currentPage: number
  results: AuctionResponse[]
}

export type AuctionListConfig = {
  page?: number
  pageSize?: number
  status?: string
  licenseType?: string
  kindOfCar?: string
  city?: string
  licensePlate?: string
}
