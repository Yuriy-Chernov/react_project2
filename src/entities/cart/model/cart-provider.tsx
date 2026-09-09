import {
  startTransition,
  useCallback,
  useMemo,
  useOptimistic,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

import { CartContext } from './cart-context'
import { cartReducer } from './reducer'
import { getCartServerSnapshot, getCartSnapshot, persistCart, subscribeCart } from './store'
import { type CartAction, type CartItem, type CartProduct } from './types'

type CartProviderProps = {
  children: ReactNode
}

function CartProvider({ children }: CartProviderProps) {
  const items = useSyncExternalStore(subscribeCart, getCartSnapshot, getCartServerSnapshot)
  const [optimisticItems, setOptimisticItems] = useOptimistic(
    items,
    (_current: CartItem[], next: CartItem[]) => next,
  )

  const dispatch = useCallback(
    (action: CartAction) => {
      startTransition(async () => {
        setOptimisticItems(cartReducer(optimisticItems, action))
        await persistCart(action)
      })
    },
    [optimisticItems, setOptimisticItems],
  )

  const add = useCallback(
    (product: CartProduct) => {
      dispatch({ type: 'add', product })
    },
    [dispatch],
  )

  const remove = useCallback(
    (id: number) => {
      dispatch({ type: 'remove', id })
    },
    [dispatch],
  )

  const decrease = useCallback(
    (id: number) => {
      dispatch({ type: 'decrease', id })
    },
    [dispatch],
  )

  const clear = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [dispatch])

  const value = useMemo(
    () => ({ items: optimisticItems, add, remove, decrease, clear }),
    [optimisticItems, add, remove, decrease, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export { CartProvider }
