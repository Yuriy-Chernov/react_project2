import { type ComponentProps } from 'react'

import { cn } from '@/shared/lib/cn'

type SpinnerProps = ComponentProps<'div'>

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Загрузка"
      className={cn(
        'size-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900',
        className,
      )}
      {...props}
    />
  )
}

export { Spinner }
export type { SpinnerProps }
