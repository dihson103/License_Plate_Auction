'use client'

import { Button, Label, Modal, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiEdit } from 'react-icons/ci'
import { yupResolver } from '@hookform/resolvers/yup'
import { RiAuctionLine } from 'react-icons/ri'
import { Province } from '@/types/utils.type'
import { toast } from 'react-toastify'
import { AuctionResponse, UpdateAuction } from '@/types/auctions.type'
import { UpdateAuctionInformationFormSchema, updateAuctionInformationSchema } from '@/app/rules/auctions.rule'
import { convertAuctionStatusToNumber } from '@/app/utils/utils'
import { getProvinces } from '@/app/actions/utils.action'
import { updateAuction } from '@/app/actions/auctions.action'

type Props = {
  auction: AuctionResponse
}

export default function UpdateAuctionButton({ auction }: Props) {
  const [openModal, setOpenModal] = useState(false)
  const [provinces, setProvinces] = useState<Province[]>()

  const initialData: UpdateAuctionInformationFormSchema = {
    auctionId: auction.id,
    city: auction.city,
    licensePlate: auction.licensePlate,
    licenseType: auction.licenseType,
    kindOfCar: auction.kindOfCar,
    reservePrice: auction.reservePrice
  }

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<UpdateAuctionInformationFormSchema>({
    defaultValues: initialData,
    resolver: yupResolver(updateAuctionInformationSchema)
  })

  useEffect(() => {
    getProvinces()
      .then((data) => {
        setProvinces(data.results)
      })
      .catch(() => {})
  }, [])

  const handleUpdate = handleSubmit((data) => {
    const updateAuctionData: UpdateAuction = {
      ...data,
      status: convertAuctionStatusToNumber(auction.status),
      startDateTime: auction.startDateTime,
      endDateTime: auction.endDateTime
    }
    updateAuction(updateAuctionData)
      .then(() => {
        toast.success('Update auction success')
        handleClose()
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  })

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button gradientDuoTone='purpleToPink' className='whitespace-nowrap' onClick={() => setOpenModal(true)}>
        <CiEdit size={20} className='mr-2' />
        Edit
      </Button>
      <Modal show={openModal} size={'4xl'} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update auction</Modal.Header>
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
                <Label htmlFor='reservePrice' value='Reserve Price' />
              </div>
              <TextInput
                id='reservePrice'
                type='number'
                placeholder='Reserve Price'
                {...register('reservePrice')}
                icon={RiAuctionLine}
                required
              />
              <div className='text-red-600 min-h-6 text-sm'>{errors.reservePrice?.message}</div>
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
