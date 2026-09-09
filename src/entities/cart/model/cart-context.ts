import { createContext } from 'react'

import { type CartItem, type CartProduct } from './types'

type CartContextValue = {
  items: CartItem[]
  add: (product: CartProduct) => void
  remove: (id: number) => void
  decrease: (id: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export { CartContext }
export type { CartContextValue }
