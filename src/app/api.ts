import { refreshSession } from '@/entities/session'
import { setUnauthorizedHandler } from '@/shared/api'

function setupApi() {
  setUnauthorizedHandler(refreshSession)
}

export { setupApi }
