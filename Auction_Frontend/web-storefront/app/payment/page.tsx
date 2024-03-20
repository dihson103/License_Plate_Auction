'use client'

/* eslint-disable @next/next/no-img-element */
import { Card } from 'flowbite-react'
import PaymentForm from './PaymentForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Payment() {
  const { status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'unauthenticated') {
    router.push('login')
    return
  }
  return (
    <div className='flex flex-col items-center justify-center px-6 bg-slate-100 lg:h-screen lg:gap-y-12'>
      <Card
        horizontal
        className='w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block'
      >
        <div className='mb-5'>
          <h1 className='text-center font-bold text-xl uppercase'>Secure payment info</h1>
        </div>
        <div className='mb-3 flex -mx-2'>
          <div className='px-2'>
            <label htmlFor='type1' className='flex items-center cursor-pointer'>
              <input
                type='radio'
                className='form-radio h-5 w-5 text-indigo-500'
                name='type'
                id='type1'
                defaultChecked
              />
              <img
                src='https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png'
                className='h-8 ml-3'
                alt=''
              />
            </label>
          </div>
          <div className='px-2'>
            <label htmlFor='type2' className='flex items-center cursor-pointer'>
              <input type='radio' className='form-radio h-5 w-5 text-indigo-500' name='type' id='type2' />
              <img
                src='https://www.sketchappsources.com/resources/source-image/PayPalCard.png'
                className='h-8 ml-3'
                alt=''
              />
            </label>
          </div>
        </div>

        <PaymentForm />
      </Card>
    </div>
  )
}
