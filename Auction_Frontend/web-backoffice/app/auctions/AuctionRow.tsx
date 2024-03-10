import { AuctionResponse } from '@/types/auctions.type'
import React from 'react'
import { convertNumberToVietNamMoney, convertUTCtoLocalDateTime } from '../utils/utils'
import UpdateAuctionButton from './UpdateAuctionButton'
import ChangeStatusButton from './ChangeStatusButton'

type props = {
  auction: AuctionResponse
}

export default function AuctionRow({ auction }: props) {
  return (
    <tr className='hover:bg-gray-100 dark:hover:bg-gray-700'>
      <td className='p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400'>
        <div className='text-base font-semibold text-gray-900 dark:text-white'>{auction.id}</div>
      </td>
      <td className='max-w-sm p-4 overflow-hidden text-base font-medium text-gray-900 truncate xl:max-w-xs dark:text-gray-400'>
        {auction.licensePlate}
      </td>
      <td className='p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white'>{auction.kindOfCar}</td>
      <td className='p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white'>
        {auction.licenseType}
      </td>
      <td className='p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white'>{auction.city}</td>
      <td className='p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white'>{auction.status}</td>
      <td className='p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white'>
        {convertNumberToVietNamMoney(auction.reservePrice)}
      </td>
      <td className='p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white'>
        {convertUTCtoLocalDateTime(auction.startDateTime) || 'Chưa có ngày bắt đầu'}
      </td>
      <td className='flex p-4 space-x-2 whitespace-nowrap'>
        <ChangeStatusButton auction={auction} />
        <UpdateAuctionButton auction={auction} />
      </td>
    </tr>
  )
}
