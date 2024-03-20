'use client'

import { Button, Label, TextInput } from 'flowbite-react'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { PaymentFormSchema, paymentSchema } from '../utils/rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { payAPI } from '../actions/payment.actions'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function PaymentForm() {
  const router = useRouter()
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<PaymentFormSchema>({
    resolver: yupResolver(paymentSchema)
  })

  useEffect(() => {
    setValue('userId', 'HE160021')
  }, [setValue])

  const handlePay = handleSubmit((data) => {
    if (!session?.user) return
    payAPI(data, session?.user)
      .then(() => {
        router.push('/')
        toast.success('Payment request sent successfully')
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  })

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <div className='space-y'>
      <div className='mb-2 block'>
        <Label htmlFor='carNumber' value='Card Number' />
      </div>
      <TextInput id='carNumber' type='text' placeholder='Card Number' {...register('accountNumber')} required />
      <div className='text-red-600 min-h-5 text-sm'>{errors.accountNumber?.message}</div>

      <div className='mb-2 block'>
        <Label htmlFor='password' value='Your password' />
      </div>
      <TextInput id='password' type='password' placeholder='••••••••' {...register('password')} required />
      <div className='text-red-600 min-h-5 text-sm'>{errors.password?.message}</div>

      <div className='mb-2 block'>
        <Label htmlFor='amount' value='Amount of money' />
      </div>
      <TextInput id='amount' type='number' placeholder='Amount of money' {...register('amount')} required />
      <div className='text-red-600 min-h-5 text-sm'>{errors.amount?.message}</div>

      <div className='mb-6 mt-2 flex justify-between'>
        <Button type='button' gradientDuoTone='purpleToPink' onClick={handleGoHome}>
          Go to home page
        </Button>
        <Button type='button' gradientMonochrome='success' onClick={handlePay}>
          Pay now
        </Button>
      </div>
    </div>
  )
}
