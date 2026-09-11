import { useQuery } from '@tanstack/react-query'

import { getMe } from '../api'
import { authMeQueryKey } from './query-keys'

function useSession() {
  return useQuery({
    queryKey: authMeQueryKey,
    queryFn: getMe,
  })
}

export { useSession }
