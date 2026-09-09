import { useState } from 'react'

import { cn } from '@/shared/lib/cn'

type ProductGalleryProps = {
  title: string
  images: string[]
}

function ProductGallery({ title, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const cover = images[activeIndex] ?? images[0]

  if (!cover) {
    return <div className="aspect-square rounded-lg bg-zinc-100" aria-hidden="true" />
  }

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100">
        <img src={cover} alt={title} className="size-full object-cover" />
      </div>

      {images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((image, index) => {
            const isActive = index === activeIndex

            return (
              <li key={`${image}-${index}`}>
                <button
                  type="button"
                  aria-label={`${title}, photo ${index + 1}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'aspect-square w-full overflow-hidden rounded-md bg-zinc-100',
                    'focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none',
                    isActive ? 'ring-2 ring-zinc-900 ring-offset-2' : 'hover:opacity-80',
                  )}
                >
                  <img src={image} alt="" loading="lazy" className="size-full object-cover" />
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export { ProductGallery }
export type { ProductGalleryProps }
