'use client'

import { getAuctionsOfUser } from '@/app/actions/auction.action'
import { AuctionResponse } from '@/app/types/auction.type'
import { convertNumberToVietNamMoney } from '@/app/utils/utils'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function MyAuctionPage() {
  const { data: session, status } = useSession()
  const [auctions, setData] = useState<AuctionResponse[] | null>(null)

  useEffect(() => {
    if (!session?.user) return
    getAuctionsOfUser(session?.user)
      .then((data) => {
        setData(data)
      })
      .catch((error: Error) => {
        setData(null)
        toast.error('Auction not found')
      })
  }, [session?.user])

  if (!auctions) return <h3 className='text-xl text-gray-800'>User do not have any win auctions</h3>
  return (
    <div className='overflow-x-auto container mx-auto pt-10 min-h-[520px]'>
      <Table striped>
        <TableHead>
          <TableHeadCell>License plate</TableHeadCell>
          <TableHeadCell>City</TableHeadCell>
          <TableHeadCell>Kind of car</TableHeadCell>
          <TableHeadCell>License type</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell>
            <span className='sr-only'>View</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className='divide-y'>
          {auctions &&
            auctions.map((auction) => (
              <>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {auction.licensePlate}
                  </TableCell>
                  <TableCell>{auction.city}</TableCell>
                  <TableCell>{auction.kindOfCar}</TableCell>
                  <TableCell>{auction.licenseType}</TableCell>
                  <TableCell>{convertNumberToVietNamMoney(auction.currentHighBid ?? 0)}</TableCell>
                  <TableCell>
                    <Link
                      href={`${auction.id}`}
                      className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                    >
                      {"View auction's detail"}
                    </Link>
                  </TableCell>
                </TableRow>
              </>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
