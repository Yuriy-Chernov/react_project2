import { useSyncExternalStore } from 'react'

import { getAccessToken, subscribeAccessToken } from '@/shared/lib/auth-token'

function useAccessToken() {
  return useSyncExternalStore(subscribeAccessToken, getAccessToken, () => null)
}

export { useAccessToken }
