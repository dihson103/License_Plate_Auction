'use client'

import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginFormSchema, loginSchema } from '../rules/auth.rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { login, setAuthToCookie } from '../actions/auth.action'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginFormSchema>({
    resolver: yupResolver(loginSchema)
  })

  const handleLogin = handleSubmit((data) => {
    login(data)
      .then((data) => {
        setAuthToCookie(data)
        router.push('/')
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  })

  return (
    <div className='flex flex-col items-center justify-center px-6 bg-slate-100 lg:h-screen lg:gap-y-12'>
      <Card
        horizontal
        className='w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block'
      >
        <h1 className='mb-3 text-2xl font-bold dark:text-white md:text-3xl'>Sign in to admin platform</h1>
        <form onSubmit={handleLogin}>
          <div className='mb-2 flex flex-col gap-y-3'>
            <Label htmlFor='email'>Your email</Label>
            <TextInput id='email' placeholder='Email' {...register('email')} type='text' />
          </div>
          <div className='text-red-600 min-h-6 text-sm'>{errors.email?.message}</div>
          <div className='mb-2 flex flex-col gap-y-3'>
            <Label htmlFor='password'>Your password</Label>
            <TextInput id='password' placeholder='••••••••' type='password' {...register('password')} />
          </div>
          <div className='text-red-600 min-h-6 text-sm'>{errors.password?.message}</div>
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-x-3'>
              <Checkbox id='rememberMe' name='rememberMe' />
              <Label htmlFor='rememberMe'>Remember me</Label>
            </div>
            <Link href='#' className='w-1/2 text-right text-sm text-purple-600 dark:text-purple-300'>
              Lost Password?
            </Link>
          </div>
          <div className='mb-6'>
            <Button type='submit' gradientMonochrome='success' className='w-full lg:w-auto'>
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
