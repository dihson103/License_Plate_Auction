import { useState } from 'react'
import { usePathname, useRouter, useSearchParams, redirect } from 'next/navigation'
import { getFilterByFromSearchParams } from '@/app/utils/utils'

type Props = {
  status: string | undefined
}

export default function Filter({ status }: Props) {
  const [filterBy, setFilterBy] = useState<1 | 2 | 3>(getFilterByFromSearchParams(status))
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = (name: string, term: string) => {
    const params = new URLSearchParams()
    if (term) {
      params.set(name, term)
    } else {
      params.delete(name)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handlFilter = (filterNumber: 1 | 2 | 3, filterValue: string) => {
    setFilterBy(filterNumber)
    handleSearch('status', filterValue)
  }

  return (
    <div className='border-b-2 border-gray-200 dark:border-gray-700 mb-10'>
      <nav className='-mb-0.5 flex space-x-6'>
        <button
          onClick={() => handlFilter(1, '')}
          className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm sm:text-xl whitespace-nowrap focus:outline-none focus:text-blue-600 ${filterBy === 1 ? 'border-blue-500 font-medium text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
        >
          Danh sách đang đấu giá
        </button>
        <button
          onClick={() => handlFilter(2, 'sap-dau-gia')}
          className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm sm:text-xl whitespace-nowrap focus:outline-none focus:text-blue-600 ${filterBy === 2 ? 'border-blue-500 font-medium text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
        >
          Danh sách sắp đấu giá
        </button>
        <button
          onClick={() => handlFilter(3, 'da-dau-gia')}
          className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm sm:text-xl whitespace-nowrap focus:outline-none focus:text-blue-600 ${filterBy === 3 ? 'border-blue-500 font-medium text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
        >
          Danh sách đã đấu giá
        </button>
      </nav>
    </div>
  )
}
