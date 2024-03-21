'use client'

import { useWallet } from '@/app/hooks/useWallet'
import { convertNumberToVietNamMoney } from '@/app/utils/utils'
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, NavbarToggle } from 'flowbite-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaMoneyBillAlt } from 'react-icons/fa'

export default function ButtonLogin() {
  const router = useRouter()
  const { data: session } = useSession()
  const wallet = useWallet((state) => state.wallet)
  const setWallet = useWallet((state) => state.setWallet)
  const setUserId = useWallet((state) => state.setUserId)
  const userId = useWallet((state) => state.userId)

  useEffect(() => {
    if (session?.user) {
      setWallet(wallet == 0 ? session.user.data.wallet : wallet)
      setUserId(session.user.data.id)

      console.log('>>>>>>>>>>>>', userId, wallet)
    }
  }, [setWallet, session, setUserId, userId, wallet])

  const isAuthenticated = session?.user ? true : false

  const handleSignUpClick = () => {
    router.push('register')
  }

  const handleChangeEmail = () => {
    router.push('change-email')
  }

  const changeToRechargeMoney = () => {
    router.push('/payment')
  }

  const changeToMyAuctioin = () => {
    router.push('/auctions/me')
  }

  return (
    <div className='flex md:order-2'>
      {isAuthenticated && (
        <>
          <div className='flex items-center mr-5'>
            <FaMoneyBillAlt size={24} className='mr-2' />
            <span>{convertNumberToVietNamMoney(wallet ?? 0)}</span>
          </div>
          <Dropdown arrowIcon={false} inline label={<Avatar alt='User settings' img='/dihson103.jpg' rounded />}>
            <DropdownHeader>
              <span className='block text-sm'>{session?.user.data.fullName}</span>
              <span className='block truncate text-sm font-medium'>{session?.user.data.email}</span>
            </DropdownHeader>
            <DropdownItem onClick={handleChangeEmail}>Change email</DropdownItem>
            <DropdownItem onClick={changeToRechargeMoney}>Recharge money</DropdownItem>
            <DropdownItem onClick={changeToMyAuctioin}>My win auctions</DropdownItem>
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
