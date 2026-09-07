import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { clearAccessToken } from '@/shared/lib/auth-token'

function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return () => {
    clearAccessToken()
    queryClient.clear()
    void navigate({ to: '/login' })
  }
}

export { useLogout }
