import * as yup from 'yup'

export const personalFormSchema = yup.object({
  identificationNumber: yup
    .string()
    .required('Số căn cước công dân là bắt buộc')
    .matches(/^\d+$/, 'Căn cước công dân không đúng định dạng'),
  fullname: yup
    .string()
    .required('Họ và tên là bắt buộc')
    .matches(/^[a-zA-Z\s'-]+$/, 'Họ và tên không đúng định dạng'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
  dob: yup.string().required('Ngày tháng năm sinh là bắt buộc')
})

export type PersonalFormType = yup.InferType<typeof personalFormSchema>

export const accountFormSchema = yup.object({
  email: yup.string().required('Email là bắt buộc').email('Email không đúng định dạng'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions')
})

export type AccountFormSchema = yup.InferType<typeof accountFormSchema>

export const paymentSchema = yup.object({
  userId: yup.string().required('User id is required'),
  amount: yup
    .number()
    .typeError('Amout of money is integer')
    .integer('Amout of money is integer')
    .required('Amount of money is required')
    .min(1, 'Amount of money must be more than 0'),
  accountNumber: yup
    .string()
    .required('Card number is required')
    .matches(/^\d+$/, 'Card number is just contain number'),
  password: yup.string().required('Password is required')
})

export type PaymentFormSchema = yup.InferType<typeof paymentSchema>
