'use client'

import { Select, TextInput } from 'flowbite-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchAuction() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const defaultInputValue = searchParams.get('licensePlate') || ''

  const handleSearch = (name: string, term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set(name, term)
    } else {
      params.delete(name)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className='grid gap-6 mb-6 md:grid-cols-4'>
      <TextInput
        id='searchValue'
        type='text'
        placeholder='Search'
        defaultValue={defaultInputValue}
        onChange={(e) => handleSearch('licensePlate', e.target.value)}
      />
      <Select id='countries' required onChange={(e) => handleSearch('city', e.target.value)}>
        <option value={''}>Chọn tỉnh, thành phố</option>
        <option value={'Canada'}>Canada</option>
        <option value={'France'}>France</option>
        <option value={'Germany'}>Germany</option>
      </Select>
      <Select id='kindOfCar' required onChange={(e) => handleSearch('kindOfCar', e.target.value)}>
        <option value={''}>Chọn loại xe</option>
        <option value={'Canada'}>Canada</option>
        <option value={'France'}>France</option>
        <option value={'Germany'}>Germany</option>
      </Select>
      <Select id='kindOfLicense' required onChange={(e) => handleSearch('kindOfLicense', e.target.value)}>
        <option value={''}>Chọn loại biển</option>
        <option value={'Canada'}>Canada</option>
        <option value={'France'}>France</option>
        <option value={'Germany'}>Germany</option>
      </Select>
    </div>
  )
}
