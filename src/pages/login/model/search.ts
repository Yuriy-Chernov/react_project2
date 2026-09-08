type LoginSearch = {
  redirect?: string
}

function validateLoginSearch(search: Record<string, unknown>): LoginSearch {
  return {
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }
}

export { validateLoginSearch }
export type { LoginSearch }
