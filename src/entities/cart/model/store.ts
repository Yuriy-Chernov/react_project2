import { createPersistedStore } from '@/shared/lib/create-persisted-store'

import { CART_STORAGE_KEY } from './constants'
import { cartReducer } from './reducer'
import { EMPTY_CART, parseCart } from './schema'

const cartStore = createPersistedStore({
  key: CART_STORAGE_KEY,
  initialState: EMPTY_CART,
  parse: parseCart,
  reducer: cartReducer,
})

const subscribeCart = cartStore.subscribe
const getCartSnapshot = cartStore.getSnapshot
const getCartServerSnapshot = cartStore.getServerSnapshot
const persistCart = cartStore.persist

export { getCartServerSnapshot, getCartSnapshot, persistCart, subscribeCart }
