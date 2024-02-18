import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to our platform'
}

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12'>
      <div className='my-6 flex items-center gap-x-1 lg:my-0'>
        <Image
          alt='Flowbite logo'
          src='https://flowbite.com/docs/images/logo.svg'
          width={40}
          height={40}
          className='mr-3 h-12'
        />
        <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>Flowbite</span>
      </div>
      <Card
        horizontal
        className='w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block'
      >
        <h1 className='mb-3 text-2xl font-bold dark:text-white md:text-3xl'>Sign in to platform</h1>
        <form>
          <div className='mb-4 flex flex-col gap-y-3'>
            <Label htmlFor='email'>Your email</Label>
            <TextInput id='email' name='email' placeholder='name@company.com' type='email' />
          </div>
          <div className='mb-6 flex flex-col gap-y-3'>
            <Label htmlFor='password'>Your password</Label>
            <TextInput id='password' name='password' placeholder='••••••••' type='password' />
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
