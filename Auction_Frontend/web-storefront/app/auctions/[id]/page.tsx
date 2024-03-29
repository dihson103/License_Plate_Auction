import { getDataDetail } from '@/app/actions/auction.action'
import CountDownTimer from '@/app/components/CountDownTimer'
import AuctionDetailTable from './AuctionDetailTable'
import BidList from './BidList'

export default async function page({ params }: { params: { id: number } }) {
  const auction = await getDataDetail(params.id)
  console.log(auction)
  return (
    <div className='container mx-auto pt-10'>
      <div className='flex justify-between'>
        <div>
          <h3 className='text-2xl font-semibold'>{"Auction's detail"}</h3>
        </div>
        <div className='flex justify-end gap-3'>
          <h3 className='text-2xl font-semibold'>Time remaining:</h3>
          <CountDownTimer auctionEnd={auction.endDateTime} />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-6 mt-5 mb-5'>
        <div className='w-full bg-gray-200 rounded-lg overflow-hidden flex flex-col justify-center items-center h-full'>
          <h3 className='text-8xl font-semibold'>{auction.licensePlate}</h3>
        </div>
        <BidList startingPrice={auction.reservePrice} isLive={auction.status === 'Live'} auctionId={auction.id} />
      </div>
      <AuctionDetailTable auction={auction} />
    </div>
  )
}
