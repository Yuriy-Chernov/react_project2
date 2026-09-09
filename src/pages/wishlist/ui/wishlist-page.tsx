import { Link } from '@tanstack/react-router'

import { formatPrice } from '@/entities/product'
import { useWishlist, type WishlistItem } from '@/entities/wishlist'
import { ProductActions } from '@/features/product-actions'
import { EmptyState } from '@/shared/ui'
import { ListsTabs } from '@/widgets/lists-tabs'
import { ProductStock } from '@/widgets/product-stock'

function WishlistPage() {
  const { items } = useWishlist()

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Wishlist</h1>
      <ListsTabs />

      {items.length === 0 ? (
        <EmptyState title="Wishlist is empty" description="Save products from the catalog" />
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.id}>
              <WishlistCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

type WishlistCardProps = {
  item: WishlistItem
}

function WishlistCard({ item }: WishlistCardProps) {
  return (
    <article className="flex h-full flex-col gap-3">
      <Link
        to="/product/$id"
        params={{ id: String(item.id) }}
        className="flex min-w-0 flex-1 flex-col gap-3"
      >
        <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100">
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
        <h2 className="line-clamp-2 text-sm font-medium text-zinc-900">{item.title}</h2>
        <p className="text-base font-semibold text-zinc-900">{formatPrice(item.price)}</p>
        {item.stock !== undefined ? <ProductStock stock={item.stock} compact /> : null}
      </Link>
      <ProductActions product={item} />
    </article>
  )
}

export { WishlistPage }
