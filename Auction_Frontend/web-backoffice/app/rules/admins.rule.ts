import * as yup from 'yup'

export const updateAdminSchema = yup.object({
  id: yup.number().required('Id là bắt buộc'),
  fullName: yup
    .string()
    .required('Họ và tên là bắt buộc')
    .matches(/^[\p{L}\p{M}'\s]+$/u, 'Họ và tên không đúng định dạng'),
  email: yup.string().required('Email là bắt buộc').email('Email không đúng định dạng')
})

export type UpdateAdminFormSchema = yup.InferType<typeof updateAdminSchema>

export const createAdminSchema = yup.object({
  fullName: yup
    .string()
    .required('Họ và tên là bắt buộc')
    .matches(/^[\p{L}\p{M}'\s]+$/u, 'Họ và tên không đúng định dạng'),
  email: yup.string().required('Email là bắt buộc').email('Email không đúng định dạng'),
  password: yup.string().required('Mật khẩu là bắt buộc')
})

export type CreateAdminFormSchema = yup.InferType<typeof createAdminSchema>
