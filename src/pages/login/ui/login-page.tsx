import { getRouteApi } from '@tanstack/react-router'

import { LoginForm } from '@/features/auth/login'

const loginRoute = getRouteApi('/login')

function LoginPage() {
  const { redirect } = loginRoute.useSearch()

  return <LoginForm from={redirect} />
}

export { LoginPage }
