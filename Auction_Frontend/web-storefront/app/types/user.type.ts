export type UserRegister = {
  id: string
  fullname: string
  email: string
  address: string
  dateBirth: string
  password: string
}

export type UserResponse = {
  id: string
  email: string
  fullName: string
  birthDate: string
  status: boolean
  wallet: number
  address: string
}

export type ChangeEmailRequest = {
  id: string
  email: string
}
