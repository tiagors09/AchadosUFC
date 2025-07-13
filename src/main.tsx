import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "sonner"
import AppRoutes from './AppRoutes'
import './index.css'

import { AuthProvider } from "./components/auth/AuthContext"
import { ItemProvider } from "./components/items/ItemContext"
import { BrowserRouter } from 'react-router'
import { RetrievedItemProvider } from './components/items/RetrievedItemContext'

const root = document.getElementById('root')!

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <ItemProvider>
            <Toaster />
            <AppRoutes />
          </ItemProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
