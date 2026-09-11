import { apiClient } from '@/shared/api'
import { type AuthTokens } from '@/shared/lib/auth-token'

import { ACCESS_TOKEN_TTL_MINUTES } from './model/constants'
import { type LoginValues } from './model/login-schema'
import { type LoginResponse, type User } from './model/types'

function login(values: LoginValues) {
  return apiClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { ...values, expiresInMins: ACCESS_TOKEN_TTL_MINUTES },
    skipAuthRetry: true,
  })
}

function refreshTokens(refreshToken: string) {
  return apiClient<AuthTokens>('/auth/refresh', {
    method: 'POST',
    body: { refreshToken, expiresInMins: ACCESS_TOKEN_TTL_MINUTES },
    skipAuthRetry: true,
  })
}

function getMe() {
  return apiClient<User>('/auth/me')
}

export { getMe, login, refreshTokens }
