'use client'

import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaUserAstronaut } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { IoMdPersonAdd } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { CreateAdminFormSchema, createAdminSchema } from '@/app/rules/admins.rule'
import { createAdmin } from '@/app/actions/admins.action'

export default function CreateAdminButton() {
  const [openModal, setOpenModal] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateAdminFormSchema>({
    resolver: yupResolver(createAdminSchema)
  })

  const clearData = () => {
    setValue('email', '')
    setValue('password', '')
    setValue('fullName', '')
  }

  const handleYesButton = handleSubmit((data) => {
    // console.log('>>> form data', data)
    createAdmin(data)
      .then((data) => {
        toast.success(`Create admin has name: ${data.fullName} success`)
        setOpenModal(false)
        clearData()
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  })

  return (
    <>
      <Button gradientDuoTone='purpleToBlue' onClick={() => setOpenModal(true)}>
        <IoMdPersonAdd size={20} className='mr-2' />
        Add admin
      </Button>
      <Modal dismissible size={'lg'} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{'Create admin'}</Modal.Header>
        <Modal.Body>
          <div className='space-y'>
            <div className='mb-2 block'>
              <Label htmlFor='email' value="Admin's email" />
            </div>
            <TextInput
              id='email'
              type='email'
              placeholder='abc@gmail.com'
              {...register('email')}
              icon={HiMail}
              required
            />
            <div className='text-red-600 min-h-6 text-sm'>{errors.email?.message}</div>

            <div className='mb-2 block'>
              <Label htmlFor='fullname' value="Admin's fullname" />
            </div>
            <TextInput
              id='fullname'
              type='text'
              placeholder='Full name'
              {...register('fullName')}
              icon={FaUserAstronaut}
              required
            />
            <div className='text-red-600 min-h-6 text-sm'>{errors.fullName?.message}</div>

            <div className='mb-2 block'>
              <Label htmlFor='password' value='Password' />
            </div>
            <TextInput
              id='password'
              type='password'
              placeholder='*********'
              {...register('password')}
              icon={RiLockPasswordFill}
              required
            />
            <div className='text-red-600 min-h-6 text-sm'>{errors.password?.message}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleYesButton}>Add now</Button>
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
