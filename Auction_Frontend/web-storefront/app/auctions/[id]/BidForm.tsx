'use client'

import { bidAuction } from '@/app/actions/bid.action'
import { Button, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { IoSendOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'

type Props = {
  currentHighestPrice: number
  auctionId: number
}

export default function BidForm({ currentHighestPrice, auctionId }: Props) {
  const [amount, setAmount] = useState<number | null>(null)

  const handleBid = () => {
    if (amount == null) {
      toast.error('Please input bid amount')
      setAmount(null)
      return
    }

    if (!Number.isInteger(amount)) {
      toast.error('Please input an integer bid amount')
      setAmount(null)
      return
    }

    if (amount <= currentHighestPrice) {
      toast.error('Please input bid amount more than current highest price')
      setAmount(null)
      return
    }

    bidAuction({ auctionId, amount })
      .then((data) => {
        toast.success('Send bid auction request success')
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  }

  return (
    <div className='flex items-center px-3 py-2 rounded-lg'>
      <TextInput
        type='number'
        className='flex-grow mr-2'
        value={amount === null ? '' : amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder='Input your bid amount'
      />
      <Button gradientMonochrome='teal' onClick={handleBid} type='button'>
        <IoSendOutline size={20} />
      </Button>
    </div>
  )
}
