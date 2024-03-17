export type BidResponse = {
  id: number
  auctionId: number
  bidder: string
  bidTime: string
  bidderName: string
  amount: number
}

export type BidRequest = {
  userId: string
  auctionId: number
  bidAmount: number
}
