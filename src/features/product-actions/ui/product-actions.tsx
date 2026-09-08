import { type Product } from '@/entities/product'
import { Button, Cart, Heart } from '@/shared/ui'

type ProductActionsProps = {
  product: Product
}

function ProductActions({ product }: ProductActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button type="button" size="sm" className="min-w-0 flex-1">
        <Cart />
        <span className="truncate">В корзину</span>
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label={`Добавить ${product.title} в избранное`}
      >
        <Heart />
      </Button>
    </div>
  )
}

export { ProductActions }
export type { ProductActionsProps }
