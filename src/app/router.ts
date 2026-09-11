import { createRouter } from '@tanstack/react-router'

import { routeTree } from '@/routeTree.gen'
import { subscribeAccessToken } from '@/shared/lib/auth-token'

const router = createRouter({ routeTree })

subscribeAccessToken(() => {
  void router.invalidate()
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { router }
