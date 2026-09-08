import { createFileRoute } from '@tanstack/react-router'

import { WishlistPage } from '@/pages/wishlist'

export const Route = createFileRoute('/_authenticated/wishlist')({
  component: WishlistPage,
})
