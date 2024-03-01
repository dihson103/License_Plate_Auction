'use client'

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { AdminResponse, AdminSearchParam } from '@/types/admins.type'
import { useEffect, useState } from 'react'
import { getAdmins } from '../actions/admins.action'
import { toast } from 'react-toastify'
import AdminRow from './AdminRow'
import AppPagination from '../components/AppPagination'

type Props = {
  searchParams: AdminSearchParam
}

export default function AdminTable({ searchParams }: Props) {
  const [adminList, setAdminList] = useState<AdminResponse[] | null>(null)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    getAdmins(searchParams)
      .then((data) => {
        setAdminList(data.result)
        setTotalPages(data.totalPage)
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  }, [searchParams])

  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Admin Id</TableHeadCell>
          <TableHeadCell>Admin Name</TableHeadCell>
          <TableHeadCell>Admin Email</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className='divide-y'>
          {adminList && adminList.map((item) => <AdminRow key={item.id} admin={item} />)}
        </TableBody>
      </Table>
      <AppPagination pageIndex={searchParams.pageIndex || 1} totalPages={totalPages} />
    </div>
  )
}
