import { useQuery } from '@tanstack/react-query'

import { getProducts, searchProducts } from '../api'
import { productsListQueryKey, productsSearchQueryKey } from './query-keys'

function normalizeQuery(q: string | undefined) {
  const query = q?.trim() ?? ''
  return query.length > 0 ? query : undefined
}

function useProducts(q?: string) {
  const query = normalizeQuery(q)

  return useQuery({
    queryKey: query ? productsSearchQueryKey(query) : productsListQueryKey,
    queryFn: () => (query ? searchProducts(query) : getProducts()),
  })
}

export { useProducts }
