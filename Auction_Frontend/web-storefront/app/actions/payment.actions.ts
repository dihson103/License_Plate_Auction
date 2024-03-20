'use server'

import { AuthResponse } from '../types/auth.type'
import { PaymentFormSchema } from '../utils/rule'
import { baseUrl, fetchApi } from './utils.action'

export const payAPI = (request: PaymentFormSchema, user: AuthResponse) => {
  const url = `${baseUrl}/payments`
  const body = JSON.stringify(request)
  return fetchApi(url, body, 'POST', user)
}

const pay = async () => {
  const rs = await fetch('sdfsdf', {
    headers: {
      Auth: 'sdfsd'
    }
  })
}
