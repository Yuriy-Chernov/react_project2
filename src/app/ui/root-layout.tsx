import { Outlet } from '@tanstack/react-router'

import { Footer } from '@/widgets/footer'

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Outlet />
      <Footer />
    </div>
  )
}

export { RootLayout }
