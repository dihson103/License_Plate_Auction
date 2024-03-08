'use client'

import { UserResponse, UserSearchParams } from '@/types/users.type'
import { useEffect, useState } from 'react'
import { getUsers } from '../actions/users.action'
import { toast } from 'react-toastify'
import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-react'
import AppPagination from '../components/AppPagination'
import UserRow from './UserRow'

type Props = {
  searchParams: UserSearchParams
}

export default function UserTable({ searchParams }: Props) {
  const [userList, setUserList] = useState<UserResponse[] | null>(null)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    getUsers(searchParams)
      .then((data) => {
        setUserList(data.result)
        setTotalPages(data.totalPage)
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  }, [searchParams])

  return (
    <div>
      <Table hoverable className='min-w-full divide-y divide-gray-200 dark:divide-gray-600'>
        <TableHead>
          <TableHeadCell>User Id</TableHeadCell>
          <TableHeadCell>Full Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Date of birth</TableHeadCell>
          <TableHeadCell>Address</TableHeadCell>
          <TableHeadCell>Wallet</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className='divide-y'>
          {userList && userList.map((item) => <UserRow key={item.id} user={item} />)}
        </TableBody>
      </Table>
      <AppPagination pageIndex={searchParams.pageIndex || 1} totalPages={totalPages} />
    </div>
  )
}
