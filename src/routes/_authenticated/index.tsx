import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Каталог</h1>
      <p className="mt-4">
        <Link to="/product/$id" params={{ id: '1' }} className="text-zinc-700 underline">
          Товар 1
        </Link>
      </p>
    </section>
  )
}
