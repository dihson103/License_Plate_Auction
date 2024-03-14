import { AuctionResponse } from '@/app/types/auction.type'
import { convertNumberToVietNamMoney, convertUTCtoLocalDateTimeUTC } from '@/app/utils/utils'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'

type Props = {
  auction: AuctionResponse
}

export default function AuctionDetailTable({ auction }: Props) {
  return (
    <div className='overflow-x-auto'>
      <Table striped>
        <TableBody className='divide-y'>
          <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{'City'}</TableCell>
            <TableCell>{auction.city}</TableCell>
          </TableRow>
          <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {'Kind of car'}
            </TableCell>
            <TableCell>{auction.kindOfCar}</TableCell>
          </TableRow>
          <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {'License type'}
            </TableCell>
            <TableCell>{auction.licenseType}</TableCell>
          </TableRow>
          <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {'Start Price'}
            </TableCell>
            <TableCell>{convertNumberToVietNamMoney(auction.reservePrice)}</TableCell>
          </TableRow>
          <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {'Start date at'}
            </TableCell>
            <TableCell>{convertUTCtoLocalDateTimeUTC(auction.startDateTime || '').replace('T', ' ')}</TableCell>
          </TableRow>
          <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{'Status'}</TableCell>
            <TableCell>{auction.status}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
