'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaUsersGear } from 'react-icons/fa6'
import { IoCarSportOutline } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import { RiAuctionLine } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'

export default function AppSideBar() {
  const pathname = usePathname()

  return (
    <div className='hidden md:flex flex-col w-64 bg-gray-800'>
      <div className='flex items-center justify-center h-16 bg-gray-900 text-red-600'>
        <IoCarSportOutline size={34} className='mr-1' />
        <span className='text-2xl font-mono'>dihson103</span>
      </div>
      <div className='flex flex-col flex-1 overflow-y-auto'>
        <nav className='flex-1 px-2 py-4 bg-gray-800'>
          <Link
            href='/'
            className={`flex items-center px-4 py-2 ${pathname === '/' ? 'text-green-600' : 'text-gray-100'} hover:bg-gray-700`}
          >
            <RxDashboard size={24} className='mr-2' />
            Dashboard
          </Link>
          <Link
            href='/users'
            className={`flex items-center px-4 py-2 ${pathname === '/users' ? 'text-green-600' : 'text-gray-100'} hover:bg-gray-700`}
          >
            <FaUsersGear className='mr-2' size={24} />
            Users management
          </Link>
          <Link
            href='auctions'
            className={`flex items-center px-4 py-2 ${pathname === '/auctions' ? 'text-green-600' : 'text-gray-100'} hover:bg-gray-700`}
          >
            <RiAuctionLine size={24} className='mr-2' />
            Auctions management
          </Link>
          <a href='#' className='flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700'>
            <LuLogOut size={24} className='mr-2' />
            Logout
          </a>
        </nav>
      </div>
    </div>
  )
}
