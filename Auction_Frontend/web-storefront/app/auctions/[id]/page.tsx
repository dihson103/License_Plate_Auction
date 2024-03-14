import { getDataDetail } from '@/app/actions/auction.action'
import CountDownTimer from '@/app/components/CountDownTimer'
import AuctionDetailTable from './AuctionDetailTable'

export default async function page({ params }: { params: { id: number } }) {
  const auction = await getDataDetail(params.id)
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
      <div className='grid grid-cols-2 gap-6 mt-5'>
        <div className='w-full bg-gray-200 rounded-lg overflow-hidden'>
          <h3 className='text-7xl font-semibold text-center mt-5 mb-5'>{auction.licensePlate}</h3>
          <AuctionDetailTable auction={auction} />
        </div>
        <div className='border-2 rounded-lg p-2 bg-gray-100'>
          <h3>Bid</h3>
        </div>
      </div>
    </div>
  )
}
