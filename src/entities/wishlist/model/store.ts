import { createPersistedStore } from '@/shared/lib/create-persisted-store'

import { WISHLIST_STORAGE_KEY } from './constants'
import { wishlistReducer } from './reducer'
import { EMPTY_WISHLIST, parseWishlist } from './schema'

const wishlistStore = createPersistedStore({
  key: WISHLIST_STORAGE_KEY,
  initialState: EMPTY_WISHLIST,
  parse: parseWishlist,
  reducer: wishlistReducer,
})

const subscribeWishlist = wishlistStore.subscribe
const getWishlistSnapshot = wishlistStore.getSnapshot
const getWishlistServerSnapshot = wishlistStore.getServerSnapshot
const persistWishlist = wishlistStore.persist

function clearWishlist() {
  return persistWishlist({ type: 'clear' })
}

export {
  clearWishlist,
  getWishlistServerSnapshot,
  getWishlistSnapshot,
  persistWishlist,
  subscribeWishlist,
}
