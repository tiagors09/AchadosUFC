import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router"

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AgentLoginPage from "./components/auth/AgentLoginPage/index.tsx"
import AgentRegisterPage from "./components/auth/AgentRegisterPage/index.tsx"
import { AuthProvider } from "./components/auth/AuthContext.tsx"
import { Toaster } from "sonner"
import { ItemProvider } from "./components/items/ItemContext.tsx"
import ItemListPage from "./components/items/ItemListPage/index.tsx"

const root = document.getElementById('root')!

createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <ItemProvider>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='auth'>
              <Route path='login' element={<AgentLoginPage />} />
              <Route path='register' element={<AgentRegisterPage />} />
            </Route>
            <Route path='item/list' element={<ItemListPage />} />
          </Routes>  
        </BrowserRouter>
      </ItemProvider>
    </AuthProvider>
  </StrictMode>,
)
