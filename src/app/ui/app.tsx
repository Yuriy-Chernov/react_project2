import { RouterProvider } from '@tanstack/react-router'

import { Providers } from '../providers'
import { router } from '../router'

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export { App }
