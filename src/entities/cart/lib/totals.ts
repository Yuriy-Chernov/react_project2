import { type CartItem } from '../model/types'

function getCartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0)
}

function getCartItemQuantity(items: CartItem[], id: number) {
  return items.find((item) => item.id === id)?.quantity ?? 0
}

function getCartTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export { getCartCount, getCartItemQuantity, getCartTotal }
