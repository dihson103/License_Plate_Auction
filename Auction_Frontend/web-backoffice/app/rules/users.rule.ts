import * as yup from 'yup'

export const createUserSchema = yup.object({
  id: yup
    .string()
    .required('Id là bắt buộc')
    .required('Số căn cước công dân là bắt buộc')
    .matches(/^\d+$/, 'Căn cước công dân không đúng định dạng'),
  email: yup.string().required('Email là bắt buộc').email('Email không đúng định dạng'),
  fullname: yup
    .string()
    .required('Họ và tên là bắt buộc')
    .matches(/^[\p{L}\p{M}'\s]+$/u, 'Họ và tên không đúng định dạng'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
  birthDate: yup.string().required('Ngày tháng năm sinh là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc')
})

export type CreateUserFormSchema = yup.InferType<typeof createUserSchema>

export const updateUserSchema = yup.object({
  id: yup
    .string()
    .required('Id là bắt buộc')
    .required('Số căn cước công dân là bắt buộc')
    .matches(/^\d+$/, 'Căn cước công dân không đúng định dạng'),
  email: yup.string().required('Email là bắt buộc').email('Email không đúng định dạng'),
  fullname: yup
    .string()
    .required('Họ và tên là bắt buộc')
    .matches(/^[\p{L}\p{M}'\s]+$/u, 'Họ và tên không đúng định dạng'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
  birthDate: yup.string().required('Ngày tháng năm sinh là bắt buộc')
})

export type UpdateUserFormSchema = yup.InferType<typeof updateUserSchema>
