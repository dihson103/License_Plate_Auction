import * as yup from 'yup'

const minStartDate = new Date()
minStartDate.setDate(minStartDate.getDate() + 1)

export const createAuctionSchema = yup.object({
  licensePlate: yup.string().required('License plate is required'),
  kindOfCar: yup.string().required('Kind of car is required'),
  licenseType: yup.string().required('License type is required'),
  city: yup.string().required('City is required'),
  status: yup.string().required('Status is required').oneOf(['InActive', 'Pending'], 'Wrong status type'),
  reservePrice: yup
    .number()
    .typeError('Reserve price must be a number type')
    .integer('Reserve price must be an integer')
    .min(1, 'ReservePrice must more than 0')
    .required('ReservePrice is required'),
  startDateTime: yup.date().when('status', {
    is: (val: string) => val !== 'InActive',
    then: (schema) =>
      schema
        .required('Start date and time is required')
        .typeError('Start date and time must be a date type')
        .min(minStartDate, 'Start date and time must be after current date and time 1 day')
  }),
  endDateTime: yup.date().when(['status', 'startDateTime'], {
    is: (status: string, startDateTime: Date) => status !== 'InActive' && startDateTime,
    then: (schema) =>
      schema
        .required('End date and time is required')
        .typeError('End date and time must be a date type')
        .min(yup.ref('startDateTime'), 'End date and time must be after start date and time')
        .test(
          'is-more-than-1-hour',
          'End date and time must be at least 1 hour after start date and time',
          function (value) {
            const startDateTime = this.resolve(yup.ref('startDateTime'))
            const oneHourAfterStart = new Date(startDateTime as string)
            oneHourAfterStart.setHours(oneHourAfterStart.getHours() + 1)
            return value > oneHourAfterStart
          }
        )
  })
})

export type CreateAuctionFormSchema = yup.InferType<typeof createAuctionSchema>

export const updateAuctionInformationSchema = yup.object({
  auctionId: yup.number().required('Auction id is required'),
  licensePlate: yup.string().required('License plate is required'),
  kindOfCar: yup.string().required('Kind of car is required'),
  licenseType: yup.string().required('License type is required'),
  city: yup.string().required('City is required'),
  reservePrice: yup
    .number()
    .typeError('Reserve price must be a number type')
    .integer('Reserve price must be an integer')
    .required('ReservePrice is required')
})

export type UpdateAuctionInformationFormSchema = yup.InferType<typeof updateAuctionInformationSchema>

export const updateAuctionStatusAndDateTimeSchema = yup.object({
  status: yup.string().required('Status is required').oneOf(['InActive', 'Pending'], 'Wrong status type'),
  startDateTime: yup.date().when('status', {
    is: (val: string) => val !== 'InActive',
    then: (schema) =>
      schema
        .required('Start date and time is required')
        .typeError('Start date and time must be a date type')
        .min(minStartDate, 'Start date and time must be after current date and time 1 day')
  }),
  endDateTime: yup.date().when(['status', 'startDateTime'], {
    is: (status: string, startDateTime: Date) => status !== 'InActive' && startDateTime,
    then: (schema) =>
      schema
        .required('End date and time is required')
        .typeError('End date and time must be a date type')
        .min(yup.ref('startDateTime'), 'End date and time must be after start date and time')
        .test(
          'is-more-than-1-hour',
          'End date and time must be at least 1 hour after start date and time',
          function (value) {
            const startDateTime = this.resolve(yup.ref('startDateTime'))
            const oneHourAfterStart = new Date(startDateTime as string)
            oneHourAfterStart.setHours(oneHourAfterStart.getHours() + 1)
            return value > oneHourAfterStart
          }
        )
  })
})

export type UpdateAuctionStatusAndDateFormSchema = yup.InferType<typeof updateAuctionStatusAndDateTimeSchema>
