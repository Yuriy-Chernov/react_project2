import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/cart')({
  component: CartPage,
})

function CartPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Корзина</h1>
    </section>
  )
}
