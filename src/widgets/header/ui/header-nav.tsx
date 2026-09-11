import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useId, useRef, useState } from 'react'

import { getCartCount, useCart } from '@/entities/cart'
import { useSession } from '@/entities/session'
import { useWishlist } from '@/entities/wishlist'
import { useLogout } from '@/features/auth'
import { Badge, Button, Cart, Close, Heart, Menu } from '@/shared/ui'

const MOBILE_NAV_QUERY = '(max-width: 600px)'

type HeaderNavItemsProps = {
  layout: 'row' | 'stack'
  username?: string
  cartCount: number
  wishlistCount: number
  onLogout: () => void
  onNavigate?: () => void
}

function HeaderNavItems({
  layout,
  username,
  cartCount,
  wishlistCount,
  onLogout,
  onNavigate,
}: HeaderNavItemsProps) {
  const isStack = layout === 'stack'
  const itemClassName = isStack
    ? 'w-full justify-start'
    : 'text-white hover:bg-zinc-800 hover:text-white'

  function handleLogout() {
    onNavigate?.()
    onLogout()
  }

  return (
    <>
      {username && isStack ? (
        <p className="truncate px-3 py-2 text-sm text-zinc-500">{username}</p>
      ) : null}
      <Button asChild variant="ghost" className={itemClassName}>
        <Link
          to="/cart"
          aria-label={cartCount > 0 ? `Cart, ${cartCount}` : 'Cart'}
          onClick={onNavigate}
        >
          <span className="relative">
            <Cart />
            {cartCount > 0 ? (
              <Badge
                variant="secondary"
                className="absolute rounded-full -top-2 opacity-80 -right-2 h-4 min-w-4 justify-center px-1 text-xs"
              >
                {cartCount}
              </Badge>
            ) : null}
          </span>
          Cart
        </Link>
      </Button>
      <Button asChild variant="ghost" className={itemClassName}>
        <Link
          to="/wishlist"
          aria-label={wishlistCount > 0 ? `Wishlist, ${wishlistCount}` : 'Wishlist'}
          onClick={onNavigate}
        >
          <span className="relative">
            <Heart />
            {wishlistCount > 0 ? (
              <Badge
                variant="secondary"
                className="absolute rounded-full -top-2 opacity-80 -right-2 h-4 min-w-4 justify-center px-1 text-xs"
              >
                {wishlistCount}
              </Badge>
            ) : null}
          </span>
          Wishlist
        </Link>
      </Button>
      {username && !isStack ? (
        <span className="hidden px-2 text-sm sm:inline">{username}</span>
      ) : null}
      <Button type="button" variant="ghost" className={itemClassName} onClick={handleLogout}>
        Logout
      </Button>
    </>
  )
}

function HeaderNav() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [prevPathname, setPrevPathname] = useState(pathname)
  const { data: user } = useSession()
  const logout = useLogout()
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const cartCount = getCartCount(cartItems)
  const wishlistCount = wishlistItems.length
  const navItems = {
    username: user?.username,
    cartCount,
    wishlistCount,
    onLogout: logout,
  }

  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const media = window.matchMedia(MOBILE_NAV_QUERY)

    function handleChange(event: MediaQueryListEvent) {
      if (!event.matches) {
        setOpen(false)
      }
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current?.contains(event.target as Node)) {
        return
      }
      setOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative ml-auto shrink-0">
      <nav className="flex items-center gap-1 [@media(max-width:600px)]:hidden">
        <HeaderNavItems layout="row" {...navItems} />
      </nav>

      <div className="hidden [@media(max-width:600px)]:block">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="text-white hover:bg-zinc-800 hover:text-white"
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          {open ? <Close /> : <Menu />}
        </Button>
        {open ? (
          <nav
            id={menuId}
            className="absolute top-full right-0 z-50 mt-2 flex w-52 flex-col gap-1 rounded-md bg-white p-2 shadow-lg"
          >
            <HeaderNavItems layout="stack" {...navItems} onNavigate={() => setOpen(false)} />
          </nav>
        ) : null}
      </div>
    </div>
  )
}

export { HeaderNav }
