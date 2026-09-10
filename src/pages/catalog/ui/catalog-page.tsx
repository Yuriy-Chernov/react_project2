import { getRouteApi } from '@tanstack/react-router'

import { useProducts, type Product } from '@/entities/product'
import { ApiError } from '@/shared/api'
import { EmptyState, ErrorState, Spinner } from '@/shared/ui'
import { CatalogTags, filterProductsByTag, getTopTags } from '@/widgets/catalog-tags'
import { ProductCard } from '@/widgets/product-card'

const catalogRoute = getRouteApi('/_authenticated/')

function getEmptyDescription(q?: string, tag?: string) {
  if (q) {
    return `No products found for query «${q}»`
  }

  if (tag) {
    return `No products found for tag «${tag}»`
  }

  return 'Try changing the query or selecting another tag'
}

function CatalogPage() {
  const { q, tag } = catalogRoute.useSearch()
  const { data, error, isPending, isError, isSuccess, refetch } = useProducts(q)
  const tags = data ? getTopTags(data.products) : []
  const products =
    data && !q && tag ? filterProductsByTag(data.products, tag) : (data?.products ?? [])
  const errorMessage = error instanceof ApiError ? error.message : 'Failed to load products'

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">
        {q
          ? `Search: ${q}`
          : tag
            ? `Catalog → ${tag.charAt(0).toUpperCase() + tag.slice(1)}`
            : 'Catalog'}
      </h1>

      {tags.length > 0 ? <CatalogTags tags={tags} activeTag={q ? undefined : tag} /> : null}

      <CatalogBody
        isPending={isPending}
        isError={isError}
        isSuccess={isSuccess}
        errorMessage={errorMessage}
        products={products}
        emptyDescription={getEmptyDescription(q, tag)}
        onRetry={() => void refetch()}
      />
    </section>
  )
}

type CatalogBodyProps = {
  isPending: boolean
  isError: boolean
  isSuccess: boolean
  errorMessage: string
  products: Product[]
  emptyDescription: string
  onRetry: () => void
}

function CatalogBody({
  isPending,
  isError,
  isSuccess,
  errorMessage,
  products,
  emptyDescription,
  onRetry,
}: CatalogBodyProps) {
  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return <ErrorState message={errorMessage} onRetry={onRetry} />
  }

  if (isSuccess && products.length === 0) {
    return <EmptyState title="Nothing found" description={emptyDescription} />
  }

  if (isSuccess) {
    return (
      <ul className="mx-auto mt-6 grid max-w-72 grid-cols-1 gap-4 sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    )
  }

  return null
}

export { CatalogPage }
