'use client'

import { getProvinces } from '@/app/actions/utils.action'
import { AuctionListConfig } from '@/app/types/auction.type'
import { Province } from '@/app/types/util.type'
import { Select, TextInput } from 'flowbite-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchAuction({ searchConfig }: { searchConfig: AuctionListConfig }) {
  const [provinces, setProvinces] = useState<Province[]>()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const defaultInputValue = searchParams?.get('licensePlate') || ''

  const handleSearch = (name: string, term: string) => {
    const params = new URLSearchParams(searchParams || '')
    if (term) {
      params.set(name, term)
    } else {
      params.delete(name)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    getProvinces()
      .then((data) => {
        setProvinces(data.results)
      })
      .catch(() => {})
  }, [])

  return (
    <div className='grid gap-6 mb-6 md:grid-cols-4'>
      <TextInput
        id='searchValue'
        type='text'
        placeholder='Search'
        defaultValue={defaultInputValue}
        onChange={(e) => handleSearch('licensePlate', e.target.value)}
      />
      <Select id='countries' value={searchConfig.city} required onChange={(e) => handleSearch('city', e.target.value)}>
        <option value={''}>Chọn tỉnh, thành phố</option>
        {provinces?.map((p) => <option key={p.province_id}>{p.province_name}</option>)}
      </Select>
      <Select
        id='kindOfCar'
        value={searchConfig.kindOfCar}
        required
        onChange={(e) => handleSearch('kindOfCar', e.target.value)}
      >
        <option value={''}>Chọn loại xe</option>
        <option>Xe Con</option>
        <option>Xe Tải Van</option>
        <option>Xe Tải</option>
        <option>Xe Khách</option>
      </Select>
      <Select
        id='kindOfLicense'
        required
        value={searchConfig.licenseType}
        onChange={(e) => handleSearch('licenseType', e.target.value)}
      >
        <option value={''}>Chọn loại biển</option>
        <option>Ngũ Quý</option>
        <option>Tứ Quý</option>
        <option>Tam hoa</option>
        <option>Lộc phát</option>
        <option>Ông địa</option>
        <option>Thần tài</option>
        <option>Sảnh tiến</option>
        <option>Phong thủy</option>
      </Select>
    </div>
  )
}
