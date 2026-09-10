import { Link } from '@tanstack/react-router'

import { CatalogSearch } from '@/features/search-products'
import { Logo } from '@/shared/ui'

import { HeaderNav } from './header-nav'

function Header() {
  return (
    <header className="bg-primary py-3 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
        <Link to="/" aria-label="HomePage" className="shrink-0 text-white">
          <Logo />
        </Link>

        <CatalogSearch />

        <HeaderNav />
      </div>
    </header>
  )
}

export { Header }
