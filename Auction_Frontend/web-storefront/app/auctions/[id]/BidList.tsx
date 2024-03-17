import { BidResponse } from '@/app/types/bid.type'
import BidItem from './BidItem'
import { Button, TextInput } from 'flowbite-react'
import { IoSendOutline } from 'react-icons/io5'
import { convertNumberToVietNamMoney } from '@/app/utils/utils'

const intitalBids: BidResponse[] = [
  {
    auctionId: 1,
    id: 2,
    bidder: 'He160021',
    bidderName: 'nguyen dinh son',
    bidTime: '17/03/2024 22:08',
    amount: 210
  },
  {
    auctionId: 1,
    id: 3,
    bidder: 'He160022',
    bidderName: 'nguyen huyen trang',
    bidTime: '17/03/2024 22:10',
    amount: 220
  },
  {
    auctionId: 1,
    id: 4,
    bidder: 'He160021',
    bidderName: 'nguyen dinh son',
    bidTime: '17/03/2024 22:12',
    amount: 300
  },
  {
    auctionId: 1,
    id: 2,
    bidder: 'He160021',
    bidderName: 'nguyen dinh son',
    bidTime: '17/03/2024 22:08',
    amount: 210
  },
  {
    auctionId: 1,
    id: 2,
    bidder: 'He160021',
    bidderName: 'nguyen dinh son',
    bidTime: '17/03/2024 22:08',
    amount: 210
  },
  {
    auctionId: 1,
    id: 2,
    bidder: 'He160021',
    bidderName: 'nguyen dinh son',
    bidTime: '17/03/2024 22:08',
    amount: 210
  }
]

type Props = {
  startingPrice: number
}

export default function BidList({ startingPrice }: Props) {
  const currentHighBid = intitalBids.reduce((prev, current) => (prev > current.amount ? prev : current.amount), 0)

  return (
    <div className='rounded-lg shadow bg-slate-50 dark:bg-gray-700'>
      <div className='py-2'>
        <div className='sticky top-0 p-2'>
          <h3 className='text-2xl font-semibold'>{`Current highest bid is ${convertNumberToVietNamMoney(currentHighBid)}`}</h3>
        </div>
      </div>

      <div className='h-[250px] overflow-auto flex flex-col-reverse px-2'>
        {intitalBids.length === 0 ? (
          <div className='flex flex-col justify-center items-center h-full text-gray-600'>
            <h3 className='text-3xl font-semibold'>No bids for this item</h3>
            <span className='text-lg'>{`Starting price is ${convertNumberToVietNamMoney(startingPrice)}`}</span>
          </div>
        ) : (
          <>
            {intitalBids.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </>
        )}
      </div>
      <div className='flex items-center px-3 py-2 rounded-lg'>
        <TextInput type='number' className='flex-grow mr-2' placeholder='Input your bid amount' />
        <Button gradientMonochrome='teal' type='button'>
          <IoSendOutline size={20} />
        </Button>
      </div>
    </div>
  )
}
