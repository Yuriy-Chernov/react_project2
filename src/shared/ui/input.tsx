import { type ComponentProps } from 'react'

import { cn } from '@/shared/lib/cn'

type InputProps = ComponentProps<'input'>

function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm',
        'placeholder:text-zinc-600 placeholder:opacity-100',
        'focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
export type { InputProps }
