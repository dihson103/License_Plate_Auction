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
