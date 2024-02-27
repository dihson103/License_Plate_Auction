export type AuthResponse = {
  data: UserResponse
  accessToken: string
  refreshToken: string
  publicKey: string
}

type UserResponse = {
  id: string
  email: string
  fullName: string
  birthDate: string
  status: boolean
  wallet: number
  address: string
}
