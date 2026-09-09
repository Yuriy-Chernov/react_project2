import {
  startTransition,
  useCallback,
  useMemo,
  useOptimistic,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

import { wishlistReducer } from './reducer'
import {
  getWishlistServerSnapshot,
  getWishlistSnapshot,
  persistWishlist,
  subscribeWishlist,
} from './store'
import { type WishlistAction, type WishlistItem, type WishlistProduct } from './types'
import { WishlistContext } from './wishlist-context'

type WishlistProviderProps = {
  children: ReactNode
}

function WishlistProvider({ children }: WishlistProviderProps) {
  const items = useSyncExternalStore(
    subscribeWishlist,
    getWishlistSnapshot,
    getWishlistServerSnapshot,
  )
  const [optimisticItems, setOptimisticItems] = useOptimistic(
    items,
    (_current: WishlistItem[], next: WishlistItem[]) => next,
  )

  const dispatch = useCallback(
    (action: WishlistAction) => {
      startTransition(async () => {
        setOptimisticItems(wishlistReducer(optimisticItems, action))
        await persistWishlist(action)
      })
    },
    [optimisticItems, setOptimisticItems],
  )

  const toggle = useCallback(
    (product: WishlistProduct) => {
      dispatch({ type: 'toggle', product })
    },
    [dispatch],
  )

  const has = useCallback(
    (id: number) => optimisticItems.some((item) => item.id === id),
    [optimisticItems],
  )

  const value = useMemo(
    () => ({ items: optimisticItems, toggle, has }),
    [optimisticItems, toggle, has],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export { WishlistProvider }
