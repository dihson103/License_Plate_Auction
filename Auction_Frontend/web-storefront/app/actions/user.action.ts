import { ChangeEmailRequest, UserRegister, UserResponse } from '../types/user.type'
import { ApiError } from '../types/util.type'

export const registerUserAccount = async (data: UserRegister): Promise<UserResponse> => {
  const result = await fetch('http://localhost:6001/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!result.ok) {
    const error = (await result.json()) as ApiError
    throw new Error(error.message)
  }

  return result.json()
}

export const changeEmail = async (request: ChangeEmailRequest) => {
  const result = await fetch(`http://localhost:6001/users/${request.id}/email`, {
    method: 'PATCH',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!result.ok) {
    const error = (await result.json()) as ApiError
    throw new Error(error.message)
  }

  if (result.status == 204) {
    return 'Success'
  }

  return result.json()
}
