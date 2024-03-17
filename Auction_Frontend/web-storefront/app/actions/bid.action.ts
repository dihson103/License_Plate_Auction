import { BidRequest, BidResponse } from '../types/bid.type'
import { baseUrl, fetchApi, fetchApiWithOutCache } from './utils.action'

export const getBidsOfAuction = (id: number) => {
  const url = `${baseUrl}/bids/${id}`
  return fetchApiWithOutCache<BidResponse[]>(url)
}

export const bidAuction = ({ auctionId, amount }: { auctionId: number; amount: number }) => {
  const url = `${baseUrl}/bids`
  const userId = 'HE160021'
  const bidRequest: BidRequest = { userId, auctionId, bidAmount: amount }
  const jsonBody = JSON.stringify(bidRequest)
  const result = fetchApi(url, jsonBody, 'POST')
  return result
}
