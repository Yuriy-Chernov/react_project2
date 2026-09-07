import { createFileRoute } from '@tanstack/react-router'

import { LoginForm } from '@/features/auth/login'

type LoginSearch = {
  redirect?: string
}

function validateLoginSearch(search: Record<string, unknown>): LoginSearch {
  return {
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }
}

export const Route = createFileRoute('/login')({
  validateSearch: validateLoginSearch,
  component: LoginPage,
})

function LoginPage() {
  const { redirect } = Route.useSearch()

  return <LoginForm from={redirect} />
}
