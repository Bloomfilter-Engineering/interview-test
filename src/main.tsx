import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  try {
    const { worker } = await import('./mocks/browser')

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    await worker.start()
  } catch (error) {
    console.error('Failed to initialize MSW:', error)
    // Continue app bootstrap even if MSW fails
  }
}

enableMocking()
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
  .catch((error) => {
    console.error('Failed to start application:', error)
    // Render the app anyway to provide user feedback
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
