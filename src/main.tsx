import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "sonner"
import AppRoutes from './AppRoutes'
import './index.css'

import { AuthProvider } from "./components/auth/AuthContext"
import { ItemProvider } from "./components/items/ItemContext"
import { BrowserRouter } from 'react-router'

const root = document.getElementById('root')!

createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <ItemProvider>
        <BrowserRouter>
          <Toaster />
          <AppRoutes />
        </BrowserRouter>
      </ItemProvider>
    </AuthProvider>
  </StrictMode>,
)
