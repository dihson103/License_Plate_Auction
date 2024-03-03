'use client'

import { Button, Modal } from 'flowbite-react'
import { ReactNode, useState } from 'react'
import { CiEdit } from 'react-icons/ci'

type Props = {
  headerContent: string
  children: ReactNode
}

export default function EditButton({ headerContent, children }: Props) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button gradientDuoTone='purpleToPink' onClick={() => setOpenModal(true)}>
        <CiEdit size={20} />
        Edit
      </Button>
      <Modal dismissible size={'lg'} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{headerContent}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Update now</Button>
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
