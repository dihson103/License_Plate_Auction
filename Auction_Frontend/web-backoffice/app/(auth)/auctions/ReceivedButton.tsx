'use client'

import { updateStatusToReceived } from '@/app/actions/auctions.action'
import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { GiConfirmed } from 'react-icons/gi'
import { toast } from 'react-toastify'

type Props = {
  auctionId: number
}

export default function ReceivedButton({ auctionId }: Props) {
  const [openModal, setOpenModal] = useState(false)

  const handleReceived = () => {
    updateStatusToReceived(auctionId)
      .then((data) => {
        setOpenModal(false)
        toast.success('Update to received success')
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  }

  return (
    <div>
      <Button gradientDuoTone='redToYellow' onClick={() => setOpenModal(true)}>
        Change to received
      </Button>
      <Modal show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <GiConfirmed className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to change this auction to received status?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleReceived}>
                {"Yes, I'm sure"}
              </Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
