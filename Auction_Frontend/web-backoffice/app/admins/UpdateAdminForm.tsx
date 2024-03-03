import { Label, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaUserAstronaut } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { getAdmin } from '../actions/admins.action'
import { AdminResponse } from '@/types/admins.type'
import { toast } from 'react-toastify'

export default function UpdateAdminForm({ id }: { id: number }) {
  const [data, setData] = useState<AdminResponse>()
  useEffect(() => {
    getAdmin(id)
      .then((data) => {
        setData(data)
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  })
  return (
    <>
      <div className='space-y-6'>
        <div className='mb-2 block'>
          <Label htmlFor='email' value="Admin's email" />
        </div>
        <TextInput id='email' type='email' defaultValue={data?.email} icon={HiMail} required />
        <div className=''>
          <Label htmlFor='fullname' value="Admin's fullname" />
        </div>
        <TextInput id='fullname' type='text' defaultValue={data?.fullName} icon={FaUserAstronaut} required />
      </div>
    </>
  )
}
