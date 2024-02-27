'use client'

import { Button, Label, TextInput } from 'flowbite-react'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { personalFormSchema, PersonalFormType } from '../utils/rule'
import { convertLocalDateTimeToUTC, convertUTCtoLocalDateTimeUTC } from '../utils/utils'
import { UserRegister } from '../types/user.type'

interface Props {
  setIsInputPersonalInfo: Dispatch<SetStateAction<boolean>>
  setRegisterData: Dispatch<SetStateAction<UserRegister>>
  registerData: UserRegister
}

type FormInput = PersonalFormType

export default function RegisterPersonalForm({ setIsInputPersonalInfo, registerData, setRegisterData }: Props) {
  const initialData: FormInput = {
    address: registerData.address,
    dob: convertUTCtoLocalDateTimeUTC(registerData.dateBirth),
    fullname: registerData.fullname,
    identificationNumber: registerData.id
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>({
    defaultValues: initialData,
    resolver: yupResolver(personalFormSchema)
  })

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {
      ...data,
      dob: convertLocalDateTimeToUTC(data.dob)
    }

    setRegisterData((previousValue) => ({
      ...previousValue,
      id: modifiedData.identificationNumber,
      address: modifiedData.address,
      fullname: modifiedData.fullname,
      dateBirth: modifiedData.dob
    }))

    setIsInputPersonalInfo((previousValue) => !previousValue)
  })

  return (
    <form onSubmit={onSubmit}>
      <div className='mb-2 flex flex-col gap-y-3'>
        <Label htmlFor='identificationNumber'>Your citizen identification number</Label>
        <TextInput
          id='identificationNumber'
          placeholder='Citizen identification number'
          {...register('identificationNumber')}
        />
      </div>
      <div className='text-red-600 min-h-6 text-sm'>{errors.identificationNumber?.message}</div>

      <div className='mb-2 flex flex-col gap-y-3'>
        <Label htmlFor='fullname'>Your fullname</Label>
        <TextInput id='fullname' placeholder='Your full name' {...register('fullname')} />
      </div>
      <div className='text-red-600 min-h-6 text-sm'>{errors.fullname?.message}</div>

      <div className='mb-2 flex flex-col gap-y-3'>
        <Label htmlFor='address'>Your address</Label>
        <TextInput id='address' placeholder='Your address' {...register('address')} />
      </div>
      <div className='text-red-600 min-h-6 text-sm'>{errors.address?.message}</div>

      <div className='mb-2 flex flex-col gap-y-3'>
        <Label htmlFor='dob'>Your date of birth</Label>
        <input
          type='datetime-local'
          id='dob'
          className='form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          {...register('dob')}
          required
        />
      </div>
      <div className='text-red-600 min-h-6 text-sm'>{errors.dob?.message}</div>

      <div className='mb-6'>
        <Button type='submit' color='blue' className='w-full lg:w-auto'>
          Next
        </Button>
      </div>
    </form>
  )
}
