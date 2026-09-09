type CartProduct = {
  id: number
  title: string
  price: number
  thumbnail: string
  stock?: number
}

type CartItem = CartProduct & {
  quantity: number
}

type CartAction =
  | { type: 'add'; product: CartProduct }
  | { type: 'remove'; id: number }
  | { type: 'decrease'; id: number }
  | { type: 'clear' }

export type { CartAction, CartItem, CartProduct }
