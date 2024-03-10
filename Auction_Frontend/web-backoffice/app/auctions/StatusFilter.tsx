'use client'

import { Button } from 'flowbite-react'
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function StatusFilter() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const status = searchParams.get('status') || 'Pending'

  const handleFilter = (name: string, term: string) => () => {
    const params = new URLSearchParams()
    if (term) {
      params.set(name, term)
    } else {
      params.delete(name)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <>
      <span className='uppercase text-sm text-gray-500'>Filter status</span>
      <Button.Group>
        <Button
          gradientMonochrome={status === 'InActive' ? 'success' : ''}
          color={status !== 'InActive' ? 'gray' : ''}
          onClick={handleFilter('status', 'InActive')}
        >
          InActive
        </Button>
        <Button
          gradientMonochrome={status === 'Pending' ? 'success' : ''}
          color={status !== 'Pending' ? 'gray' : ''}
          onClick={handleFilter('status', 'Pending')}
        >
          Pending
        </Button>
        <Button
          gradientMonochrome={status === 'Live' ? 'success' : ''}
          color={status !== 'Live' ? 'gray' : ''}
          onClick={handleFilter('status', 'Live')}
        >
          Live
        </Button>
        <Button
          gradientMonochrome={status === 'Finished' ? 'success' : ''}
          color={status !== 'Finished' ? 'gray' : ''}
          onClick={handleFilter('status', 'Finished')}
        >
          Finished
        </Button>
        <Button
          gradientMonochrome={status === 'ReserveNotMet' ? 'success' : ''}
          color={status !== 'ReserveNotMet' ? 'gray' : ''}
          onClick={handleFilter('status', 'ReserveNotMet')}
        >
          ReserveNotMet
        </Button>
      </Button.Group>
    </>
  )
}
