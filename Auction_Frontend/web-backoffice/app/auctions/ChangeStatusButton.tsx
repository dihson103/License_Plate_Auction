'use client'

import { AuctionResponse, UpdateAuction } from '@/types/auctions.type'
import { Button, Label, Modal, Radio, TextInput } from 'flowbite-react'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TbStatusChange } from 'react-icons/tb'
import { UpdateAuctionStatusAndDateFormSchema, updateAuctionStatusAndDateTimeSchema } from '../rules/auctions.rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { convertAuctionStatusToNumber, convertUTCtoLocalDateTime, convertUtcToDateTimeFormat } from '../utils/utils'
import { updateAuction } from '../actions/auctions.action'

type Props = {
  auction: AuctionResponse
}

export default function ChangeStatusButton({ auction }: Props) {
  const [openModal, setOpenModal] = useState(false)
  const [updatedStatus, setUpdatedStatus] = useState<string>(auction.status)

  const initialData: UpdateAuctionStatusAndDateFormSchema = {
    status: auction.status,
    startDateTime: new Date(convertUtcToDateTimeFormat(auction.startDateTime) as string),
    endDateTime: new Date(convertUtcToDateTimeFormat(auction.endDateTime) as string)
  }

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm<UpdateAuctionStatusAndDateFormSchema>({
    defaultValues: initialData,
    resolver: yupResolver(updateAuctionStatusAndDateTimeSchema)
  })

  const handleRadioButton = (event: ChangeEvent<HTMLInputElement>) => {
    const status = event.target.value
    if (status === 'InActive') {
      clearErrors(['startDateTime', 'endDateTime'])
      setValue('startDateTime', undefined)
      setValue('endDateTime', undefined)
    }
    setUpdatedStatus(status)
    setValue('status', status)
  }

  const handleUpdate = handleSubmit((data) => {
    const updateData: UpdateAuction = {
      ...auction,
      auctionId: auction.id,
      status: convertAuctionStatusToNumber(data.status),
      startDateTime: data.startDateTime?.toISOString() || null,
      endDateTime: data.endDateTime?.toISOString() || null
    }
    console.log('data', updateData)
    updateAuction(updateData)
      .then(() => {
        toast.success("Update auction's success")
        handleClose()
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  })

  const handleClose = () => {
    setUpdatedStatus(auction.status)
    setOpenModal(false)
    clearErrors(['startDateTime', 'endDateTime'])
  }

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('startDateTime', new Date(e.target.value))
  }

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('endDateTime', new Date(e.target.value))
  }

  return (
    <>
      <Button gradientDuoTone='greenToBlue' className='whitespace-nowrap' onClick={() => setOpenModal(true)}>
        <TbStatusChange size={20} className='mr-2' />
        Change status/date
      </Button>
      <Modal show={openModal} size={'xl'} onClose={handleClose}>
        <Modal.Header>{"Change auction's status"}</Modal.Header>
        <Modal.Body>
          <fieldset className='flex max-w-md flex-col gap-4'>
            <legend className='mb-4'>Choose auction status</legend>
            <div className='flex items-center gap-2'>
              <Radio
                id='InActive'
                name='status'
                value='InActive'
                checked={updatedStatus === 'InActive'}
                onChange={handleRadioButton}
              />
              <Label htmlFor='InActive'>InActive</Label>
            </div>
            <div className='flex items-center gap-2'>
              <Radio
                id='Pending'
                value='Pending'
                name='status'
                checked={updatedStatus === 'Pending'}
                onChange={handleRadioButton}
              />
              <Label htmlFor='Pending'>Pending</Label>
            </div>
          </fieldset>
          <div className='mt-5'>
            <div className='mb-2 block'>
              <Label
                htmlFor='startDateTime'
                value='Start Date Time'
                color={updatedStatus === 'InActive' ? 'warning' : ''}
              />
            </div>
            <TextInput
              id='startDateTime'
              type='datetime-local'
              readOnly={updatedStatus === 'InActive'}
              onChange={handleStartDateChange}
              color={updatedStatus === 'InActive' ? 'warning' : ''}
              defaultValue={convertUTCtoLocalDateTime(auction.startDateTime) || ''}
            />
            <div className='text-red-600 min-h-6 text-sm'>{errors.startDateTime?.message}</div>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='endDateTime'
                value='End Date Time'
                color={updatedStatus === 'InActive' ? 'warning' : ''}
              />
            </div>
            <TextInput
              id='endDateTime'
              type='datetime-local'
              readOnly={updatedStatus === 'InActive'}
              onChange={handleEndDateChange}
              color={updatedStatus === 'InActive' ? 'warning' : ''}
              defaultValue={convertUTCtoLocalDateTime(auction.endDateTime) || ''}
            />
            <div className='text-red-600 min-h-6 text-sm'>{errors.endDateTime?.message}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientDuoTone='pinkToOrange' onClick={handleUpdate}>
            Change status now
          </Button>
          <Button outline gradientDuoTone='purpleToBlue' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
