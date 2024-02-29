import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink } from 'flowbite-react'
import Image from 'next/image'
import ButtonLogin from './ButtonLogin'
import { IoCarSportOutline } from 'react-icons/io5'

export default function AppHeader() {
  return (
    <Navbar fluid rounded className='shadow-md'>
      <NavbarBrand href='https://flowbite-react.com' className='text-red-600'>
        <IoCarSportOutline size={34} className='mr-1' />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          Lisense Plate Auction
        </span>
      </NavbarBrand>

      <ButtonLogin />

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
