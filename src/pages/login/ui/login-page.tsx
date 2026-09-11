import { getRouteApi } from '@tanstack/react-router'

import { LoginForm } from '@/features/auth/login'

const loginRoute = getRouteApi('/login')

function LoginPage() {
  const { redirect } = loginRoute.useSearch()

  return (
    <main className="flex flex-1 items-center justify-center">
      <LoginForm from={redirect} />
    </main>
  )
}

export { LoginPage }
