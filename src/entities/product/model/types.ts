type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  tags: string[]
  thumbnail: string
  images: string[]
}

type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type { Product, ProductsResponse }
