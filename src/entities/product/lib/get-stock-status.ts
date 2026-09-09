type StockStatus = {
  inStock: boolean
  label: string
}

function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) {
    return { inStock: false, label: 'Out of stock' }
  }

  return { inStock: true, label: `${stock} in stock` }
}

function isInStock(stock?: number) {
  return stock === undefined || stock > 0
}

function canIncreaseQuantity(quantity: number, stock?: number) {
  return stock === undefined || quantity < stock
}

export { canIncreaseQuantity, getStockStatus, isInStock }
export type { StockStatus }
