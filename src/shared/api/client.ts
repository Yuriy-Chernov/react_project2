import { clearAccessToken, getAccessToken } from '@/shared/lib/auth-token'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com/'

type ApiClientOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly data: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

function resolveUrl(path: string): string {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`
  return new URL(path.replace(/^\//, ''), base).toString()
}

function getErrorMessage(data: unknown, status: number): string {
  if (typeof data === 'object' && data !== null && 'message' in data) {
    const { message } = data
    if (typeof message === 'string' && message.length > 0) {
      return message
    }
  }

  return `Request failed with status ${status}`
}

async function parseJson(response: Response): Promise<unknown> {
  const text = await response.text()

  if (!text) {
    return null
  }

  return JSON.parse(text) as unknown
}

export async function apiClient<T>(path: string, options: ApiClientOptions = {}): Promise<T> {
  const { body, headers: initHeaders, ...rest } = options
  const headers = new Headers(initHeaders)

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  if (body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const token = getAccessToken()

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(resolveUrl(path), {
    ...rest,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const data = await parseJson(response)

  if (!response.ok) {
    if (response.status === 401) {
      clearAccessToken()
    }

    throw new ApiError(getErrorMessage(data, response.status), response.status, data)
  }

  return data as T
}
