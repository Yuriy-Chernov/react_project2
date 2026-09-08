import { Link, getRouteApi } from '@tanstack/react-router'

import { useProduct, type Product } from '@/entities/product'
import { ApiError } from '@/shared/api'
import { EmptyState, ErrorState, Spinner } from '@/shared/ui'
import { ProductDetails } from '@/widgets/product-details'

const productRoute = getRouteApi('/_authenticated/product/$id')

function ProductPage() {
  const { id } = productRoute.useParams()
  const productId = Number(id)
  const isValidId = Number.isInteger(productId) && productId > 0
  const { data, error, isPending, isError, isSuccess, refetch } = useProduct(
    isValidId ? productId : 0,
  )
  const errorMessage = error instanceof ApiError ? error.message : 'Не удалось загрузить товар'

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/" className="text-sm text-zinc-600 underline hover:text-zinc-900">
        Назад к каталогу
      </Link>

      <ProductBody
        isValidId={isValidId}
        isPending={isPending}
        isError={isError}
        isSuccess={isSuccess}
        product={data}
        errorMessage={errorMessage}
        onRetry={() => void refetch()}
      />
    </section>
  )
}

type ProductBodyProps = {
  isValidId: boolean
  isPending: boolean
  isError: boolean
  isSuccess: boolean
  product: Product | undefined
  errorMessage: string
  onRetry: () => void
}

function ProductBody({
  isValidId,
  isPending,
  isError,
  isSuccess,
  product,
  errorMessage,
  onRetry,
}: ProductBodyProps) {
  if (!isValidId) {
    return <EmptyState title="Товар не найден" description="Проверьте адрес страницы" />
  }

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

  if (isSuccess && product) {
    return <ProductDetails product={product} />
  }

  return null
}

export { ProductPage }
