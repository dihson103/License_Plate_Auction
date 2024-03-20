type AdminResponse = {
  id: number
  email: string
  fullName: string
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  publicKey: string
  data: AdminResponse
}
