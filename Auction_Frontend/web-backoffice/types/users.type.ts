export type UserResponse = {
  id: string
  fullName: string
  email: string
  address: string
  birthDate: string
  wallet: number
  status: boolean
}

export type SearchUserResponse = {
  currentIndex: number
  totalPage: number
  result: UserResponse[]
}

export type UserSearchParams = {
  searchValue?: string
  pageIndex?: number
  pageSize?: number
  status: boolean
}

export type CreateUserRequest = {
  id: string
  fullName: string
  email: string
  address: string
  birthDate: string
  password: string
}

export type UpdateUserRequest = {
  id: string
  fullName: string
  email: string
  address: string
  birthDate: string
}

export type UpdateUserStats = {
  id: string
  status: boolean
}

export type UserCount = {
  totalUsers: number
}
