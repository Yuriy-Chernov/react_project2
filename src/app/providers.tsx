import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'

import { CartProvider } from '@/entities/cart'
import { WishlistProvider } from '@/entities/wishlist'

const queryClient = new QueryClient()

type ProvidersProps = {
  children: ReactNode
}

function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  )
}

export { Providers }
