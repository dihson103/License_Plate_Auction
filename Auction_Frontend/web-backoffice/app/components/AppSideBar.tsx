import { FaUsersGear } from 'react-icons/fa6'
import { IoCarSportOutline } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import { RiAuctionLine } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
import AppSideBarLink from './AppSideBarLink'
import { GrUserAdmin } from 'react-icons/gr'
import LogoutButton from './LogoutButton'

export default function AppSideBar() {
  return (
    <div className='hidden md:flex flex-col w-64 bg-gray-800'>
      <div className='flex items-center justify-center h-16 bg-gray-900 text-red-600'>
        <IoCarSportOutline size={34} className='mr-1' />
        <span className='text-2xl font-mono'>dihson103</span>
      </div>
      <div className='flex flex-col flex-1 overflow-y-auto'>
        <nav className='flex-1 px-2 py-4 bg-gray-800'>
          <AppSideBarLink linkTo='/' contentName='Dashboard'>
            <RxDashboard size={24} className='mr-2' />
          </AppSideBarLink>
          <AppSideBarLink linkTo='/users' contentName='Users Management'>
            <FaUsersGear className='mr-2' size={24} />
          </AppSideBarLink>
          <AppSideBarLink linkTo='/admins' contentName='Admins Management'>
            <GrUserAdmin size={24} className='mr-2' />
          </AppSideBarLink>
          <AppSideBarLink linkTo='/auctions' contentName='Auctions Management'>
            <RiAuctionLine size={24} className='mr-2' />
          </AppSideBarLink>

          <LogoutButton />
        </nav>
      </div>
    </div>
  )
}
