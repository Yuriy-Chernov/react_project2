const REFRESH_TOKEN_KEY = 'refreshToken'
const TOKENS_CHANGE_EVENT = 'auth-tokens-change'

type AuthTokens = {
  accessToken: string
  refreshToken: string
}

// Kept out of any storage: after a reload it is restored from the refresh token on the first 401.
let accessToken: string | null = null

function emitTokensChange() {
  window.dispatchEvent(new Event(TOKENS_CHANGE_EVENT))
}

function getAccessToken() {
  return accessToken
}

// The refresh token stays valid for 30 days, so it is scoped to the tab instead of persisting.
function getRefreshToken() {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY)
}

function setAuthTokens(tokens: AuthTokens) {
  accessToken = tokens.accessToken
  sessionStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
  emitTokensChange()
}

function clearAuthTokens() {
  accessToken = null
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
  emitTokensChange()
}

function subscribeAuthTokens(onStoreChange: () => void) {
  window.addEventListener(TOKENS_CHANGE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener(TOKENS_CHANGE_EVENT, onStoreChange)
  }
}

export { clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens, subscribeAuthTokens }
export type { AuthTokens }
