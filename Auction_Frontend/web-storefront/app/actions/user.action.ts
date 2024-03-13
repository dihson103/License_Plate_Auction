import { ChangeEmailRequest, UserRegister, UserResponse } from '../types/user.type'
import { baseUrl, fetchApi } from './utils.action'

export const registerUserAccount = async (data: UserRegister): Promise<UserResponse> => {
  const url = `${baseUrl}/users`
  const body = JSON.stringify(data)
  return fetchApi<UserResponse>(url, body, 'POST')
}

export const changeEmail = async (request: ChangeEmailRequest) => {
  const url = `${baseUrl}/users/${request.id}/email`
  const body = JSON.stringify(request)
  return fetchApi(url, body, 'PATCH')
}
