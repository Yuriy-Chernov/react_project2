import { apiClient } from '@/shared/api'

import { PRODUCTS_LIMIT } from './model/constants'
import { type Product, type ProductsResponse } from './model/types'

function getProducts() {
  const params = new URLSearchParams({ limit: String(PRODUCTS_LIMIT) })
  return apiClient<ProductsResponse>(`/products?${params}`)
}

function searchProducts(q: string) {
  const params = new URLSearchParams({ q, limit: String(PRODUCTS_LIMIT) })
  return apiClient<ProductsResponse>(`/products/search?${params}`)
}

function getProduct(id: number) {
  return apiClient<Product>(`/products/${id}`)
}

export { getProduct, getProducts, searchProducts }
