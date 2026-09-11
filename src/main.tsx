import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App, setupApi } from '@/app'
import '@/styles/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

setupApi()

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
