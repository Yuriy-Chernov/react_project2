import { Link, useRouterState } from '@tanstack/react-router'

import { getCartCount, useCart } from '@/entities/cart'
import { useWishlist } from '@/entities/wishlist'
import { cn } from '@/shared/lib/cn'

function ListsTabs() {
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const cartCount = getCartCount(cartItems)
  const wishlistCount = wishlistItems.length

  return (
    <nav aria-label="Saved lists" className="mt-4 flex flex-wrap gap-2">
      <TabLink to="/cart" count={cartCount}>
        Cart
      </TabLink>
      <TabLink to="/wishlist" count={wishlistCount}>
        Wishlist
      </TabLink>
    </nav>
  )
}

type TabLinkProps = {
  to: '/cart' | '/wishlist'
  count: number
  children: string
}

function TabLink({ to, count, children }: TabLinkProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isActive = pathname === to

  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
        isActive ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100',
      )}
    >
      {children}
      {count > 0 ? <span className="tabular-nums">{count}</span> : null}
    </Link>
  )
}

export { ListsTabs }
