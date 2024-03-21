'use client'

import Countdown, { zeroPad } from 'react-countdown'

interface Props {
  auctionEnd: string
}

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed
}: {
  days: number
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}) => {
  return (
    <div
      className={`border-2 border-white text-white py-1 px-1 rounded-lg justify-center ${completed ? 'bg-red-600' : days === 0 && hours < 10 ? 'bg-amber-600' : 'bg-green-600'}`}
    >
      {completed ? (
        <span>Finished</span>
      ) : (
        <span suppressHydrationWarning>
          {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )}
    </div>
  )
}

export default function CountDownTimer({ auctionEnd }: Props) {
  const endDate = new Date(auctionEnd)
  endDate.setHours(endDate.getHours() - 7)
  return (
    <div>
      <Countdown date={endDate} renderer={renderer} />
    </div>
  )
}
