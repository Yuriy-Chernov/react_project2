import { Button } from './button'

type ErrorStateProps = {
  message: string
  onRetry?: () => void
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      <p>{message}</p>
      {onRetry ? (
        <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={onRetry}>
          Повторить
        </Button>
      ) : null}
    </div>
  )
}

export { ErrorState }
export type { ErrorStateProps }
