'use client'

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { ReactNode, useEffect, useState } from 'react'
import { useBidsStore } from '../hooks/useBidsStore'
import { BidResponse } from '../types/bid.type'
import { useWallet } from '../hooks/useWallet'
import { PaymentSignlr } from '../types/payment.type'

type Props = {
  children: ReactNode
}

export default function SignalrProvider({ children }: Props) {
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const addBid = useBidsStore((state) => state.addBid)
  const addWallet = useWallet((state) => state.addWallet)
  // const { data: session } = useSession()

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_NOTIFICATION_API_URL!)
      .withAutomaticReconnect()
      .build()
    setConnection(newConnection)
  }, [])

  useEffect(() => {
    if (connection) {
      connection.start().then(() => {
        console.log('Connection to notification hub')

        connection.on('BidPlaced', (bid: BidResponse) => {
          console.log('Bid placed event received')
          addBid(bid)
        })

        connection.on(`Payment-success`, (payment: PaymentSignlr) => {
          console.log('Payment event received', payment)
          addWallet(payment.amount, payment.userId)
        })
      })
    }

    return () => {
      connection?.stop()
    }
  }, [connection, addBid, addWallet])

  return children
}
