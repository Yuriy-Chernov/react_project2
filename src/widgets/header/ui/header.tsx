import { Link } from '@tanstack/react-router'

import { getCartCount, useCart } from '@/entities/cart'
import { useSession } from '@/entities/session'
import { useWishlist } from '@/entities/wishlist'
import { useLogout } from '@/features/auth'
import { CatalogSearch } from '@/features/search-products'
import { Badge, Button, Cart, Heart, Logo, User } from '@/shared/ui'

function Header() {
  const { data: user } = useSession()
  const logout = useLogout()
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const cartCount = getCartCount(cartItems)
  const wishlistCount = wishlistItems.length

  return (
    <header className="bg-primary text-white py-3">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" aria-label="HomePage" className="shrink-0 text-white">
          <Logo />
        </Link>

        <CatalogSearch />

        <nav className="flex shrink-0 items-center gap-1">
          <Button asChild variant="ghost" className="text-white hover:bg-zinc-800 hover:text-white">
            <Link to="/cart" aria-label={cartCount > 0 ? `Cart, ${cartCount}` : 'Cart'}>
              <span className="relative">
                <Cart />
                {cartCount > 0 ? (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-4 min-w-4 justify-center px-1 text-xs"
                  >
                    {cartCount}
                  </Badge>
                ) : null}
              </span>
              Cart
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-zinc-800 hover:text-white">
            <Link
              to="/wishlist"
              aria-label={wishlistCount > 0 ? `Wishlist, ${wishlistCount}` : 'Wishlist'}
            >
              <span className="relative">
                <Heart />
                {wishlistCount > 0 ? (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-4 min-w-4 justify-center px-1 text-xs"
                  >
                    {wishlistCount}
                  </Badge>
                ) : null}
              </span>
              Wishlist
            </Link>
          </Button>
          {user ? (
            <>
              <span className="hidden px-2 text-sm sm:inline">{user.username}</span>
              <Button
                type="button"
                variant="ghost"
                className="text-white hover:bg-zinc-800 hover:text-white"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-white hover:bg-zinc-800 hover:text-white"
            >
              <Link to="/login" aria-label="Profile">
                <User />
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}

export { Header }
