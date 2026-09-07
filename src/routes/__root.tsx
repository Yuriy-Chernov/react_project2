import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'

import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

const queryClient = new QueryClient()

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
