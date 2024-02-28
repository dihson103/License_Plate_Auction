import { UserRegister, UserResponse } from '../types/user.type'
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
