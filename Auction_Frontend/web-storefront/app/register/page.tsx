'use client'

import { Card } from 'flowbite-react'
import { useState } from 'react'
import RegisterPersonalForm from './RegisterPersonalForm'
import RegisterAccountForm from './RegisterAccountForm'
import { UserRegister } from '../types/user.type'

const initialRegisterData: UserRegister = {
  id: '',
  address: '',
  dateBirth: '',
  email: '',
  fullname: '',
  password: ''
}

export default function Register() {
  const [isInputPersonalInfo, setIsInputPersonalInfo] = useState<boolean>(true)
  const [registerData, setRegisterData] = useState<UserRegister>(initialRegisterData)

  return (
    <div className='flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12'>
      <Card
        horizontal
        className='w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block'
      >
        <h1 className='mb-3 text-2xl font-bold dark:text-white md:text-3xl'>Sign up to platform</h1>
        {isInputPersonalInfo && (
          <RegisterPersonalForm
            setRegisterData={setRegisterData}
            registerData={registerData}
            setIsInputPersonalInfo={setIsInputPersonalInfo}
          />
        )}

        {!isInputPersonalInfo && (
          <RegisterAccountForm
            registerData={registerData}
            setRegisterData={setRegisterData}
            setIsInputPersonalInfo={setIsInputPersonalInfo}
          />
        )}
      </Card>
    </div>
  )
}
