import { Card } from 'flowbite-react'
import CountDownTimer from '../CountDownTimer'

interface props {
  auction: string
}

export default function AppItem({ auction }: props) {
  return (
    <div className=''>
      <Card href='#' className='max-w-sm h-40 relative  mb-5'>
        <h5 className='text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white'>{auction}</h5>
        <div className='absolute bottom-2 left-2'>
          <CountDownTimer auctionEnd={(Date.now() + 5000).toString()} />
        </div>
      </Card>
    </div>
  )
}
