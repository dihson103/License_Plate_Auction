import BidItem from './BidItem'
import { convertNumberToVietNamMoney } from '@/app/utils/utils'
import { getBidsOfAuction } from '@/app/actions/bid.action'
import BidForm from './BidForm'

type Props = {
  startingPrice: number
  auctionId: number
}

export default async function BidList({ startingPrice, auctionId }: Props) {
  const bidsList = await getBidsOfAuction(auctionId)
  const currentHighBid = bidsList.reduce((prev, current) => (prev > current.amount ? prev : current.amount), 0)

  return (
    <div className='rounded-lg shadow bg-slate-50 dark:bg-gray-700'>
      <div className='py-2'>
        <div className='sticky top-0 p-2'>
          <h3 className='text-2xl font-semibold'>{`Current highest bid is ${convertNumberToVietNamMoney(currentHighBid)}`}</h3>
        </div>
      </div>

      <div className='h-[250px] overflow-auto flex flex-col-reverse px-2'>
        {bidsList.length === 0 ? (
          <div className='flex flex-col justify-center items-center h-full text-gray-600'>
            <h3 className='text-3xl font-semibold'>No bids for this item</h3>
            <span className='text-lg'>{`Starting price is ${convertNumberToVietNamMoney(startingPrice)}`}</span>
          </div>
        ) : (
          <>
            {bidsList.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </>
        )}
      </div>
      <BidForm currentHighestPrice={currentHighBid} auctionId={auctionId} />
    </div>
  )
}
