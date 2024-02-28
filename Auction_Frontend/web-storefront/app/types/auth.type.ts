import NextAuth from 'next-auth'
import { UserResponse } from './user.type'

type AuthResponse = {
  data: UserResponse
  accessToken: string
  refreshToken: string
  publicKey: string
}

declare module 'next-auth' {
  interface Session {
    user: AuthResponse
  }
}
