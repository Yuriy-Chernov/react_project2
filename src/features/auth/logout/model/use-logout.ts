import { useQueryClient } from '@tanstack/react-query'

import { authMeQueryKey } from '@/entities/session'
import { clearAuthTokens } from '@/shared/lib/auth-token'

function useLogout() {
  const queryClient = useQueryClient()

  return () => {
    clearAuthTokens()
    queryClient.removeQueries({ queryKey: authMeQueryKey })
  }
}

export { useLogout }
