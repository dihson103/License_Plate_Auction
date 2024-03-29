'use client'

import { bidAuction } from '@/app/actions/bid.action'
import { Button, TextInput } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { IoSendOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'

type Props = {
  currentHighestPrice: number
  auctionId: number
  isLive: boolean
}

export default function BidForm({ currentHighestPrice, auctionId, isLive }: Props) {
  const [amount, setAmount] = useState<number | null>(null)
  const { data: session } = useSession()
  const isAuthenticated = session?.user ? true : false

  const handleBid = () => {
    if (!isLive) {
      toast.error('The auction is not live')
      return
    }

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

    if (session?.user == null) {
      return
    }

    bidAuction({ auctionId, amount, user: session.user })
      .then((data) => {
        toast.success('Send bid auction request success')
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  }

  if (!isAuthenticated) return <h3>Login to bid</h3>

  return (
    <div className='flex items-center px-3 py-2 rounded-lg'>
      <TextInput
        type='number'
        className='flex-grow mr-2'
        value={amount === null ? '' : amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder='Input your bid amount'
        readOnly={!isLive}
      />
      <Button gradientMonochrome='teal' onClick={handleBid} type='button'>
        <IoSendOutline size={20} />
      </Button>
    </div>
  )
}
