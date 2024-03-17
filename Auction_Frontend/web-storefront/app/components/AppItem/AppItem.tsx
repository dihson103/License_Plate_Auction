'use client'

import { Card } from 'flowbite-react'
import CountDownTimer from '../CountDownTimer'
import { AuctionResponse } from '@/app/types/auction.type'
import { useRouter } from 'next/navigation'
import CurrentHighBid from './CurrentHighBid'

interface props {
  auction: AuctionResponse
}

export default function AppItem({ auction }: props) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/auctions/${auction.id}`)
  }

  return (
    <div>
      <Card onClick={handleClick} className='max-w-sm h-40 relative  mb-5 hover:cursor-pointer'>
        <h5 className='text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white'>
          {auction.licensePlate}
        </h5>
        <div className='absolute bottom-2 left-2'>
          <CountDownTimer auctionEnd={auction.endDateTime} />
        </div>
        <div className='absolute top-2 right-2'>
          <CurrentHighBid amount={auction.currentHighBid || undefined} />
        </div>
      </Card>
    </div>
  )
}
