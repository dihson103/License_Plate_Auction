import { Avatar, Dropdown, DropdownHeader, DropdownItem, TextInput } from 'flowbite-react'
import { getAuthFromCookie } from '../actions/auth.action'

export default function AppNavBar() {
  const authData = getAuthFromCookie()
  return (
    <div className='flex items-center justify-between h-16 bg-white border-b border-gray-200'>
      <div className='flex items-center px-4'>
        <button className='mr-4 text-gray-500 focus:outline-none focus:text-gray-700'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
        {/* <TextInput type='text' icon={FaSearch} placeholder='Search' size={40} /> */}
      </div>
      <div className='flex items-center pr-4'>
        <Dropdown arrowIcon={false} inline label={<Avatar alt='User settings' img='/dihson103.jpg' rounded />}>
          <DropdownHeader>
            <span className='block text-sm'>{authData?.data.fullName}</span>
            <span className='block truncate text-sm font-medium'>{authData?.data.email}</span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
        </Dropdown>
      </div>
    </div>
  )
}
