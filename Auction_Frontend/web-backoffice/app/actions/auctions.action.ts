'use server'

import { AuctionSearchParam, SearchResponse, UpdateAuction } from '@/types/auctions.type'
import { baseUrl, fetchApi } from './utils.action'
import { revalidatePath } from 'next/cache'
import { convertAuctionStatusToNumber } from '../utils/utils'

export const getAuctions = (searchParams: AuctionSearchParam) => {
  const url = `${baseUrl}/auctions/search?PageIndex=${searchParams.pageIndex || 1}&PageSize=4&Status=${convertAuctionStatusToNumber(searchParams.status || 'Pending')}&SearchTerm=${searchParams.searchTerm || ''}`
  return fetchApi<SearchResponse>(url, null, 'GET')
}

export const updateAuction = (auction: UpdateAuction) => {
  const url = `${baseUrl}/auctions/${auction.auctionId}`
  const bodyJson = JSON.stringify(auction)
  const result = fetchApi(url, bodyJson, 'PUT')
  revalidatePath('/auctions')
  return result
}
