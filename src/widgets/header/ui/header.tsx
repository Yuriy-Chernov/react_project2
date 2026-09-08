import { Link } from '@tanstack/react-router'

import { useSession } from '@/entities/session'
import { useLogout } from '@/features/auth'
import { CatalogSearch } from '@/features/search-products'
import { Button, Cart, Heart, Logo, User } from '@/shared/ui'

function Header() {
  const { data: user } = useSession()
  const logout = useLogout()

  return (
    <header className="bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" aria-label="HomePage" className="shrink-0 text-white">
          <Logo />
        </Link>

        <CatalogSearch />

        <nav className="flex shrink-0 items-center gap-1">
          <Button asChild variant="ghost" className="text-white hover:bg-zinc-800 hover:text-white">
            <Link to="/cart">
              <Cart />
              Cart
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-zinc-800 hover:text-white">
            <Link to="/wishlist">
              <Heart />
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
