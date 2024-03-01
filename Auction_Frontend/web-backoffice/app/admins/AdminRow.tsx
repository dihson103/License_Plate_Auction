import { TableCell, TableRow } from 'flowbite-react'
import DeleteButton from '../components/DeleteButton'
import EditButton from '../components/EditButton'
import { AdminResponse } from '@/types/admins.type'

type Props = {
  admin: AdminResponse
}

export default function AdminRow({ admin }: Props) {
  return (
    <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
      <TableCell>{admin.id}</TableCell>
      <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{admin.fullName}</TableCell>

      <TableCell>{admin.email}</TableCell>
      <TableCell className='flex space-x-2'>
        <DeleteButton />
        <EditButton />
      </TableCell>
    </TableRow>
  )
}
