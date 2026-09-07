import { Link } from '@tanstack/react-router'

import { useSession } from '@/entities/session'
import { useLogout } from '@/features/auth'
import { Button, Cart, Heart, Input, Logo, Search, User } from '@/shared/ui'

function Header() {
  const { data: user } = useSession()
  const logout = useLogout()

  return (
    <header className="bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" aria-label="На главную" className="shrink-0 text-white">
          <Logo />
        </Link>

        <form
          role="search"
          className="relative min-w-0 flex-1"
          onSubmit={(event) => event.preventDefault()}
        >
          <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400" />
          <Input
            type="search"
            name="q"
            placeholder="Поиск"
            autoComplete="off"
            className="h-10 border-zinc-700 bg-zinc-900 pl-9 text-white placeholder:text-zinc-500 focus-visible:ring-white"
          />
        </form>

        <nav className="flex shrink-0 items-center gap-1">
          <Button asChild variant="ghost" className="text-white hover:bg-zinc-800 hover:text-white">
            <Link to="/cart">
              <Cart />
              Корзина
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-zinc-800 hover:text-white">
            <Link to="/wishlist">
              <Heart />
              Избранное
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
                Выйти
              </Button>
            </>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-white hover:bg-zinc-800 hover:text-white"
            >
              <Link to="/login" aria-label="Профиль">
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
