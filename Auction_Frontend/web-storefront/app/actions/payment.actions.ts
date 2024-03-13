'use server'

import { PaymentFormSchema } from '../utils/rule'
import { baseUrl, fetchApi } from './utils.action'

export const payAPI = (request: PaymentFormSchema) => {
  const url = `${baseUrl}/payments`
  const body = JSON.stringify(request)
  return fetchApi(url, body, 'POST')
}
