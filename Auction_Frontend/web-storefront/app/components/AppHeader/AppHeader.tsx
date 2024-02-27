import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle
} from 'flowbite-react'
import Image from 'next/image'

export default function AppHeader() {
  return (
    <Navbar fluid rounded className='shadow-md'>
      <NavbarBrand href='https://flowbite-react.com'>
        <Image src='/dihson103.jpg' className='mr-3 h-6 sm:h-9' height={30} width={30} alt='Flowbite React Logo' />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          Lisense Plate Auction
        </span>
      </NavbarBrand>
      <div className='flex md:order-2'>
        <Dropdown arrowIcon={false} inline label={<Avatar alt='User settings' img='/dihson103.jpg' rounded />}>
          <DropdownHeader>
            <span className='block text-sm'>Bonnie Green</span>
            <span className='block truncate text-sm font-medium'>name@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href='#' active className='text-lg'>
          Home
        </NavbarLink>
        <NavbarLink href='#' className='text-lg'>
          About
        </NavbarLink>
        <NavbarLink href='#' className='text-lg'>
          Services
        </NavbarLink>
        <NavbarLink href='#' className='text-lg'>
          Pricing
        </NavbarLink>
        <NavbarLink href='#' className='text-lg'>
          Contact
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}
