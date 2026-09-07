import { useQuery } from '@tanstack/react-query'

import { useAccessToken } from '@/shared/lib/use-access-token'

import { getMe } from '../api'
import { authMeQueryKey } from './query-keys'

function useSession() {
  const token = useAccessToken()

  return useQuery({
    queryKey: authMeQueryKey,
    queryFn: getMe,
    enabled: Boolean(token),
  })
}

export { useSession }
