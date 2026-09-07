import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { cn } from '@/shared/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        primary: 'bg-zinc-900 text-white',
        secondary: 'bg-zinc-100 text-zinc-800',
        ghost: 'bg-transparent text-zinc-700',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
export type { BadgeProps }
