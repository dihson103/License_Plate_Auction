import { BidResponse } from '@/app/types/bid.type'
import { convertNumberToVietNamMoney } from '@/app/utils/utils'

type Props = {
  bid: BidResponse
}

export default function BidItem({ bid }: Props) {
  return (
    <div className='border-gray-300 border-2 px-3 py-1 rounded-lg flex justify-between items-center mb-2 bg-green-200'>
      <div className='flex flex-col'>
        <span className='text-xl font-semibold'>Bidder: {bid.bidderName}</span>
        <span className='text-gray-700 text-sm'>{bid.bidTime}</span>
      </div>
      <div className='flex flex-col text-right'>
        <div className='text-xl font-semibold'>{convertNumberToVietNamMoney(bid.amount)}</div>
        <div className='flex flex-row items-center'>
          <span>{'Bid accepted'}</span>
        </div>
      </div>
    </div>
  )
}
