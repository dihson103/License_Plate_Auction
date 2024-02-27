import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink } from 'flowbite-react'
import Image from 'next/image'
import ButtonLogin from './ButtonLogin'

export default function AppHeader() {
  return (
    <Navbar fluid rounded className='shadow-md'>
      <NavbarBrand href='https://flowbite-react.com'>
        <Image src='/dihson103.jpg' className='mr-3 h-6 sm:h-9' height={30} width={30} alt='Flowbite React Logo' />
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
