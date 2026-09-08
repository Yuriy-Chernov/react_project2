import { z } from 'zod'

const catalogSearchSchema = z.object({
  q: z.string().trim().min(1).optional().catch(undefined),
  tag: z.string().trim().min(1).optional().catch(undefined),
})

type CatalogSearchParams = z.infer<typeof catalogSearchSchema>

export { catalogSearchSchema }
export type { CatalogSearchParams }
