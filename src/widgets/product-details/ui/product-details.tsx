import { Link } from '@tanstack/react-router'

import { formatPrice, type Product } from '@/entities/product'
import { ProductActions } from '@/features/product-actions'
import { Badge } from '@/shared/ui'

import { ProductGallery } from './product-gallery'

type ProductDetailsProps = {
  product: Product
}

function ProductDetails({ product }: ProductDetailsProps) {
  const images = product.images.length > 0 ? product.images : [product.thumbnail]

  return (
    <article className="mt-6 grid gap-8 lg:grid-cols-2">
      <ProductGallery key={product.id} title={product.title} images={images} />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-zinc-900">{product.title}</h1>
        <p className="text-2xl font-semibold text-zinc-900">{formatPrice(product.price)}</p>
        <p className="text-zinc-700">{product.description}</p>

        {product.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <li key={tag}>
                <Link to="/" search={{ tag }}>
                  <Badge variant="secondary">{tag}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="max-w-sm">
          <ProductActions product={product} />
        </div>
      </div>
    </article>
  )
}

export { ProductDetails }
export type { ProductDetailsProps }
