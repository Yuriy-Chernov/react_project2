const AUTH_TOKEN_KEY = 'accessToken'
const TOKEN_CHANGE_EVENT = 'auth-token-change'

function emitTokenChange() {
  window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT))
}

function getAccessToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

function setAccessToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  emitTokenChange()
}

function clearAccessToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  emitTokenChange()
}

function subscribeAccessToken(onStoreChange: () => void) {
  window.addEventListener(TOKEN_CHANGE_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)

  return () => {
    window.removeEventListener(TOKEN_CHANGE_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

export { AUTH_TOKEN_KEY, clearAccessToken, getAccessToken, setAccessToken, subscribeAccessToken }
