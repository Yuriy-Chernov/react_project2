import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'

import { CartProvider } from '@/entities/cart'
import { WishlistProvider } from '@/entities/wishlist'
import { PRODUCTS_GC_TIME, PRODUCTS_STALE_TIME } from '@/entities/product/model/constants'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: PRODUCTS_STALE_TIME,
      gcTime: PRODUCTS_GC_TIME,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

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
