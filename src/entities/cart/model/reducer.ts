import { type CartAction, type CartItem } from './types'

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existing = items.find((item) => item.id === action.product.id)
      const stock = action.product.stock ?? existing?.stock

      if (stock !== undefined && stock <= 0) {
        return items
      }

      if (!existing) {
        return [
          ...items,
          {
            id: action.product.id,
            title: action.product.title,
            price: action.product.price,
            thumbnail: action.product.thumbnail,
            stock: action.product.stock,
            quantity: 1,
          },
        ]
      }

      if (stock !== undefined && existing.quantity >= stock) {
        return items
      }

      return items.map((item) =>
        item.id === action.product.id
          ? { ...item, quantity: item.quantity + 1, stock: action.product.stock ?? item.stock }
          : item,
      )
    }
    case 'remove':
      return items.filter((item) => item.id !== action.id)
    case 'decrease':
      return items.flatMap((item) => {
        if (item.id !== action.id) {
          return [item]
        }

        if (item.quantity <= 1) {
          return []
        }

        return [{ ...item, quantity: item.quantity - 1 }]
      })
    case 'clear':
      return []
  }
}

export { cartReducer }
