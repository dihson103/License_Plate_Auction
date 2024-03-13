'use client'

import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/'
    })
  }

  return (
    <div className='flex flex-col items-center justify-center px-6 bg-slate-100 lg:h-screen lg:gap-y-12'>
      <Card
        horizontal
        className='w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block'
      >
        <h1 className='mb-3 text-2xl font-bold dark:text-white md:text-3xl'>Sign in to platform</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4 flex flex-col gap-y-3'>
            <Label htmlFor='email'>Your email / Personal Id</Label>
            <TextInput
              id='email'
              name='email'
              placeholder='Email or personal id'
              onChange={(e) => setUsername(e.target.value)}
              type='text'
            />
          </div>
          <div className='mb-6 flex flex-col gap-y-3'>
            <Label htmlFor='password'>Your password</Label>
            <TextInput
              id='password'
              name='password'
              placeholder='••••••••'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
            <Button type='submit' color='blue' className='w-full lg:w-auto'>
              Login to your account
            </Button>
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-300'>
            Not registered?&nbsp;
            <Link href='/register' className='text-purple-600 dark:text-purple-300'>
              Create account
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}
