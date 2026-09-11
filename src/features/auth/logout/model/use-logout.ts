import { useQueryClient } from '@tanstack/react-query'

import { authMeQueryKey } from '@/entities/session'
import { clearAccessToken } from '@/shared/lib/auth-token'

function useLogout() {
  const queryClient = useQueryClient()

  return () => {
    clearAccessToken()
    queryClient.removeQueries({ queryKey: authMeQueryKey })
  }
}

export { useLogout }
