import { Link } from '@tanstack/react-router'

import { formatPrice, type Product } from '@/entities/product'
import { ProductActions } from '@/features/product-actions'
import { ProductStock } from '@/widgets/product-stock'

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col gap-3">
      <Link
        to="/product/$id"
        params={{ id: String(product.id) }}
        className="flex min-w-0 flex-1 flex-col gap-3"
      >
        <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
        <h2 className="line-clamp-2 text-sm font-medium text-zinc-900">{product.title}</h2>
        <p className="text-base font-semibold text-zinc-900">{formatPrice(product.price)}</p>
        <ProductStock stock={product.stock} compact />
      </Link>
      <ProductActions product={product} />
    </article>
  )
}

export { ProductCard }
export type { ProductCardProps }
