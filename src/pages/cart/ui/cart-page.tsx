import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { getCartCount, getCartTotal, useCart, type CartItem } from '@/entities/cart'
import { canIncreaseQuantity, formatPrice } from '@/entities/product'
import { CheckoutForm } from '@/features/checkout'
import { Button, Close, EmptyState } from '@/shared/ui'
import { ListsTabs } from '@/widgets/lists-tabs'

function CartPage() {
  const { items, add, remove, decrease } = useCart()
  const [isOrderCreated, setIsOrderCreated] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false)
  const count = getCartCount(items)
  const total = getCartTotal(items)

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Cart</h1>
      <ListsTabs />

      {items.length > 0 ? (
        <>
          <ul className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200">
            {items.map((item) => (
              <CartRow
                key={item.id}
                item={item}
                onIncrease={() => add(item)}
                onDecrease={() => decrease(item.id)}
                onRemove={() => remove(item.id)}
              />
            ))}
          </ul>

          <p className="mt-6 text-lg font-semibold">
            Total · {count} {count === 1 ? 'item' : 'items'} · {formatPrice(total)}
          </p>

          {isCheckout ? (
            <CheckoutForm
              onBack={() => setIsCheckout(false)}
              onCreated={() => setIsOrderCreated(true)}
            />
          ) : (
            <Button type="button" className="mt-6" onClick={() => setIsCheckout(true)}>
              Buy
            </Button>
          )}
        </>
      ) : isOrderCreated ? (
        <EmptyState title="Order created" description="Thank you for your purchase" />
      ) : (
        <EmptyState title="Cart is empty" description="Add products from the catalog" />
      )}
    </section>
  )
}

type CartRowProps = {
  item: CartItem
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

function CartRow({ item, onIncrease, onDecrease, onRemove }: CartRowProps) {
  return (
    <li className="flex gap-4 py-4">
      <Link
        to="/product/$id"
        params={{ id: String(item.id) }}
        className="size-20 shrink-0 overflow-hidden rounded-md bg-zinc-100"
      >
        <img src={item.thumbnail} alt={item.title} className="size-full object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link
            to="/product/$id"
            params={{ id: String(item.id) }}
            className="font-medium text-zinc-900 hover:underline"
          >
            {item.title}
          </Link>
          <p className="text-sm text-zinc-600">{formatPrice(item.price)}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              aria-label={`Decrease ${item.title} quantity`}
              onClick={onDecrease}
            >
              −
            </Button>
            <span className="min-w-6 text-center tabular-nums">{item.quantity}</span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={!canIncreaseQuantity(item.quantity, item.stock)}
              aria-label={`Increase ${item.title} quantity`}
              onClick={onIncrease}
            >
              +
            </Button>
          </div>
          <p className="min-w-20 text-right font-medium">
            {formatPrice(item.price * item.quantity)}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Remove ${item.title} from cart`}
            onClick={onRemove}
          >
            <Close />
          </Button>
        </div>
      </div>
    </li>
  )
}

export { CartPage }
