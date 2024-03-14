import React from 'react'
import { AuctionListConfig } from '../types/auction.type'
import { getStatusFromSearchParams } from '../utils/utils'
import ItemListing from '../components/ItemListing'
import AppBanner from '../components/AppBanner'

type Props = {
  searchParams: AuctionListConfig
}

export default function Auctions({ searchParams }: Props) {
  const searchConfig: AuctionListConfig = {
    ...searchParams,
    status: getStatusFromSearchParams(searchParams.status)
  }
  return (
    <>
      <AppBanner />
      <main className='container mx-auto px-5 pt-10'>
        <ItemListing searchParams={searchConfig} />
      </main>
    </>
  )
}
