import { z } from 'zod'

import { type WishlistItem } from './types'

const wishlistItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  thumbnail: z.string(),
  stock: z.number().int().nonnegative().optional(),
})

const wishlistSchema = z.array(wishlistItemSchema)

const EMPTY_WISHLIST: WishlistItem[] = []

function parseWishlist(raw: string | null): WishlistItem[] {
  if (!raw) {
    return EMPTY_WISHLIST
  }

  const result = wishlistSchema.safeParse(JSON.parse(raw))

  return result.success ? result.data : EMPTY_WISHLIST
}

export { EMPTY_WISHLIST, parseWishlist }
