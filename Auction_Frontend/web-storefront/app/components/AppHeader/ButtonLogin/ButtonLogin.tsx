'use client'

import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, NavbarToggle } from 'flowbite-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ButtonLogin() {
  const router = useRouter()
  const { data: session } = useSession()

  console.log('>>> session info', session)

  const isAuthenticated = session?.user ? true : false

  const handleSignUpClick = () => {
    router.push('register')
  }

  return (
    <div className='flex md:order-2'>
      {isAuthenticated && (
        <>
          <Dropdown arrowIcon={false} inline label={<Avatar alt='User settings' img='/dihson103.jpg' rounded />}>
            <DropdownHeader>
              <span className='block text-sm'>{session?.user.data.fullName}</span>
              <span className='block truncate text-sm font-medium'>{session?.user.data.email}</span>
            </DropdownHeader>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={signOut}>Sign out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </>
      )}

      {!isAuthenticated && (
        <>
          <Button outline gradientDuoTone='pinkToOrange' className='mr-2' onClick={handleSignUpClick}>
            Sign up
          </Button>
          <Button outline gradientDuoTone='purpleToPink' onClick={() => signIn()}>
            Sign in
          </Button>
        </>
      )}
    </div>
  )
}
