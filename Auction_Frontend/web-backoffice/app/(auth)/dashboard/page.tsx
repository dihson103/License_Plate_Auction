import React from 'react'
import AppCard from './AppCard'
import { RiAuctionFill } from 'react-icons/ri'
import { FaRegUser } from 'react-icons/fa6'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { getAuctionCardInformation } from '@/app/actions/auctions.action'
import { countUsers } from '@/app/actions/users.action'
import { convertNumberToVietNamMoney } from '@/app/utils/utils'

export default async function Dashboard() {
  const cardAuction = await getAuctionCardInformation()
  const userCount = await countUsers()
  return (
    <main className='grid grid-cols-4 gap-4'>
      <AppCard
        name='Total living'
        value={cardAuction.totalLive}
        icon={<RiAuctionFill size={60} className='text-blue-400' />}
      />
      <AppCard
        name='Total finished'
        value={cardAuction.totalFinished}
        icon={<RiAuctionFill size={60} className='text-green-400' />}
      />
      <AppCard
        name='Total users'
        value={userCount.totalUsers}
        icon={<FaRegUser size={60} className='text-red-400' />}
      />
      <AppCard
        name='Total Money'
        value={convertNumberToVietNamMoney(cardAuction.totalMoney)}
        icon={<FaRegMoneyBillAlt size={60} className='text-orange-400' />}
      />
    </main>
  )
}
