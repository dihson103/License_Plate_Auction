import { TableCell, TableRow } from 'flowbite-react'
import DeleteButton from '../components/DeleteButton'
import EditButton from '../components/EditButton'
import { UserResponse } from '@/types/users.type'

type Props = {
  user: UserResponse
}

export default function UserRow({ user }: Props) {
  return (
    <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
      <TableCell>{user.id}</TableCell>
      <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{user.fullName}</TableCell>

      <TableCell>{user.email}</TableCell>
      <TableCell>{user.birthDate.substring(0, 10)}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>{user.wallet}</TableCell>
      <TableCell>{user.status ? 'ACTIVE' : 'INACTIVE'}</TableCell>
      <TableCell className='flex space-x-2'>
        <DeleteButton />
        <EditButton />
      </TableCell>
    </TableRow>
  )
}
