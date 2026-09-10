import { useNavigate, useRouterState, useSearch } from '@tanstack/react-router'
import { type ChangeEvent, type FormEvent, useCallback, useEffect, useRef, useState } from 'react'

import { Input, Search } from '@/shared/ui'

import { catalogSearchSchema } from '../model/catalog-search-schema'

const SEARCH_DEBOUNCE_MS = 400

function readQuery(search: Record<string, unknown>) {
  return catalogSearchSchema.parse(search).q ?? ''
}

function CatalogSearch() {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const search = useSearch({ strict: false })
  const q = readQuery(search)
  const [value, setValue] = useState(q)
  const [prevQ, setPrevQ] = useState(q)
  const timeoutRef = useRef<number>(undefined)

  if (q !== prevQ) {
    setPrevQ(q)
    setValue(q)
  }

  const applySearch = useCallback(
    (next: string) => {
      if (next === q.trim()) {
        return
      }

      void navigate({
        to: '/',
        search: next ? { q: next } : {},
        replace: pathname === '/',
      })
    },
    [navigate, pathname, q],
  )

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current)
    }
  }, [q])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value
    setValue(nextValue)
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      applySearch(nextValue.trim())
    }, SEARCH_DEBOUNCE_MS)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.clearTimeout(timeoutRef.current)
    applySearch(value.trim())
  }

  return (
    <form
      role="search"
      className="relative min-w-0 flex-1 [@media(max-width:800px)]:order-last [@media(max-width:800px)]:basis-full"
      onSubmit={handleSubmit}
    >
      <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400, " />
      <Input
        type="search"
        name="q"
        value={value}
        onChange={handleChange}
        placeholder="Search"
        autoComplete="off"
        className="h-10 bg-transparent pl-9 text-white placeholder:text-white focus-visible:ring-white"
      />
    </form>
  )
}

export { CatalogSearch }
