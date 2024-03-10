'use client'

import { TextInput } from 'flowbite-react'
import { FaSearch } from 'react-icons/fa'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

type Props = {
  searchInputName: string
  isClearParams?: boolean
}

export default function SearchInput({ searchInputName, isClearParams = true }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = (name: string, term: string) => {
    const params = new URLSearchParams(isClearParams ? '' : searchParams)
    if (term) {
      params.set(name, term)
    } else {
      params.delete(name)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }
  return (
    <TextInput
      type='text'
      icon={FaSearch}
      placeholder='Search'
      size={40}
      defaultValue={searchParams.get(searchInputName) || ''}
      onChange={(e) => handleSearch(searchInputName, e.target.value)}
    />
  )
}
