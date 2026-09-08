import { createFileRoute } from '@tanstack/react-router'

import { LoginPage, validateLoginSearch } from '@/pages/login'

export const Route = createFileRoute('/login')({
  validateSearch: validateLoginSearch,
  component: LoginPage,
})
