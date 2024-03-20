'use client'

import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAddressCard, FaUserAstronaut } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { IoMdPersonAdd } from 'react-icons/io'
import { MdDateRange, MdMapsHomeWork } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { CreateUserFormSchema, createUserSchema } from '@/app/rules/users.rule'
import { convertLocalDateTimeToUTC } from '@/app/utils/utils'
import { registerUser } from '@/app/actions/users.action'

export default function CreateUserButton() {
  const [openModal, setOpenModal] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateUserFormSchema>({
    resolver: yupResolver(createUserSchema)
  })

  const handleCreate = handleSubmit((data) => {
    registerUser({ ...data, birthDate: convertLocalDateTimeToUTC(data.birthDate) })
      .then((response) => {
        toast.success(`Create new user name: ${response.fullName} success`)
        setOpenModal(false)
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  })

  const handleClose = () => {
    setValue('id', '')
    setValue('address', '')
    setValue('birthDate', '')
    setValue('email', '')
    setValue('fullname', '')
    setValue('password', '')
    setOpenModal(false)
  }

  return (
    <>
      <Button gradientDuoTone='purpleToBlue' onClick={() => setOpenModal(true)}>
        <IoMdPersonAdd size={20} className='mr-2' />
        Add new user
      </Button>
      <Modal show={openModal} size={'4xl'} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create new user</Modal.Header>
        <Modal.Body>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='perId' value='Số căn cước công dân' />
              </div>
              <TextInput
                id='perId'
                type='text'
                placeholder='Số căn cước công dân'
                {...register('id')}
                icon={FaAddressCard}
                required
              />
              <div className='text-red-600 min-h-6 text-sm'>{errors.id?.message}</div>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='fullname' value='Họ và tên' />
              </div>
              <TextInput
                id='fullname'
                type='text'
                placeholder='Họ và tên'
                {...register('fullname')}
                icon={FaUserAstronaut}
                required
              />
              <div className='text-red-600 min-h-6 text-sm'>{errors.fullname?.message}</div>
            </div>
          </div>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='address' value='Địa chỉ nhà' />
              </div>
              <TextInput
                id='address'
                type='text'
                placeholder='Địa chỉ'
                {...register('address')}
                icon={MdMapsHomeWork}
                required
              />
              <div className='text-red-600 min-h-6 text-sm'>{errors.address?.message}</div>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='dob' value='Ngày tháng năm sinh' />
              </div>
              <TextInput id='dob' type='datetime-local' {...register('birthDate')} icon={MdDateRange} required />
              <div className='text-red-600 min-h-6 text-sm'>{errors.birthDate?.message}</div>
            </div>
          </div>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='email' value='Email' />
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
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='password' value='Mật Khẩu' />
              </div>
              <TextInput
                id='password'
                type='password'
                placeholder='******'
                {...register('password')}
                icon={RiLockPasswordFill}
                required
              />
              <div className='text-red-600 min-h-6 text-sm'>{errors.password?.message}</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreate}>Create now</Button>
          <Button color='gray' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
