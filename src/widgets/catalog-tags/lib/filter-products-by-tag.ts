import { type Product } from '@/entities/product'

function filterProductsByTag(products: Product[], tag: string) {
  return products.filter((product) => product.tags.includes(tag))
}

export { filterProductsByTag }
