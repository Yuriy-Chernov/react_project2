import { useContext } from 'react'

import { WishlistContext } from './wishlist-context'

function useWishlist() {
  const value = useContext(WishlistContext)

  if (!value) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }

  return value
}

export { useWishlist }
