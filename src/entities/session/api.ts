import { apiClient } from '@/shared/api'

import { type LoginValues } from './model/login-schema'
import { type LoginResponse, type User } from './model/types'

function login(values: LoginValues) {
  return apiClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: values,
  })
}

function getMe() {
  return apiClient<User>('/auth/me')
}

export { getMe, login }
