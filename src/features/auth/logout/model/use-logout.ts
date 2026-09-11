import { useQueryClient } from '@tanstack/react-query'

import { clearCart } from '@/entities/cart'
import { authMeQueryKey } from '@/entities/session'
import { clearWishlist } from '@/entities/wishlist'
import { clearAuthTokens } from '@/shared/lib/auth-token'

function useLogout() {
  const queryClient = useQueryClient()

  return () => {
    clearAuthTokens()
    void clearCart()
    void clearWishlist()
    queryClient.removeQueries({ queryKey: authMeQueryKey })
  }
}

export { useLogout }
