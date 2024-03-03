export type AdminResponse = {
  id: number
  email: string
  fullName: string
}

export type AdminsSearchResponse = {
  totalPage: number
  result: AdminResponse[]
}

export type AdminSearchParam = {
  searchValue?: string
  pageIndex?: number
  pageSize?: number
}

export type UpdateAdminRequest = {
  id: number
  email: string
  fullName: string
}

export type CreateAdminRequest = {
  email: string
  fullName: string
  password: string
}
