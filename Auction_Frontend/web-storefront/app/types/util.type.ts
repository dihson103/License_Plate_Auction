export type Province = {
  province_id: number
  province_name: string
  province_type: string
}

export type ProvinceResponse = {
  results: Province[]
}

export type ApiError = {
  status: number
  message: string
}
