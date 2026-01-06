import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

if (import.meta.env.DEV) {
  console.log('[bootstrap] main.tsx loaded', {
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV,
  })
}

async function enableMocking() {
  if (import.meta.env.DEV) {
    console.log('[bootstrap] enableMocking()')
  }
  if (!import.meta.env.DEV) {
    return
  }

  try {
    const { worker } = await import('./mocks/browser')

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  } catch (error) {
    console.error('Failed to initialize MSW:', error)
    // Continue app bootstrap even if MSW fails
  }
}

function renderApp() {
  const rootEl = document.getElementById('root')
  if (!rootEl) {
    console.error('[bootstrap] Failed to start application: #root element not found')
    return
  }

  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

enableMocking()
  .then(() => {
    renderApp()
  })
  .catch((error) => {
    console.error('Failed to start application:', error)
    // Render the app anyway to provide user feedback
    renderApp()
  })
