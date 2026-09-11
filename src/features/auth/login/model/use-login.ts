import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

import { authMeQueryKey, login, toUser } from '@/entities/session'
import { setAccessToken } from '@/shared/lib/auth-token'

function getRedirectPath(from: string | undefined) {
  if (!from || !from.startsWith('/') || from.startsWith('//') || from.startsWith('/login')) {
    return '/'
  }

  return from
}

function useLogin(from?: string) {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setAccessToken(response.accessToken)
      queryClient.setQueryData(authMeQueryKey, toUser(response))
      void router.navigate({ href: getRedirectPath(from) })
    },
  })
}

export { useLogin }
