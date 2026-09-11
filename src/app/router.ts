import { createRouter } from '@tanstack/react-router'

import { clearCart } from '@/entities/cart'
import { clearWishlist } from '@/entities/wishlist'
import { routeTree } from '@/routeTree.gen'
import { getRefreshToken, subscribeAuthTokens } from '@/shared/lib/auth-token'

const router = createRouter({ routeTree })

subscribeAuthTokens(() => {
  if (!getRefreshToken()) {
    void clearCart()
    void clearWishlist()
  }

  void router.invalidate()
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { router }
