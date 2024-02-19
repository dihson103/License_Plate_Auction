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
