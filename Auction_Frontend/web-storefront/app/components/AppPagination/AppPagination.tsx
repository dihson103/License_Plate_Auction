'use client'

import { Pagination } from 'flowbite-react'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  pageIndex: number
  totalPages: number
  setPageIndex: Dispatch<SetStateAction<number>>
}

export default function AppPagination({ pageIndex, totalPages, setPageIndex }: Props) {
  const [currentPage, setCurrentPage] = useState(pageIndex)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
    setPageIndex(page)
  }

  return (
    <div className='flex overflow-x-auto sm:justify-center'>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
    </div>
  )
}
