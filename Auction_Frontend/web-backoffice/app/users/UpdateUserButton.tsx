'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UpdateUserFormSchema, updateUserSchema } from '../rules/users.rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { FaAddressCard, FaUserAstronaut } from 'react-icons/fa'
import { MdDateRange, MdMapsHomeWork } from 'react-icons/md'
import { HiMail } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { CiEdit } from 'react-icons/ci'
import { UserResponse } from '@/types/users.type'
import { updateUser } from '../actions/users.action'
import { convertLocalDateTimeToUTC } from '../utils/utils'

type Props = {
  user: UserResponse
}

export default function UpdateUserButton({ user }: Props) {
  const initialData: UpdateUserFormSchema = {
    id: user.id,
    address: user.address,
    fullname: user.fullName,
    birthDate: user.birthDate,
    email: user.email
  }

  const [openModal, setOpenModal] = useState(false)

  const clearData = () => {
    setValue('id', '')
    setValue('address', '')
    setValue('birthDate', '')
    setValue('email', '')
    setValue('fullname', '')
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateUserFormSchema>({
    defaultValues: initialData,
    resolver: yupResolver(updateUserSchema)
  })

  const handleUpdate = handleSubmit((data) => {
    updateUser({ ...data, birthDate: convertLocalDateTimeToUTC(data.birthDate) })
      .then(() => {
        toast.success(`Update user success`)
        setOpenModal(false)
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  })

  const handleClose = () => {
    clearData()
    setOpenModal(false)
  }

  return (
    <>
      <Button gradientDuoTone='purpleToBlue' onClick={() => setOpenModal(true)}>
        <CiEdit size={20} className='mr-2' />
        Edit
      </Button>
      <Modal show={openModal} size={'4xl'} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update user</Modal.Header>
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdate}>Update now</Button>
          <Button color='gray' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
