'use server'

import { AuctionSearchParam, SearchResponse } from '@/types/auctions.type'
import { baseUrl, fetchApi } from './utils.action'

export const getAuctions = (searchParams: AuctionSearchParam) => {
  const url = `${baseUrl}/search?Page=${searchParams.pageIndex || 1}&PageSize=4`
  return fetchApi<SearchResponse>(url, null, 'GET')
}
