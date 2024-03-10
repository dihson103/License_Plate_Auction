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

export type AuctionSearchParam = {
  pageIndex?: number
  pageSize?: number
  status?: string
  searchTerm?: string
}

export type UpdateAuction = {
  startDateTime?: string | null
  endDateTime?: string | null
  auctionId: number
  licensePlate: string
  kindOfCar: string
  licenseType: string
  city: string
  status: number
  reservePrice: number
}

export type CreateAuction = {
  startDateTime: string
  endDateTime: string
  licensePlate: string
  kindOfCar: string
  licenseType: string
  city: string
  status: string
  reservePrice: number
}
