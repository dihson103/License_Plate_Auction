'use client'

import { Pagination } from 'flowbite-react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  pageIndex: number
  totalPages: number
}

export default function AppPagination({ pageIndex, totalPages }: Props) {
  const [currentPage, setCurrentPage] = useState(pageIndex)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { push } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams || '')
    if (term) {
      params.set('pageIndex', term)
    } else {
      params.delete('pageIndex')
    }
    push(`${pathname}?${params.toString()}`)
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
    handleSearch(page.toString())
  }

  return (
    <div className='flex overflow-x-auto sm:justify-center'>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
    </div>
  )
}
