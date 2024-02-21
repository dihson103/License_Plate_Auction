import type { RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'identificationNumber' | 'fullname' | 'address' | 'dob']: RegisterOptions }

export const rules: Rules = {
  identificationNumber: {
    required: {
      value: true,
      message: 'Số căn cước công dân là bắt buộc'
    },
    pattern: {
      value: /^\d+$/,
      message: 'Căn cước công dân không đúng định dạng'
    }
  },
  fullname: {
    required: {
      value: true,
      message: 'Họ và tên là bắt buộc'
    },
    pattern: {
      value: /^[a-zA-Z\s'-]+$/,
      message: 'Họ và tên không đúng định dạng'
    }
  },
  address: {
    required: {
      value: true,
      message: 'Địa chỉ là bắt buộc'
    }
  },
  dob: {
    required: {
      value: true,
      message: 'Ngày tháng năm sinh là bắt buộc'
    }
  }
}

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
