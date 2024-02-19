'use client'

import { getData } from '@/app/actions/auction.action'
import AppItem from '../AppItem'
import AppPagination from '../AppPagination'
import { useEffect, useState } from 'react'
import { AuctionResponse } from '@/app/types/auction.type'

export default function ItemListing() {
  const [auctions, setAuctions] = useState<AuctionResponse[] | null>(null)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    getData(pageIndex).then((data) => {
      setAuctions(data.results)
      setTotalPages(data.totalPages)
    })
  }, [pageIndex])

  if (auctions?.length === 0) return <h3>Loading ...</h3>

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {auctions?.map((item) => <AppItem auction={item} key={item.id} />)}
      </div>
      <div>
        <AppPagination pageIndex={pageIndex} totalPages={totalPages} setPageIndex={setPageIndex} />
      </div>
    </>
  )
}
