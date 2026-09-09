import { getStockStatus } from '@/entities/product'
import { cn } from '@/shared/lib/cn'

type ProductStockProps = {
  stock: number
  compact?: boolean
}

function ProductStock({ stock, compact = false }: ProductStockProps) {
  const { inStock, label } = getStockStatus(stock)

  if (!inStock) {
    return (
      <p
        role="alert"
        className={cn(
          'text-sm font-medium text-red-700',
          !compact && 'rounded-md border border-red-200 bg-red-50 px-3 py-2',
        )}
      >
        {compact ? label : 'This product is out of stock'}
      </p>
    )
  }

  return <p className="text-sm text-zinc-600">{label}</p>
}

export { ProductStock }
export type { ProductStockProps }
