import { createFileRoute } from '@tanstack/react-router'

import { CartPage } from '@/pages/cart'

export const Route = createFileRoute('/_authenticated/cart')({
  component: CartPage,
})
