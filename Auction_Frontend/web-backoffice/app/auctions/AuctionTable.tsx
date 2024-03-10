'use client'

import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import AppPagination from '../components/AppPagination'
import { AuctionResponse, AuctionSearchParam } from '@/types/auctions.type'
import AuctionRow from './AuctionRow'
import { getAuctions } from '../actions/auctions.action'
import { toast } from 'react-toastify'

type Props = {
  searchParams: AuctionSearchParam
}

export default function AuctionTable({ searchParams }: Props) {
  const [totalPages, setTotalPages] = useState<number>(0)
  const [auctionList, setAuctionList] = useState<AuctionResponse[]>()

  useEffect(() => {
    getAuctions(searchParams)
      .then((data) => {
        setAuctionList(data.results)
        setTotalPages(data.totalPages)
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  }, [searchParams])

  return (
    <div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden shadow'>
              <table className='min-w-full divide-y divide-gray-300 table-fixed dark:divide-gray-600'>
                <thead className='bg-gray-200 dark:bg-gray-700'>
                  <tr>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                      Id
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left whitespace-nowrap text-gray-500 uppercase dark:text-gray-400'
                    >
                      License Plate
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left whitespace-nowrap text-gray-500 uppercase dark:text-gray-400'
                    >
                      Kind Of Car
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left whitespace-nowrap text-gray-500 uppercase dark:text-gray-400'
                    >
                      License Type
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left whitespace-nowrap text-gray-500 uppercase dark:text-gray-400'
                    >
                      City
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left whitespace-nowrap text-gray-500 uppercase dark:text-gray-400'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left whitespace-nowrap text-gray-500 uppercase dark:text-gray-400'
                    >
                      Starting price
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left whitespace-nowrap text-gray-500 uppercase dark:text-gray-400'
                    >
                      Start date
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                  {auctionList && auctionList.map((item) => <AuctionRow key={item.id} auction={item} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AppPagination pageIndex={searchParams.pageIndex || 1} totalPages={totalPages} />
    </div>
  )
}
