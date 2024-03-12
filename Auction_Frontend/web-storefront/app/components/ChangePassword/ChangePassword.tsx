'use client'

import { Button, Dropdown, DropdownItem, Modal } from 'flowbite-react'
import { useState } from 'react'

export default function ChangePassword() {
  const [openModal, setOpenModal] = useState(false)

  const handleChangePassword = () => {}

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Dropdown.Item as={Button} onClick={() => setOpenModal(true)}>
        Change password
      </Dropdown.Item>
      <Modal show={openModal} size={'4xl'} onClose={handleClose}>
        <Modal.Header>Change password</Modal.Header>
        <Modal.Body>
          <h2>Change password</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientMonochrome='success' onClick={handleChangePassword}>
            Change now
          </Button>
          <Button gradientDuoTone='pinkToOrange' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
