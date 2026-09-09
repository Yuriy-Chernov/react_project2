export { getProduct, getProducts, searchProducts } from './api'
export { formatPrice } from './lib/format-price'
export {
  canIncreaseQuantity,
  getStockStatus,
  isInStock,
  type StockStatus,
} from './lib/get-stock-status'
export { productQueryKey, productsListQueryKey, productsSearchQueryKey } from './model/query-keys'
export { type Product, type ProductsResponse } from './model/types'
export { useProduct } from './model/use-product'
export { useProducts } from './model/use-products'
