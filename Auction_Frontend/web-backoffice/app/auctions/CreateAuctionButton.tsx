'use client'

import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { FaUserAstronaut } from 'react-icons/fa'
import { RiAuctionLine } from 'react-icons/ri'

export default function CreateAuctionButton() {
  const [openModal, setOpenModal] = useState(false)

  const handleUpdate = () => {}

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button gradientDuoTone='purpleToBlue' className='whitespace-nowrap' onClick={() => setOpenModal(true)}>
        <RiAuctionLine size={20} className='mr-2' />
        Add new auction
      </Button>
      <Modal show={openModal} size={'4xl'} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update auction</Modal.Header>
        <Modal.Body>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='perId' value='Số căn cước công dân' />
              </div>
              <TextInput id='perId' type='text' placeholder='Số căn cước công dân' required />
              <div className='text-red-600 min-h-6 text-sm'>{}</div>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='fullname' value='Họ và tên' />
              </div>
              <TextInput id='fullname' type='text' placeholder='Họ và tên' icon={FaUserAstronaut} required />
              <div className='text-red-600 min-h-6 text-sm'>{}</div>
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
