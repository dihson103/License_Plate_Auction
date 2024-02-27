'use client'

import { Pagination } from 'flowbite-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

interface Props {
  pageIndex: number
  totalPages: number
  setPageIndex: Dispatch<SetStateAction<number>>
}

export default function AppPagination({ pageIndex, totalPages, setPageIndex }: Props) {
  const [currentPage, setCurrentPage] = useState(pageIndex)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { push } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('page', term)
    } else {
      params.delete('page')
    }
    push(`${pathname}?${params.toString()}`)
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
    handleSearch(page.toString())
    setPageIndex(page)
  }

  return (
    <div className='flex overflow-x-auto sm:justify-center'>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
    </div>
  )
}
