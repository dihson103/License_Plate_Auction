import { TableCell, TableRow } from 'flowbite-react'
import { UpdateUserStats, UserResponse } from '@/types/users.type'
import { toast } from 'react-toastify'
import UpdateUserButton from './UpdateUserButton'
import DeleteButton from '@/app/components/DeleteButton'
import { updateUserStatus } from '@/app/actions/users.action'

type Props = {
  user: UserResponse
}

export default function UserRow({ user }: Props) {
  const handleUpdateStatus = (updateStatusRequest: UpdateUserStats) => () => {
    updateUserStatus(updateStatusRequest)
      .then(() => {
        toast.success(`${updateStatusRequest.status ? 'Unban' : 'Ban'} user success`)
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  }

  return (
    <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
      <TableCell>{user.id}</TableCell>
      <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{user.fullName}</TableCell>

      <TableCell>{user.email}</TableCell>
      <TableCell>{user.birthDate.substring(0, 10)}</TableCell>
      <TableCell className='whitespace-nowrap'>{user.address}</TableCell>
      <TableCell>{user.wallet}</TableCell>
      <TableCell>{user.status ? 'ACTIVE' : 'INACTIVE'}</TableCell>
      <TableCell className='flex space-x-2'>
        <DeleteButton
          question={`Bạn có chắc chắn muốn thay đổi trạng thái của người dùng: ${user.fullName}`}
          callBackFunction={handleUpdateStatus({ id: user.id, status: !user.status })}
        />
        <UpdateUserButton user={user} />
      </TableCell>
    </TableRow>
  )
}
