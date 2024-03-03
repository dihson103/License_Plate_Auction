'use client'

import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { FaUserAstronaut } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { IoMdPersonAdd } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri'

export default function CreateAdminButton() {
  const [openModal, setOpenModal] = useState(false)

  const handleYesButton = () => {
    setOpenModal(false)
  }
  return (
    <>
      <Button gradientDuoTone='purpleToBlue' onClick={() => setOpenModal(true)}>
        <IoMdPersonAdd size={20} className='mr-2' />
        Add admin
      </Button>
      <Modal dismissible size={'lg'} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{'Create admin'}</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div className='mb-2 block'>
              <Label htmlFor='email' value="Admin's email" />
            </div>
            <TextInput id='email' type='email' placeholder='abc@gmail.com' icon={HiMail} required />
            <div className='mb-2 block'>
              <Label htmlFor='fullname' value="Admin's fullname" />
            </div>
            <TextInput id='fullname' type='text' placeholder='Full name' icon={FaUserAstronaut} required />
            <div className='mb-2 block'>
              <Label htmlFor='password' value='Password' />
            </div>
            <TextInput id='password' type='password' placeholder='*********' icon={RiLockPasswordFill} required />
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
