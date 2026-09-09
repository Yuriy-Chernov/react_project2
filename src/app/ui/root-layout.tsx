import { Outlet } from '@tanstack/react-router'

import { CartFab } from '@/widgets/cart-fab'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartFab />
    </div>
  )
}

export { RootLayout }
