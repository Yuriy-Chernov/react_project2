import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/product/$id')({
  component: ProductPage,
})

function ProductPage() {
  const { id } = Route.useParams()

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Товар {id}</h1>
    </section>
  )
}
