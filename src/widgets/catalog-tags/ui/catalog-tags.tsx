import { Link } from '@tanstack/react-router'

import { cn } from '@/shared/lib/cn'

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
            className={cn(
              'inline-flex items-center rounded-full px-2.5  text-xs font-medium p-3 capitalize tracking-widest',
              isActive ? 'bg-primary text-white' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200',
            )}
          >
            {tag}
          </Link>
        )
      })}
    </nav>
  )
}

export { CatalogTags }
export type { CatalogTagsProps }
