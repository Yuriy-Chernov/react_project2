import { useQuery } from '@tanstack/react-query'

import { getProduct } from '../api'
import { productQueryKey } from './query-keys'

function useProduct(id: number) {
  return useQuery({
    queryKey: productQueryKey(id),
    queryFn: () => getProduct(id),
    enabled: Number.isInteger(id) && id > 0,
  })
}

export { useProduct }
