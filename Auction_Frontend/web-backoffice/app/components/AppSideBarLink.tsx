'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

type Props = {
  linkTo: string
  children: ReactNode
  contentName: string
}

export default function AppSideBarLink({ linkTo, children, contentName }: Props) {
  const pathname = usePathname()
  return (
    <Link
      href={linkTo}
      className={`flex items-center px-4 py-2 ${pathname === linkTo ? 'text-green-600' : 'text-gray-100'} hover:bg-gray-700`}
    >
      {children}
      {contentName}
    </Link>
  )
}
