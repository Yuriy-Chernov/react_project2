type EmptyStateProps = {
  title: string
  description?: string
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-2 py-10 text-center">
      <p className="text-lg font-medium text-zinc-900">{title}</p>
      {description ? <p className="max-w-md text-sm text-zinc-600">{description}</p> : null}
    </div>
  )
}

export { EmptyState }
export type { EmptyStateProps }
