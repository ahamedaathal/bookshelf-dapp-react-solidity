import React from 'react'
import ReactDOM from 'react-dom/client'
import ThirdWebProvider from './ThirdWebProvider.tsx'
import './index.css'
import AppRouter from './AppRouter.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThirdWebProvider>
      <AppRouter />
    </ThirdWebProvider>
  </React.StrictMode>,
)
