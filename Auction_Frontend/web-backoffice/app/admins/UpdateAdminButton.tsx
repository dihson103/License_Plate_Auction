'use client'

import { AdminResponse } from '@/types/admins.type'
import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { ChangeEvent, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FaUserAstronaut } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

type Props = {
  admin: AdminResponse
  updateAdminAction: (data: AdminResponse) => void
}

export default function UpdateAdminButton({ admin, updateAdminAction }: Props) {
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState<AdminResponse>(admin)

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, email: e.target.value }))
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, fullName: e.target.value }))
  }

  const handleYesButton = () => {
    console.log('>>> update data', data)
    updateAdminAction(data)
    setOpenModal(false)
  }

  return (
    <>
      <Button gradientDuoTone='purpleToPink' onClick={() => setOpenModal(true)}>
        <CiEdit size={20} />
        Edit
      </Button>
      <Modal dismissible size={'lg'} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{`Update admin has id: ${admin.id}`}</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div className='mb-2 block'>
              <Label htmlFor='email' value="Admin's email" />
            </div>
            <TextInput
              id='email'
              type='email'
              onChange={handleEmailChange}
              defaultValue={admin.email}
              icon={HiMail}
              required
            />
            <div className=''>
              <Label htmlFor='fullname' value="Admin's fullname" />
            </div>
            <TextInput
              id='fullname'
              type='text'
              onChange={handleNameChange}
              defaultValue={admin.fullName}
              icon={FaUserAstronaut}
              required
            />
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
