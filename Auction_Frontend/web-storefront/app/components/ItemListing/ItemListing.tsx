'use client'

import { getData } from '@/app/actions/auction.action'
import AppItem from '../AppItem'
import AppPagination from '../AppPagination'
import { AuctionListConfig, AuctionResponse } from '@/app/types/auction.type'
import SearchAuction from '../SearchAuction'
import { useEffect, useState } from 'react'
import Filter from '../Filter'

type Props = {
  searchParams: AuctionListConfig
}

export default function ItemListing({ searchParams }: Props) {
  const [auctions, setAuctions] = useState<AuctionResponse[] | null>(null)
  const [pageIndex, setPageIndex] = useState<number>(searchParams.page ?? 1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    getData(
      pageIndex,
      searchParams.licensePlate || '',
      searchParams.status || 'Live',
      searchParams.city || '',
      searchParams.kindOfCar || '',
      searchParams.licenseType || ''
    )
      .then((data) => {
        setAuctions(data.results)
        setTotalPages(data.totalPages)
        setIsNotFound(false)
      })
      .catch(() => {
        setIsNotFound(true)
      })
  }, [pageIndex, searchParams])

  if (auctions?.length === 0) return <h3>Loading ...</h3>

  return (
    <>
      <h1 className='text-4xl mb-10 mt-10 font-bold tracking-tight text-center text-gray-900 dark:text-white'>
        ĐẤU GIÁ BIỂN SỐ XE Ô TÔ
      </h1>
      <Filter status={searchParams.status} />
      <SearchAuction searchConfig={searchParams} />
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {!isNotFound && auctions?.map((item) => <AppItem auction={item} key={item.id} />)}
        {isNotFound && <h3>Not Found</h3>}
      </div>
      <div>
        {!isNotFound && <AppPagination pageIndex={pageIndex} totalPages={totalPages} setPageIndex={setPageIndex} />}
      </div>
    </>
  )
}
