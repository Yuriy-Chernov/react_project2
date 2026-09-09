import { getCartItemQuantity, useCart, type CartProduct } from '@/entities/cart'
import { canIncreaseQuantity, isInStock } from '@/entities/product'
import { Button, Cart } from '@/shared/ui'

type CartActionButtonProps = {
  product: CartProduct
}

function CartActionButton({ product }: CartActionButtonProps) {
  const { items, add, decrease } = useCart()
  const quantity = getCartItemQuantity(items, product.id)
  const inStock = isInStock(product.stock)
  const canIncrease = canIncreaseQuantity(quantity, product.stock)

  if (quantity === 0) {
    return (
      <Button
        type="button"
        size="sm"
        className="min-w-0 flex-1"
        disabled={!inStock}
        aria-label={inStock ? undefined : `${product.title} is out of stock`}
        onClick={() => add(product)}
      >
        <Cart />
        <span className="truncate">{inStock ? 'Add to cart' : 'Out of stock'}</span>
      </Button>
    )
  }

  return (
    <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label={`Decrease ${product.title} quantity`}
        onClick={() => decrease(product.id)}
      >
        −
      </Button>
      <span className="min-w-6 text-center text-sm tabular-nums">{quantity}</span>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={!canIncrease}
        aria-label={`Increase ${product.title} quantity`}
        onClick={() => add(product)}
      >
        +
      </Button>
    </div>
  )
}

export { CartActionButton }
