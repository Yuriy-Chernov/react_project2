import { Link } from '@tanstack/react-router'

import { Badge } from '@/shared/ui'

type CatalogTagsProps = {
  tags: string[]
  activeTag?: string
}

function CatalogTags({ tags, activeTag }: CatalogTagsProps) {
  if (tags.length === 0) {
    return null
  }

  return (
    <nav aria-label="Tags" className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = tag === activeTag

        return (
          <Link
            key={tag}
            to="/"
            search={isActive ? {} : { tag }}
            aria-current={isActive ? 'true' : undefined}
          >
            <Badge
              variant={isActive ? 'primary' : 'secondary'}
              className="rounded-md p-3 capitalize tracking-widest"
            >
              {tag}
            </Badge>
          </Link>
        )
      })}
    </nav>
  )
}

export { CatalogTags }
export type { CatalogTagsProps }
