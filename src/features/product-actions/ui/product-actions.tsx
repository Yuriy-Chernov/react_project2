import { type CartProduct } from '@/entities/cart'
import { useWishlist } from '@/entities/wishlist'
import { cn } from '@/shared/lib/cn'
import { Button, Heart } from '@/shared/ui'

import { CartActionButton } from './cart-action-button'

type ProductActionsProps = {
  product: CartProduct
}

function ProductActions({ product }: ProductActionsProps) {
  const { has, toggle } = useWishlist()
  const inWishlist = has(product.id)

  return (
    <div className="flex items-center gap-2">
      <CartActionButton product={product} />
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-pressed={inWishlist}
        aria-label={
          inWishlist
            ? `Remove ${product.title} from favorites`
            : `Add ${product.title} to favorites`
        }
        onClick={() => toggle(product)}
      >
        <Heart className={cn(inWishlist ? 'text-red-600' : 'text-zinc-600')} />
      </Button>
    </div>
  )
}

export { ProductActions }
export type { ProductActionsProps }
