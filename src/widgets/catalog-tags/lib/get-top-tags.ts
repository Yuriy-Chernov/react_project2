import { type Product } from '@/entities/product'

import { TOP_TAGS_LIMIT } from '../model/constants'

function getTopTags(products: Product[], limit = TOP_TAGS_LIMIT) {
  const counts = new Map<string, number>()

  for (const product of products) {
    for (const tag of product.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .sort(([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB))
    .slice(0, limit)
    .map(([tag]) => tag)
}

export { getTopTags }
