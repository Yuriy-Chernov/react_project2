type WishlistProduct = {
  id: number
  title: string
  price: number
  thumbnail: string
  stock?: number
}

type WishlistItem = WishlistProduct

type WishlistAction = { type: 'toggle'; product: WishlistProduct } | { type: 'clear' }

export type { WishlistAction, WishlistItem, WishlistProduct }
