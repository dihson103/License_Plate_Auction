import { TableCell, TableRow } from 'flowbite-react'
import DeleteButton from '../components/DeleteButton'
import EditButton from '../components/EditButton'
import { AdminResponse } from '@/types/admins.type'
import { deleteAdmin } from '../actions/admins.action'
import { toast } from 'react-toastify'
import CreateAdminForm from './CreateAdminForm'
import UpdateAdminForm from './UpdateAdminForm'

type Props = {
  admin: AdminResponse
}

export default function AdminRow({ admin }: Props) {
  const deleteAction = (id: number) => () => {
    deleteAdmin(id)
      .then(() => {
        toast.success(`Delete admin has id: ${id} success`)
      })
      .catch((error: Error) => {
        console.log('>>> error', error)
        toast.error(error.message)
      })
  }

  return (
    <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
      <TableCell>{admin.id}</TableCell>
      <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{admin.fullName}</TableCell>

      <TableCell>{admin.email}</TableCell>
      <TableCell className='flex space-x-2'>
        <DeleteButton
          question={`Are you sure you want to delete admin has name: ${admin.fullName}?`}
          callBackFunction={deleteAction(admin.id)}
        />
        <EditButton headerContent={`Update admin has id: ${admin.id}`}>
          <UpdateAdminForm id={admin.id} />
        </EditButton>
      </TableCell>
    </TableRow>
  )
}
