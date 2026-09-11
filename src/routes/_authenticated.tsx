import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { useSession } from '@/entities/session'
import { ApiError } from '@/shared/api'
import { getAccessToken } from '@/shared/lib/auth-token'
import { ErrorState, Spinner } from '@/shared/ui'
import { CartFab } from '@/widgets/cart-fab'
import { Header } from '@/widgets/header'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    if (!getAccessToken()) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
        replace: true,
      })
    }
  },
  component: AuthenticatedLayout,
})

function SessionGate() {
  const session = useSession()

  if (session.isPending) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  if (session.isError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <ErrorState
          message={
            session.error instanceof ApiError ? session.error.message : 'Failed to load session'
          }
          onRetry={() => void session.refetch()}
        />
      </section>
    )
  }

  return <Outlet />
}

function AuthenticatedLayout() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <SessionGate />
      </main>
      <CartFab />
    </>
  )
}
