import { getRefreshToken, setAuthTokens } from '@/shared/lib/auth-token'

import { refreshTokens } from '../api'

let pendingRefresh: Promise<boolean> | null = null

async function requestRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    return false
  }

  try {
    setAuthTokens(await refreshTokens(refreshToken))
    return true
  } catch {
    return false
  }
}

// Parallel requests may fail with 401 at once, but the session must be renewed only once.
function refreshSession(): Promise<boolean> {
  pendingRefresh ??= requestRefresh().finally(() => {
    pendingRefresh = null
  })

  return pendingRefresh
}

export { refreshSession }
