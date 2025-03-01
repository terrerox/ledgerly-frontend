import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LedgerlyApp from './LedgerlyApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LedgerlyApp />
  </StrictMode>,
)
