import { type WishlistAction, type WishlistItem } from './types'

function wishlistReducer(items: WishlistItem[], action: WishlistAction): WishlistItem[] {
  switch (action.type) {
    case 'toggle': {
      const exists = items.some((item) => item.id === action.product.id)

      if (exists) {
        return items.filter((item) => item.id !== action.product.id)
      }

      return [
        ...items,
        {
          id: action.product.id,
          title: action.product.title,
          price: action.product.price,
          thumbnail: action.product.thumbnail,
          stock: action.product.stock,
        },
      ]
    }
  }
}

export { wishlistReducer }
