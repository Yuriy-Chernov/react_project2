import { createContext } from 'react'

import { type WishlistItem, type WishlistProduct } from './types'

type WishlistContextValue = {
  items: WishlistItem[]
  toggle: (product: WishlistProduct) => void
  has: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export { WishlistContext }
export type { WishlistContextValue }
