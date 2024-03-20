'use client'

import { LuLogOut } from 'react-icons/lu'
import { deleteAuthCookie } from '../actions/auth.action'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const handleLogout = () => {
    deleteAuthCookie()
    router.push('/login')
  }

  return (
    <button className='flex items-center w-full px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700' onClick={handleLogout}>
      <LuLogOut size={24} className='mr-2' />
      Logout
    </button>
  )
}
