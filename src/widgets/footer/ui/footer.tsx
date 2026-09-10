function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-zinc-500 text-center">
        © {new Date().getFullYear()} Shopify
      </div>
    </footer>
  )
}

export { Footer }
