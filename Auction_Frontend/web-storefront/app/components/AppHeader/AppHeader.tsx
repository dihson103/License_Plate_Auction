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
        <Image
          src='https://scontent.cdninstagram.com/v/t51.2885-15/412758006_679971814123000_2969880741255148131_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=yvF--7cEjGwAX_ttgYf&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzI2NTUxMzkzMTY5MjgzNDgxNw%3D%3D.2-ccb7-5&oh=00_AfBcGxmWEfuPF_heYRo_cuff2js2VH06bAiyBrL1oPj95Q&oe=65D59DD8&_nc_sid=10d13b'
          className='mr-3 h-6 sm:h-9'
          height={30}
          width={30}
          alt='Flowbite React Logo'
        />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          Lisense Plate Auction
        </span>
      </NavbarBrand>
      <div className='flex md:order-2'>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt='User settings' img='https://flowbite.com/docs/images/people/profile-picture-5.jpg' rounded />
          }
        >
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
