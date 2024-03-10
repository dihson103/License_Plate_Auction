'use client'

import { Button, Label, Modal, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaUserAstronaut } from 'react-icons/fa'
import { RiAuctionLine } from 'react-icons/ri'
import { CreateAuctionFormSchema, createAuctionSchema } from '../rules/auctions.rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { Province } from '@/types/utils.type'
import { getProvinces } from '../actions/utils.action'
import { CreateAuction } from '@/types/auctions.type'
import { createAuction } from '../actions/auctions.action'

export default function CreateAuctionButton() {
  const [openModal, setOpenModal] = useState(false)
  const [provinces, setProvinces] = useState<Province[]>()

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<CreateAuctionFormSchema>({
    resolver: yupResolver(createAuctionSchema)
  })

  useEffect(() => {
    getProvinces()
      .then((data) => {
        setProvinces(data.results)
      })
      .catch(() => {})

    setValue('status', 'Pending')
  }, [setValue])

  const handleUpdate = handleSubmit((data) => {
    const createData: CreateAuction = {
      ...data,
      startDateTime: data.startDateTime?.toISOString() as string,
      endDateTime: data.endDateTime?.toISOString() as string
    }
    createAuction(createData)
      .then(() => {
        toast.success('Create auction success')
        handleClose()
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  })

  const handleClose = () => {
    setValue('licensePlate', '')
    setValue('reservePrice', 0)
    setValue('startDateTime', undefined)
    setValue('endDateTime', undefined)
    clearErrors()
    setOpenModal(false)
  }

  return (
    <>
      <Button gradientDuoTone='purpleToBlue' className='whitespace-nowrap' onClick={() => setOpenModal(true)}>
        <RiAuctionLine size={20} className='mr-2' />
        Add new auction
      </Button>
      <Modal show={openModal} size={'4xl'} onClose={handleClose}>
        <Modal.Header>Create auction</Modal.Header>
        <Modal.Body>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='licensePlate' value='License Plate' />
              </div>
              <TextInput
                id='licensePlate'
                type='text'
                placeholder='License Plate'
                {...register('licensePlate')}
                icon={RiAuctionLine}
                required
              />
              <div className='text-red-600 min-h-6 text-sm'>{errors.licensePlate?.message}</div>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='licensePlate' value='Kind Of Car' />
              </div>
              <Select id='kindOfCar' required {...register('kindOfCar')}>
                <option>Xe Con</option>
                <option>Xe Tải Van</option>
                <option>Xe Tải</option>
                <option>Xe Khách</option>
              </Select>
              <div className='text-red-600 min-h-6 text-sm'>{errors.kindOfCar?.message}</div>
            </div>
          </div>

          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='licenseType' value='License Type' />
              </div>
              <Select id='licenseType' required {...register('licenseType')}>
                <option>Ngũ Quý</option>
                <option>Tứ Quý</option>
                <option>Tam Hoa</option>
                <option>Lộc phát</option>
                <option>Ông địa</option>
                <option>Thần tài</option>
                <option>Sảnh tiến</option>
                <option>Phong thủy</option>
              </Select>
              <div className='text-red-600 min-h-6 text-sm'>{errors.licenseType?.message}</div>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='city' value='City' />
              </div>
              <Select id='city' required {...register('city')}>
                {provinces?.map((p) => <option key={p.province_id}>{p.province_name}</option>)}
              </Select>
              <div className='text-red-600 min-h-6 text-sm'>{errors.city?.message}</div>
            </div>
          </div>

          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='startDateTime' value='Start Date Time' />
              </div>
              <TextInput id='startDateTime' type='datetime-local' {...register('startDateTime')} required />
              <div className='text-red-600 min-h-6 text-sm'>{errors.startDateTime?.message}</div>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='endDateTime' value='End Date Time' />
              </div>
              <TextInput id='endDateTime' type='datetime-local' {...register('endDateTime')} required />
              <div className='text-red-600 min-h-6 text-sm'>{errors.endDateTime?.message}</div>
            </div>
          </div>

          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <div className='mb-2 block'>
                <Label htmlFor='reservePrice' value='Reserve Price' />
              </div>
              <TextInput
                id='reservePrice'
                type='number'
                placeholder='Reserve Price'
                {...register('reservePrice')}
                required
              />
              <div className='text-red-600 min-h-6 text-sm'>{errors.reservePrice?.message}</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientMonochrome='success' onClick={handleUpdate}>
            Create now
          </Button>
          <Button gradientDuoTone='pinkToOrange' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
