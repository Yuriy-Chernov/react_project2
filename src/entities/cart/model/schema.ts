import { z } from 'zod'

import { type CartItem } from './types'

const cartItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  thumbnail: z.string(),
  stock: z.number().int().nonnegative().optional(),
  quantity: z.number().int().positive(),
})

const cartSchema = z.array(cartItemSchema)

const EMPTY_CART: CartItem[] = []

function parseCart(raw: string | null): CartItem[] {
  if (!raw) {
    return EMPTY_CART
  }

  const result = cartSchema.safeParse(JSON.parse(raw))

  return result.success ? result.data : EMPTY_CART
}

export { EMPTY_CART, parseCart }
