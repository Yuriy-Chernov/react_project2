import { PRODUCTS_LIMIT } from './constants'

const productsListQueryKey = ['products', { limit: PRODUCTS_LIMIT }] as const

function productsSearchQueryKey(q: string) {
  return ['products', 'search', { q, limit: PRODUCTS_LIMIT }] as const
}

function productQueryKey(id: number) {
  return ['products', id] as const
}

export { productQueryKey, productsListQueryKey, productsSearchQueryKey }
