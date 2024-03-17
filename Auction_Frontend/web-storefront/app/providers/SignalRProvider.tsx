'use client'

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { ReactNode, useEffect, useState } from 'react'
import { useBidsStore } from '../hooks/useBidsStore'
import { baseUrl } from '../actions/utils.action'
import { BidResponse } from '../types/bid.type'

type Props = {
  children: ReactNode
}

export default function SignalrProvider({ children }: Props) {
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const addBid = useBidsStore((state) => state.addBid)

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/notifications`)
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
      })
    }

    return () => {
      connection?.stop()
    }
  }, [connection, addBid])

  return children
}
