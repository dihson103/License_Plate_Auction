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
