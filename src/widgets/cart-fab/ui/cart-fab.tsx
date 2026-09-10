import { Link, useRouterState } from '@tanstack/react-router'

import { getCartCount, useCart } from '@/entities/cart'
import { Badge, Button, Cart } from '@/shared/ui'

import { useScrolled } from '../lib/use-scrolled'

function CartFab() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const scrolled = useScrolled()
  const { items } = useCart()
  const count = getCartCount(items)
  const isHiddenRoute = pathname === '/cart' || pathname === '/login'

  if (isHiddenRoute || !scrolled) {
    return null
  }

  return (
    <Button
      asChild
      size="icon"
      className="fixed right-4 bottom-4 z-50 size-14 rounded-full shadow-lg"
    >
      <Link to="/cart" aria-label={count > 0 ? `Cart, ${count}` : 'Cart'}>
        <span className="relative">
          <Cart />
          {count > 0 ? (
            <Badge
              variant="secondary"
              className="absolute rounded-full -top-2.5 opacity-80 -right-2.5 h-4 min-w-4 justify-center px-1 text-xs"
            >
              {count}
            </Badge>
          ) : null}
        </span>
      </Link>
    </Button>
  )
}

export { CartFab }
