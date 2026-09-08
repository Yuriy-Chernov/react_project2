import { createFileRoute } from '@tanstack/react-router'

import { catalogSearchSchema } from '@/features/search-products'
import { CatalogPage } from '@/pages/catalog'

export const Route = createFileRoute('/_authenticated/')({
  validateSearch: catalogSearchSchema,
  component: CatalogPage,
})
