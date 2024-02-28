import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AccountFormSchema, accountFormSchema } from '../utils/rule'
import { UserRegister } from '../types/user.type'
import { registerUserAccount } from '../actions/user.action'

interface Props {
  setIsInputPersonalInfo: Dispatch<SetStateAction<boolean>>
  setRegisterData: Dispatch<SetStateAction<UserRegister>>
  registerData: UserRegister
}

type FormData = AccountFormSchema

export default function RegisterAccountForm({ setIsInputPersonalInfo, setRegisterData, registerData }: Props) {
  const handlePreviousButton = () => {
    setIsInputPersonalInfo((previousValue) => !previousValue)
  }

  const initialData: FormData = {
    email: registerData.email,
    password: registerData.password,
    confirmPassword: '',
    acceptTerms: false
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: initialData,
    resolver: yupResolver(accountFormSchema)
  })

  const email = watch('email')

  useEffect(() => {
    setRegisterData((prev) => ({ ...prev, email: email }))
  }, [setRegisterData, email])

  const onSubmit = handleSubmit((data) => {
    setRegisterData((previousValue) => ({ ...previousValue, email: data.email, password: data.password }))

    console.log('>>> call api to register user', registerData)

    registerUserAccount(registerData)
      .then(() => {
        toast.success('Register new account success')
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className='mb-2 flex flex-col gap-y-3'>
        <Label htmlFor='email'>Your email</Label>
        <TextInput id='email' placeholder='name@company.com' type='email' {...register('email')} />
      </div>
      <div className='text-red-600 min-h-6 text-sm'>{errors.email?.message}</div>

      <div className='mb-2 flex flex-col gap-y-3'>
        <Label htmlFor='password'>Your password</Label>
        <TextInput id='password' {...register('password')} placeholder='••••••••' type='password' />
      </div>
      <div className='text-red-600 min-h-6 text-sm'>{errors.password?.message}</div>

      <div className='mb-2 flex flex-col gap-y-3'>
        <Label htmlFor='confirm-password'>Confirm password</Label>
        <TextInput id='confirm-password' {...register('confirmPassword')} placeholder='••••••••' type='password' />
      </div>
      <div className='text-red-600 min-h-6 text-sm'>{errors.confirmPassword?.message}</div>

      <div className='mb-2 flex items-center gap-x-3'>
        <Checkbox id='acceptTerms' {...register('acceptTerms')} />
        <Label htmlFor='acceptTerms'>
          I accept the&nbsp;
          <Link href='#' className='text-purple-700 dark:text-purple-200'>
            Terms and Conditions
          </Link>
        </Label>
      </div>
      <div className='text-red-600 min-h-6 text-sm'>{errors.acceptTerms?.message}</div>

      <div className='mb-6 flex'>
        <Button type='button' className='w-full lg:w-auto mr-2' onClick={handlePreviousButton}>
          Previous
        </Button>
        <Button type='submit' color='blue' className='w-full lg:w-auto'>
          Create account
        </Button>
      </div>
      <p className='text-sm text-gray-500 dark:text-gray-300'>
        Already have registered?&nbsp;
        <button type='button' className='text-purple-600 dark:text-purple-300' onClick={() => signIn()}>
          Login now
        </button>
      </p>
    </form>
  )
}
