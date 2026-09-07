import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { getAccessToken } from '@/shared/lib/auth-token'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    if (!getAccessToken()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
        replace: true,
      })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return <Outlet />
}
