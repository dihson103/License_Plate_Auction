'use client'

import { UpdateAdminFormSchema, updateAdminSchema } from '@/app/rules/admins.rule'
import { AdminResponse, UpdateAdminRequest } from '@/types/admins.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiEdit } from 'react-icons/ci'
import { FaUserAstronaut } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

type Props = {
  admin: AdminResponse
  updateAdminAction: (data: AdminResponse) => void
}

export default function UpdateAdminButton({ admin, updateAdminAction }: Props) {
  const [openModal, setOpenModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateAdminFormSchema>({
    defaultValues: admin,
    resolver: yupResolver(updateAdminSchema)
  })

  const handleYesButton = handleSubmit((data) => {
    // console.log('>>> update data', data)
    updateAdminAction(data)
    setOpenModal(false)
  })

  return (
    <>
      <Button gradientDuoTone='purpleToPink' onClick={() => setOpenModal(true)}>
        <CiEdit size={20} />
        Edit
      </Button>
      <Modal dismissible size={'lg'} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{`Update admin has id: ${admin.id}`}</Modal.Header>
        <Modal.Body>
          <div className='space-y'>
            <div className='mb-2 block'>
              <Label htmlFor='email' value="Admin's email" />
            </div>
            <TextInput id='email' type='email' {...register('email')} icon={HiMail} required />
            <div className='text-red-600 min-h-6 text-sm'>{errors.email?.message}</div>
            <div className=''>
              <Label htmlFor='fullname' value="Admin's fullname" />
            </div>
            <TextInput id='fullname' type='text' {...register('fullName')} icon={FaUserAstronaut} required />
            <div className='text-red-600 min-h-6 text-sm'>{errors.fullName?.message}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleYesButton}>Update now</Button>
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
